import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Duel from '@/models/Duel';
import Problem from '@/models/Problem';
import User from '@/models/User';
import DailyDuelCount from '@/models/DailyDuelCount';
import LiveSolveSession from '@/models/LiveSolveSession';
import { buildSolutionPrompt } from '@/lib/claudeSolutionPrompt';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const LANGUAGE_IDS: Record<string, number> = {
    python: 100, // Python (3.12.5) — 71 is 3.8.1, too old for `list[int]`-style starter code annotations
    javascript: 63,
    java: 62
};

async function executeCode(code: string, language: string, testCases: any[]) {
    const languageId = LANGUAGE_IDS[language];
    const results = await Promise.all(
        testCases.map(async (testCase: any) => {
            const submitRes = await fetch(
                `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    },
                    body: JSON.stringify({
                        source_code: code,
                        language_id: languageId,
                        stdin: JSON.stringify(testCase.input),
                        cpu_time_limit: 5,
                        memory_limit: 128000
                    })
                }
            );
            const result = await submitRes.json();

            // Compare parsed JSON rather than raw stdout — different languages'
            // JSON serializers format output differently (e.g. Python's json.dumps
            // adds spaces after commas), so an exact string match against
            // Judge0's expected_output is unreliable across languages.
            const ran = result.status?.id === 3;
            let actual: any = undefined;
            let outputsMatch = false;
            if (ran) {
                try {
                    actual = JSON.parse((result.stdout || '').trim());
                    outputsMatch = JSON.stringify(actual) === JSON.stringify(testCase.expectedOutput);
                } catch {
                    outputsMatch = false;
                }
            }

            // Non-3 statuses (compile error, runtime error, TLE, etc.) or output
            // that didn't parse as JSON both surface as a readable error string
            // instead of a bogus "actual output" — the results page shows this
            // in place of the output when present.
            const error = !ran
                ? [result.status?.description, result.compile_output, result.stderr].filter(Boolean).join(': ').trim() || 'Execution failed'
                : actual === undefined
                    ? `Unparseable output: ${(result.stdout || '').trim().slice(0, 200) || '(empty)'}`
                    : null;

            return {
                passed: ran && outputsMatch,
                time: parseFloat(result.time || '0'),
                output: actual,
                error
            };
        })
    );
    return results;
}

async function getClaudeSolution(problem: any, language: string): Promise<{ code: string; time: number }> {
    const startTime = Date.now();
    const prompt = buildSolutionPrompt(problem, language);

    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
    });

    const aiTime = (Date.now() - startTime) / 1000;
    const content = message.content[0];
    const rawCode = content.type === 'text' ? content.text.trim() : '';

    // Claude often omits the stdin/stdout wrapper despite instructions — wrap it ourselves
    const wrappedCode = wrapWithIO(rawCode, language, problem);

    return { code: wrappedCode, time: aiTime };
}

// Judge0's Java sandbox has no org.json (or any JSON library) on the classpath —
// every Java driver below embeds this dependency-free parser/serializer instead.
// It's what actually fixed Java execution: previously every Java submission
// failed to compile (missing org.json) and, separately, the old driver printed
// `result.toString()` which isn't valid JSON for arrays anyway.
const JAVA_JSON_HELPER = `import java.util.*;
import java.lang.reflect.*;

class Json {
    private final String s;
    private int i = 0;
    private Json(String s) { this.s = s; }

    static Object parse(String s) {
        Json p = new Json(s);
        return p.parseValue();
    }

    private void skipWs() { while (i < s.length() && Character.isWhitespace(s.charAt(i))) i++; }

    private Object parseValue() {
        skipWs();
        char c = s.charAt(i);
        if (c == '{') return parseObject();
        if (c == '[') return parseArray();
        if (c == '"') return parseString();
        if (c == 't') { i += 4; return Boolean.TRUE; }
        if (c == 'f') { i += 5; return Boolean.FALSE; }
        if (c == 'n') { i += 4; return null; }
        return parseNumber();
    }

    private Map<String,Object> parseObject() {
        Map<String,Object> m = new LinkedHashMap<>();
        i++; skipWs();
        if (s.charAt(i) == '}') { i++; return m; }
        while (true) {
            skipWs();
            String key = parseString();
            skipWs();
            i++;
            Object val = parseValue();
            m.put(key, val);
            skipWs();
            if (s.charAt(i) == ',') { i++; continue; }
            if (s.charAt(i) == '}') { i++; break; }
        }
        return m;
    }

    private List<Object> parseArray() {
        List<Object> list = new ArrayList<>();
        i++; skipWs();
        if (s.charAt(i) == ']') { i++; return list; }
        while (true) {
            list.add(parseValue());
            skipWs();
            if (s.charAt(i) == ',') { i++; continue; }
            if (s.charAt(i) == ']') { i++; break; }
        }
        return list;
    }

    private String parseString() {
        skipWs();
        i++;
        StringBuilder sb = new StringBuilder();
        while (s.charAt(i) != '"') {
            char c = s.charAt(i);
            if (c == '\\\\') {
                i++;
                char esc = s.charAt(i);
                if (esc == 'n') sb.append('\\n');
                else if (esc == 't') sb.append('\\t');
                else if (esc == 'r') sb.append('\\r');
                else if (esc == 'u') { sb.append((char) Integer.parseInt(s.substring(i+1, i+5), 16)); i += 4; }
                else sb.append(esc);
            } else {
                sb.append(c);
            }
            i++;
        }
        i++;
        return sb.toString();
    }

    private Object parseNumber() {
        int start = i;
        if (s.charAt(i) == '-') i++;
        while (i < s.length() && (Character.isDigit(s.charAt(i)) || s.charAt(i)=='.' || s.charAt(i)=='e' || s.charAt(i)=='E' || (s.charAt(i)=='+' && i>start) || (s.charAt(i)=='-' && i>start))) i++;
        String numStr = s.substring(start, i);
        if (numStr.contains(".") || numStr.contains("e") || numStr.contains("E")) return Double.parseDouble(numStr);
        try { return Long.parseLong(numStr); } catch (NumberFormatException e) { return Double.parseDouble(numStr); }
    }

    static String stringify(Object o) {
        if (o == null) return "null";
        if (o instanceof String) {
            StringBuilder sb = new StringBuilder("\\"");
            for (char c : ((String) o).toCharArray()) {
                if (c == '"' || c == '\\\\') sb.append('\\\\').append(c);
                else sb.append(c);
            }
            return sb.append('"').toString();
        }
        if (o instanceof Double || o instanceof Float) {
            double d = ((Number) o).doubleValue();
            if (d == Math.floor(d) && !Double.isInfinite(d)) return String.valueOf((long) d);
            return o.toString();
        }
        if (o instanceof Boolean || o instanceof Integer || o instanceof Long) return o.toString();
        if (o instanceof int[]) {
            int[] a = (int[]) o;
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(','); sb.append(a[i]); }
            return sb.append(']').toString();
        }
        if (o instanceof List) {
            List<?> l = (List<?>) o;
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < l.size(); i++) { if (i > 0) sb.append(','); sb.append(stringify(l.get(i))); }
            return sb.append(']').toString();
        }
        return o.toString();
    }
}`;

// ListNode/TreeNode array<->structure conversion helpers, one set per language.
// The ListNode/TreeNode *class* itself lives in the problem's starterCode (same
// convention already used for TreeNode in the Trees category) so it's declared
// exactly once — these are just the build/serialize functions around it.
const LIST_HELPERS_PY = `
def __build_list(arr):
    dummy = ListNode(0)
    cur = dummy
    for v in arr:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def __list_to_array(node):
    arr = []
    while node:
        arr.append(node.val)
        node = node.next
    return arr
`;

const TREE_HELPERS_PY = `
def __build_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

def __tree_to_array(root):
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    while result and result[-1] is None:
        result.pop()
    return result
`;

const LIST_HELPERS_JS = `
function __buildList(arr) {
    const dummy = new ListNode(0);
    let cur = dummy;
    for (const v of arr) { cur.next = new ListNode(v); cur = cur.next; }
    return dummy.next;
}
function __listToArray(node) {
    const arr = [];
    while (node) { arr.push(node.val); node = node.next; }
    return arr;
}
`;

const TREE_HELPERS_JS = `
function __buildTree(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
        const node = queue.shift();
        if (i < arr.length && arr[i] !== null) { node.left = new TreeNode(arr[i]); queue.push(node.left); }
        i++;
        if (i < arr.length && arr[i] !== null) { node.right = new TreeNode(arr[i]); queue.push(node.right); }
        i++;
    }
    return root;
}
function __treeToArray(root) {
    const result = [];
    if (!root) return result;
    const queue = [root];
    while (queue.length) {
        const node = queue.shift();
        if (node) { result.push(node.val); queue.push(node.left); queue.push(node.right); }
        else result.push(null);
    }
    while (result.length && result[result.length - 1] === null) result.pop();
    return result;
}
`;

const LIST_HELPERS_JAVA = `
    static ListNode __buildList(List<Object> arr) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        for (Object v : arr) { cur.next = new ListNode(((Number) v).intValue()); cur = cur.next; }
        return dummy.next;
    }
    static List<Object> __listToArray(ListNode node) {
        List<Object> arr = new ArrayList<>();
        while (node != null) { arr.add(node.val); node = node.next; }
        return arr;
    }`;

const TREE_HELPERS_JAVA = `
    static TreeNode __buildTree(List<Object> arr) {
        if (arr.isEmpty() || arr.get(0) == null) return null;
        TreeNode root = new TreeNode(((Number) arr.get(0)).intValue());
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int i = 1;
        while (!queue.isEmpty() && i < arr.size()) {
            TreeNode node = queue.poll();
            if (i < arr.size() && arr.get(i) != null) { node.left = new TreeNode(((Number) arr.get(i)).intValue()); queue.add(node.left); }
            i++;
            if (i < arr.size() && arr.get(i) != null) { node.right = new TreeNode(((Number) arr.get(i)).intValue()); queue.add(node.right); }
            i++;
        }
        return root;
    }
    static List<Object> __treeToArray(TreeNode root) {
        List<Object> result = new ArrayList<>();
        if (root == null) return result;
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node != null) { result.add(node.val); queue.add(node.left); queue.add(node.right); }
            else result.add(null);
        }
        while (!result.isEmpty() && result.get(result.size() - 1) == null) result.remove(result.size() - 1);
        return result;
    }`;

function toCamelCase(name: string): string {
    return name.replace(/_([a-z])/g, (_: string, l: string) => l.toUpperCase());
}

// Java argument coercion + reflective invocation, shared by wrapFunction and
// wrapMultiCall. Necessary because e.g. `new Solution().twoSum(data.get("nums"), ...)`
// does not compile — data.get() is statically typed Object, and Java requires an
// exact/assignable type match at compile time (no implicit Object -> int[] cast).
// Reflection sidesteps this: discover each parameter's real type at runtime and
// coerce the parsed JSON value to match before invoking.
const JAVA_INVOKE_HELPER = `
class Invoker {
    @SuppressWarnings("unchecked")
    static Object convertOne(Object raw, Class<?> t) {
        if (raw == null) return null;
        if (t == int.class || t == Integer.class) return ((Number) raw).intValue();
        if (t == long.class || t == Long.class) return ((Number) raw).longValue();
        if (t == double.class || t == Double.class) return ((Number) raw).doubleValue();
        if (t == boolean.class || t == Boolean.class) return raw;
        if (t == String.class) return raw;
        if (t == char.class || t == Character.class) return ((String) raw).charAt(0);
        if (t == int[].class) {
            List<Object> a = (List<Object>) raw;
            int[] r = new int[a.size()];
            for (int j = 0; j < a.size(); j++) r[j] = ((Number) a.get(j)).intValue();
            return r;
        }
        if (t == int[][].class) {
            List<Object> a = (List<Object>) raw;
            int[][] r = new int[a.size()][];
            for (int j = 0; j < a.size(); j++) r[j] = (int[]) convertOne(a.get(j), int[].class);
            return r;
        }
        if (t == String[].class) {
            List<Object> a = (List<Object>) raw;
            String[] r = new String[a.size()];
            for (int j = 0; j < a.size(); j++) r[j] = (String) a.get(j);
            return r;
        }
        if (t == char[].class) {
            List<Object> a = (List<Object>) raw;
            char[] r = new char[a.size()];
            for (int j = 0; j < a.size(); j++) r[j] = ((String) a.get(j)).charAt(0);
            return r;
        }
        // Already a domain object (e.g. a pre-built ListNode/TreeNode) or a List
        // that can be passed as-is (generics are erased at runtime) — pass through.
        return raw;
    }

    static Object[] convertArgs(List<Object> arr, Class<?>[] paramTypes) {
        Object[] out = new Object[paramTypes.length];
        for (int i = 0; i < paramTypes.length; i++) out[i] = convertOne(arr.get(i), paramTypes[i]);
        return out;
    }

    static Object call(Object obj, Class<?> clazz, String methodName, List<Object> rawArgs) throws Exception {
        Method target = null;
        for (Method m : clazz.getMethods()) {
            if (m.getName().equals(methodName)) { target = m; break; }
        }
        return target.invoke(obj, convertArgs(rawArgs, target.getParameterTypes()));
    }
}`;

function wrapFunction(solutionCode: string, language: string, problem: any): string {
    const funcName = problem.functionName;
    const sampleInput = problem.testCases[0]?.input || {};
    const inputKeys = Object.keys(sampleInput);
    const listParams: string[] = problem.listNodeParams || [];
    const treeParams: string[] = problem.treeNodeParams || [];

    if (language === 'python') {
        const dataArgs = inputKeys.map(k => {
            if (listParams.includes(k)) return `__build_list(data["${k}"])`;
            if (treeParams.includes(k)) return `__build_tree(data["${k}"])`;
            return `data["${k}"]`;
        }).join(', ');
        const helpers = (listParams.length ? LIST_HELPERS_PY : '') + (treeParams.length ? TREE_HELPERS_PY : '');
        const resultLine = problem.returnsListNode
            ? `result = __list_to_array(${funcName}(${dataArgs}))`
            : problem.returnsTreeNode
                ? `result = __tree_to_array(${funcName}(${dataArgs}))`
                : `result = ${funcName}(${dataArgs})`;
        return `import json
import sys
${helpers}
${solutionCode}

if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    ${resultLine}
    print(json.dumps(result, separators=(",", ":")))`;
    }

    if (language === 'javascript') {
        const camelName = toCamelCase(funcName);
        const dataArgs = inputKeys.map(k => {
            if (listParams.includes(k)) return `__buildList(data.${k})`;
            if (treeParams.includes(k)) return `__buildTree(data.${k})`;
            return `data.${k}`;
        }).join(', ');
        const helpers = (listParams.length ? LIST_HELPERS_JS : '') + (treeParams.length ? TREE_HELPERS_JS : '');
        const resultLine = problem.returnsListNode
            ? `const result = __listToArray(${camelName}(${dataArgs}));`
            : problem.returnsTreeNode
                ? `const result = __treeToArray(${camelName}(${dataArgs}));`
                : `const result = ${camelName}(${dataArgs});`;
        return `${helpers}
${solutionCode}

const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    ${resultLine}
    console.log(JSON.stringify(result));
});`;
    }

    if (language === 'java') {
        const argBuilders = inputKeys.map(k => {
            if (listParams.includes(k)) return `__args.add(__buildList((List<Object>) data.get("${k}")));`;
            if (treeParams.includes(k)) return `__args.add(__buildTree((List<Object>) data.get("${k}")));`;
            return `__args.add(data.get("${k}"));`;
        }).join('\n        ');
        const helpers = (listParams.length ? LIST_HELPERS_JAVA : '') + (treeParams.length ? TREE_HELPERS_JAVA : '');
        // Java methods follow the camelCase convention (per starter code), while
        // problem.functionName is stored snake_case (shared with Python) — convert
        // before the reflective lookup, same as the JS branch already does.
        const invokeExpr = `Invoker.call(new Solution(), Solution.class, "${toCamelCase(funcName)}", __args)`;
        const resultLine = problem.returnsListNode
            ? `Object result = __listToArray((ListNode) ${invokeExpr});`
            : problem.returnsTreeNode
                ? `Object result = __treeToArray((TreeNode) ${invokeExpr});`
                : `Object result = ${invokeExpr};`;
        // solutionCode already contains its own top-level `class Solution { ... }`
        // (per the existing starter-code convention) — it must NOT be nested
        // inside another class of the same name, so Main stays separate. Args are
        // invoked reflectively (via Invoker) rather than directly, since a plain
        // `data.get("nums")` is statically typed Object and won't compile against
        // a method expecting e.g. int[] without an explicit, per-problem cast.
        return `${JAVA_JSON_HELPER}
${JAVA_INVOKE_HELPER}

${solutionCode}

public class Main {
    ${helpers}

    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        @SuppressWarnings("unchecked")
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        List<Object> __args = new ArrayList<>();
        ${argBuilders}
        ${resultLine}
        System.out.println(Json.stringify(result));
    }
}`;
    }

    return solutionCode;
}

// Multi-call harness: instantiates a class (named functionName) once, then calls
// a sequence of methods on it. testCase.input looks like:
//   { operations: ['MyQueue','push','push','peek'], args: [[],[1],[2],[]] }
// operations[0]/args[0] are the constructor; expectedOutput is the parallel
// array of return values (null for the constructor and void methods) — this is
// the same convention LeetCode itself uses for these "design" problems.
function wrapMultiCall(solutionCode: string, language: string, problem: any): string {
    const funcName = problem.functionName;

    if (language === 'python') {
        return `import json
import sys
import re

def __to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\\1_\\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\\1_\\2', s1).lower()

${solutionCode}

if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    operations = data["operations"]
    args = data["args"]
    results = []
    obj = None
    for i in range(len(operations)):
        call_args = args[i]
        if i == 0:
            obj = ${funcName}(*call_args)
            results.append(None)
        else:
            method = getattr(obj, __to_snake(operations[i]))
            results.append(method(*call_args))
    print(json.dumps(results, separators=(",", ":")))`;
    }

    if (language === 'javascript') {
        return `${solutionCode}

const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const operations = data.operations;
    const args = data.args;
    const results = [];
    let obj = null;
    for (let i = 0; i < operations.length; i++) {
        if (i === 0) {
            obj = new ${funcName}(...args[i]);
            results.push(null);
        } else {
            results.push(obj[operations[i]](...args[i]));
        }
    }
    console.log(JSON.stringify(results));
});`;
    }

    if (language === 'java') {
        // solutionCode defines its own top-level class (named functionName), so
        // it stays outside Main rather than nested inside it. Argument coercion
        // reuses the shared Invoker (see wrapFunction) instead of duplicating it.
        return `${JAVA_JSON_HELPER}
${JAVA_INVOKE_HELPER}

${solutionCode}

public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        List<Object> operations = (List<Object>) data.get("operations");
        List<Object> argsList = (List<Object>) data.get("args");
        List<Object> results = new ArrayList<>();
        Object obj = null;
        Class<?> clazz = Class.forName((String) operations.get(0));
        for (int i = 0; i < operations.size(); i++) {
            List<Object> callArgs = (List<Object>) argsList.get(i);
            if (i == 0) {
                Constructor<?> ctor = clazz.getConstructors()[0];
                obj = ctor.newInstance(Invoker.convertArgs(callArgs, ctor.getParameterTypes()));
                results.add(null);
            } else {
                String methodName = (String) operations.get(i);
                results.add(Invoker.call(obj, clazz, methodName, callArgs));
            }
        }
        System.out.println(Json.stringify(results));
    }
}`;
    }

    return solutionCode;
}

// Interactive: splices problem.customDriver (a hand-written callback definition,
// e.g. a `guess(num)` function closing over a secret read from stdin) between
// the JSON parsing and the user's own solutionCode, so the user's function can
// call it exactly like the real LeetCode "interactive problem" judge callback.
function wrapInteractive(solutionCode: string, language: string, problem: any): string {
    const funcName = problem.functionName;
    const driver = problem.customDriver?.[language] || '';
    const sampleInput = problem.testCases[0]?.input || {};
    const inputKeys = Object.keys(sampleInput).filter(k => !(problem.interactiveSecretKeys || []).includes(k));

    if (language === 'python') {
        const dataArgs = inputKeys.map(k => `data["${k}"]`).join(', ');
        return `import json
import sys

${driver}

${solutionCode}

if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    result = ${funcName}(${dataArgs})
    print(json.dumps(result, separators=(",", ":")))`;
    }

    if (language === 'javascript') {
        const dataArgs = inputKeys.map(k => `data.${k}`).join(', ');
        return `const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));

    ${driver}

    ${solutionCode}

    const result = ${toCamelCase(funcName)}(${dataArgs});
    console.log(JSON.stringify(result));
});`;
    }

    if (language === 'java') {
        // customDriver.java defines a top-level `class Judge { static Map<String,Object>
        // data; static <ret> <name>(...) {...} }` — solutionCode's Solution class calls
        // it as `Judge.methodName(...)`, matching real LeetCode's interactive-problem
        // convention (there it's inheritance from a judge base class; a qualified
        // static call is the same idea without the nested-class complications).
        const argBuilders = inputKeys.map(k => `__args.add(data.get("${k}"));`).join('\n        ');
        return `${JAVA_JSON_HELPER}
${JAVA_INVOKE_HELPER}

${driver}

${solutionCode}

public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        Judge.data = data;
        List<Object> __args = new ArrayList<>();
        ${argBuilders}
        Object result = Invoker.call(new Solution(), Solution.class, "${toCamelCase(funcName)}", __args);
        System.out.println(Json.stringify(result));
    }
}`;
    }

    return solutionCode;
}

// Concurrency: problem.customDriver owns the entire orchestration (thread
// creation, synchronization, output collection, printing) since that varies
// per problem — solutionCode only needs to supply the class being tested.
function wrapConcurrent(solutionCode: string, language: string, problem: any): string {
    const driver = problem.customDriver?.[language] || '';

    if (language === 'python') {
        return `import json
import sys
import threading

${solutionCode}

${driver}`;
    }

    if (language === 'javascript') {
        return `${solutionCode}

${driver}`;
    }

    if (language === 'java') {
        // customDriver.java is the entire `public class Main { public static void
        // main(...) {...} }` (thread creation, joins, printing) — it has full
        // control since orchestration varies per problem. solutionCode's class
        // stays top-level/un-nested, same reasoning as the other execution types.
        return `${JAVA_JSON_HELPER}

${solutionCode}

${driver}`;
    }

    return solutionCode;
}

function wrapWithIO(solutionCode: string, language: string, problem: any): string {
    const executionType = problem.executionType || 'function';
    if (executionType === 'multi-call') return wrapMultiCall(solutionCode, language, problem);
    if (executionType === 'interactive') return wrapInteractive(solutionCode, language, problem);
    if (executionType === 'concurrent') return wrapConcurrent(solutionCode, language, problem);
    return wrapFunction(solutionCode, language, problem);
}

async function evaluateCodeQuality(
    problem: any,
    userCode: string,
    aiCode: string,
    language: string
): Promise<{ userScore: number; aiScore: number; explanation: string }> {
    const prompt = `You are an expert code reviewer. Evaluate these two solutions to the same coding problem.

Problem: ${problem.title}
${problem.description}

Solution A (Human Developer):
\`\`\`${language}
${userCode}
\`\`\`

Solution B (AI):
\`\`\`${language}
${aiCode}
\`\`\`

Evaluate both solutions on:
1. Time complexity (O notation)
2. Space complexity
3. Code readability and clarity
4. Edge case handling
5. Overall elegance

Respond with ONLY a JSON object in this exact format:
{
  "userScore": <number 0-100>,
  "aiScore": <number 0-100>,
  "explanation": "<2-3 sentences explaining the key differences and what the developer could improve>"
}`;

    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
    });

    const content = message.content[0];
    const text = content.type === 'text' ? content.text.trim() : '{}';

    try {
        const clean = text.replace(/```json|```/g, '').trim();
        return JSON.parse(clean);
    } catch {
        return { userScore: 50, aiScore: 50, explanation: 'Unable to evaluate code quality.' };
    }
}

function calculateEloChange(result: 'win' | 'loss' | 'draw', difficulty: string): number {
    const kFactor = difficulty === 'hard' ? 25 : difficulty === 'medium' ? 20 : 15;
    if (result === 'win') return kFactor;
    if (result === 'loss') return -Math.floor(kFactor * 0.75);
    return 5;
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    let reservedSlot = false;
    let dayKey: Date | null = null;
    let userId: string | null = null;

    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
        userId = user._id.toString();

        const { problemId, language, userCode, userTime } = await req.json();

        if (!problemId || !language || !userCode || userTime === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
        }

        // Fetch the problem
        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        // Gate premium problems
        if (problem.isPremium && user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required' }, { status: 403, headers: corsHeaders });
        }

        if (user.plan === 'free') {
            dayKey = new Date();
            dayKey.setHours(0, 0, 0, 0);

            try {
                await DailyDuelCount.findOneAndUpdate(
                    { userId: user._id, date: dayKey, count: { $lt: 3 } },
                    { $inc: { count: 1 } },
                    { upsert: true, new: true }
                );
                reservedSlot = true;
            } catch (reserveErr: any) {
                // A duplicate-key error here means a counter for today already exists
                // and its count wasn't < 3, i.e. the free tier limit is genuinely hit.
                if (reserveErr.code === 11000) {
                    return NextResponse.json({
                        error: 'Free tier limit reached. Upgrade to Pro for unlimited duels.',
                        limitReached: true
                    }, { status: 403, headers: corsHeaders });
                }
                throw reserveErr;
            }
        }

        // Wrap user code with stdin/stdout if not already wrapped
        const wrappedUserCode = userCode.includes('stdin') || userCode.includes('sys.stdin')
            ? userCode
            : wrapWithIO(userCode, language, problem);

        // Run user code against test cases
        const userResults = await executeCode(wrappedUserCode, language, problem.testCases);
        const userTestsPassed = userResults.filter(r => r.passed).length;

        // Reuse the solution Claude was already streaming live during the user's
        // duel (see /api/duels/live-solve) instead of generating a second one —
        // falls back to a fresh generation if the user submitted before that
        // stream finished, or if it never started.
        const liveSolve = await LiveSolveSession.findOne({
            userId: user._id,
            problemId: problem._id,
            language
        }).sort({ createdAt: -1 });

        const { code: aiCode, time: aiTime } = liveSolve
            ? { code: wrapWithIO(liveSolve.aiCode, language, problem), time: liveSolve.aiTime }
            : await getClaudeSolution(problem, language);

        // Run AI code against test cases
        const aiResults = await executeCode(aiCode, language, problem.testCases);
        const aiTestsPassed = aiResults.filter(r => r.passed).length;

        // Evaluate code quality
        const { userScore: userQualityRaw, aiScore: aiQualityRaw, explanation } =
            await evaluateCodeQuality(problem, userCode, aiCode, language);

        // Calculate final scores
        const totalTests = problem.testCases.length;
        const userCorrectnessScore = Math.round((userTestsPassed / totalTests) * 50);
        const aiCorrectnessScore = Math.round((aiTestsPassed / totalTests) * 50);

        // Speed score — faster time = higher score (max 10 points)
        const totalTime = userTime + aiTime;
        const userSpeedScore = Math.round(totalTime > 0 ? ((aiTime / totalTime)) * 10 : 5);
        const aiSpeedScore = Math.round(totalTime > 0 ? ((userTime / totalTime)) * 10 : 5);

        // Quality score — max 40 points, weighted from the raw 0-100 LLM rating
        const userQualityScore = Math.round(userQualityRaw / 100 * 40);
        const aiQualityScore = Math.round(aiQualityRaw / 100 * 40);

        const userFinalScore = userCorrectnessScore + userSpeedScore + userQualityScore;
        const aiFinalScore = aiCorrectnessScore + aiSpeedScore + aiQualityScore;

        // Per-test-case breakdown for the results page — pairs each test case
        // with both sides' actual output (or error) next to what was expected.
        const testCaseResults = problem.testCases.map((tc: any, i: number) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            userOutput: userResults[i].output,
            userError: userResults[i].error,
            userPassed: userResults[i].passed,
            aiOutput: aiResults[i].output,
            aiError: aiResults[i].error,
            aiPassed: aiResults[i].passed,
            isHidden: !!tc.isHidden
        }));

        // Determine result
        const diff = userFinalScore - aiFinalScore;
        const result: 'win' | 'loss' | 'draw' = diff > 5 ? 'win' : diff < -5 ? 'loss' : 'draw';

        // Calculate ELO change
        const eloChange = calculateEloChange(result, problem.difficulty);

        // Get Claude's explanation of its approach
        const explanationMessage = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 512,
            messages: [{
                role: 'user',
                content: `You just solved "${problem.title}" in ${language}. Here's your solution:

\`\`\`${language}
${aiCode}
\`\`\`

In 2-3 sentences, explain your approach and the key insight that makes this solution efficient. Be direct and educational.`
            }]
        });

        const approachExplanation = explanationMessage.content[0].type === 'text'
            ? explanationMessage.content[0].text
            : '';

        // Save duel
        const duel = new Duel({
            userId: user._id,
            problemId,
            language,
            userCode,
            aiCode,
            userTime,
            aiTime,
            userTestsPassed,
            aiTestsPassed,
            totalTests,
            userScore: userFinalScore,
            aiScore: aiFinalScore,
            userCorrectnessScore,
            aiCorrectnessScore,
            userSpeedScore,
            aiSpeedScore,
            userQualityScore,
            aiQualityScore,
            userQualityRaw,
            aiQualityRaw,
            testCaseResults,
            result,
            aiExplanation: explanation,
            aiApproach: approachExplanation,
            eloChange
        });
        await duel.save();

        const statsUpdate: any = {
            'stats.totalDuels': user.stats.totalDuels + 1,
            'stats.eloRating': Math.max(0, user.stats.eloRating + eloChange)
        };

        if (result === 'win') {
            statsUpdate['stats.wins'] = user.stats.wins + 1;
            statsUpdate['stats.currentStreak'] = user.stats.currentStreak + 1;
            statsUpdate['stats.bestStreak'] = Math.max(
                user.stats.bestStreak,
                user.stats.currentStreak + 1
            );
        } else if (result === 'loss') {
            statsUpdate['stats.losses'] = user.stats.losses + 1;
            statsUpdate['stats.currentStreak'] = 0;
        } else {
            statsUpdate['stats.draws'] = user.stats.draws + 1;
            statsUpdate['stats.currentStreak'] = user.stats.currentStreak + 1;
        }

        await User.findByIdAndUpdate(user._id, { $set: statsUpdate });

        return NextResponse.json({
            duelId: duel._id,
            result,
            userScore: userFinalScore,
            aiScore: aiFinalScore,
            userCorrectnessScore,
            aiCorrectnessScore,
            userSpeedScore,
            aiSpeedScore,
            userQualityScore,
            aiQualityScore,
            userQualityRaw,
            aiQualityRaw,
            testCaseResults,
            userTestsPassed,
            aiTestsPassed,
            totalTests,
            userTime,
            aiTime,
            aiCode,
            aiExplanation: explanation,
            aiApproach: approachExplanation,
            eloChange,
            newElo: Math.max(0, user.stats.eloRating + eloChange)
        }, { headers: corsHeaders });

    } catch (err: any) {
        if (reservedSlot && dayKey && userId) {
            try {
                await DailyDuelCount.findOneAndUpdate(
                    { userId, date: dayKey },
                    { $inc: { count: -1 } }
                );
            } catch {}
        }
        console.log('Duel error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

// GET — fetch duel history
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const duels = await Duel.find({ userId: user._id })
            .populate('problemId', 'title difficulty category')
            .sort({ completedAt: -1 })
            .limit(20);

        return NextResponse.json(duels, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}
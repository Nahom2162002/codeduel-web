// Code generation for the 6 languages added on top of the original
// Python/JavaScript/Java support (see lib/codeExecution.ts). Unlike those
// three — which are either dynamically typed (Python/JS, no conversion
// needed) or use runtime reflection to discover a method's parameter types
// (Java) — Go, C#, Rust, C++, and C either lack reflection entirely (Rust,
// C++, C) or don't have it available in Judge0's single-file compile
// sandbox in a usable form. So instead every problem's parameter/return
// types are parsed ONCE from its already-correct Java signature into
// `problem.paramTypes`/`returnType`/`methods` (see
// scripts/migrateLanguageSignatures.ts), and this module generates
// statically-typed parsing/call code directly from that stored type info —
// no runtime type discovery needed in the generated program itself.
//
// Canonical type vocabulary actually used across all 124 problems: int,
// long, bool, string, int[], int[][], string[], char[][], listNode,
// treeNode, void, plus two rare pass-through cases (`node`, `dynamic`) for
// the two problems whose Java signature uses a graph Node / raw
// List<Object> — those two are only supported on languages with a natural
// dynamic/any type (Go, C#, TypeScript); C++/Rust/C skip starter code for
// just those two problems rather than fake a type system they don't have.

interface ParamType { name: string; type: string; }
interface MethodSig { name: string; paramTypes: ParamType[]; returnType: string; }

function toCamelCase(name: string): string {
    return name.replace(/_([a-z])/g, (_: string, l: string) => l.toUpperCase());
}
function toPascalCase(name: string): string {
    const camel = toCamelCase(name);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function isArray(t: string) { return t.endsWith('[]'); }
function elemType(t: string) { return t.slice(0, -2); }

// ===================================================================
// GO
// ===================================================================

export const GO_JSON_HELPERS = `
func __toInt(v interface{}) int      { return int(v.(float64)) }
func __toLong(v interface{}) int64   { return int64(v.(float64)) }
func __toBool(v interface{}) bool    { return v.(bool) }
func __toStr(v interface{}) string   { return v.(string) }
func __toByte(v interface{}) byte    { return v.(string)[0] }
func __toIntArray(v interface{}) []int {
	arr := v.([]interface{})
	out := make([]int, len(arr))
	for i, x := range arr { out[i] = __toInt(x) }
	return out
}
func __toStrArray(v interface{}) []string {
	arr := v.([]interface{})
	out := make([]string, len(arr))
	for i, x := range arr { out[i] = __toStr(x) }
	return out
}
func __toIntGrid(v interface{}) [][]int {
	arr := v.([]interface{})
	out := make([][]int, len(arr))
	for i, x := range arr { out[i] = __toIntArray(x) }
	return out
}
func __toCharGrid(v interface{}) [][]byte {
	arr := v.([]interface{})
	out := make([][]byte, len(arr))
	for i, row := range arr {
		rowArr := row.([]interface{})
		out[i] = make([]byte, len(rowArr))
		for j, c := range rowArr { out[i][j] = __toByte(c) }
	}
	return out
}
`;

export const GO_LIST_HELPERS = `
type ListNode struct {
	Val  int
	Next *ListNode
}
func __buildList(arr []int) *ListNode {
	dummy := &ListNode{}
	cur := dummy
	for _, v := range arr {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return dummy.Next
}
func __listToArray(node *ListNode) []int {
	out := []int{}
	for node != nil {
		out = append(out, node.Val)
		node = node.Next
	}
	return out
}
`;

export const GO_TREE_HELPERS = `
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}
func __buildTree(arr []interface{}) *TreeNode {
	if len(arr) == 0 || arr[0] == nil { return nil }
	root := &TreeNode{Val: __toInt(arr[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(arr) {
		node := queue[0]
		queue = queue[1:]
		if i < len(arr) && arr[i] != nil {
			node.Left = &TreeNode{Val: __toInt(arr[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(arr) && arr[i] != nil {
			node.Right = &TreeNode{Val: __toInt(arr[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}
func __treeToArray(root *TreeNode) []interface{} {
	result := []interface{}{}
	if root == nil { return result }
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		if node != nil {
			result = append(result, node.Val)
			queue = append(queue, node.Left, node.Right)
		} else {
			result = append(result, nil)
		}
	}
	for len(result) > 0 && result[len(result)-1] == nil {
		result = result[:len(result)-1]
	}
	return result
}
`;

function goType(t: string): string {
    if (t === 'int') return 'int';
    if (t === 'long') return 'int64';
    if (t === 'bool') return 'bool';
    if (t === 'string') return 'string';
    if (t === 'void') return '';
    if (t === 'listNode') return '*ListNode';
    if (t === 'treeNode') return '*TreeNode';
    if (t === 'node' || t === 'dynamic') return 'interface{}';
    if (t === 'char[][]') return '[][]byte';
    if (isArray(t)) return `[]${goType(elemType(t))}`;
    throw new Error(`goType: unsupported type ${t}`);
}

function goDecode(t: string, raw: string): string {
    if (t === 'int') return `__toInt(${raw})`;
    if (t === 'long') return `__toLong(${raw})`;
    if (t === 'bool') return `__toBool(${raw})`;
    if (t === 'string') return `__toStr(${raw})`;
    if (t === 'listNode') return `__buildList(__toIntArray(${raw}))`;
    if (t === 'treeNode') return `__buildTree(${raw}.([]interface{}))`;
    if (t === 'node' || t === 'dynamic') return raw;
    if (t === 'char[][]') return `__toCharGrid(${raw})`;
    if (t === 'int[]') return `__toIntArray(${raw})`;
    if (t === 'int[][]') return `__toIntGrid(${raw})`;
    if (t === 'string[]') return `__toStrArray(${raw})`;
    throw new Error(`goDecode: unsupported type ${t}`);
}

function goEncodeResult(returnType: string, resultVar: string): string {
    if (returnType === 'listNode') return `__listToArray(${resultVar})`;
    if (returnType === 'treeNode') return `__treeToArray(${resultVar})`;
    return resultVar; // everything else marshals natively via encoding/json
}

export function wrapFunctionGo(solutionCode: string, problem: any): string {
    const needsList = problem.listNodeParams?.length || problem.returnsListNode;
    const needsTree = problem.treeNodeParams?.length || problem.returnsTreeNode;
    const params: ParamType[] = problem.paramTypes || [];

    const decodes = params.map(p => `\t${p.name} := ${goDecode(p.type, `raw["${p.name}"]`)}`).join('\n');
    const callArgs = params.map(p => p.name).join(', ');
    const funcName = toCamelCase(problem.functionName);
    const resultExpr = problem.returnType === 'void' ? `${funcName}(${callArgs})` : `result := ${funcName}(${callArgs})`;
    const printExpr = problem.returnType === 'void'
        ? `fmt.Println("null")`
        : `out, _ := json.Marshal(${goEncodeResult(problem.returnType, 'result')})\n\tfmt.Println(string(out))`;

    // solutionCode is placed immediately after the base import block (before
    // the JSON/list/tree helper functions) rather than after them — Go
    // requires every import declaration to precede all other top-level
    // declarations in the file, and unlike most languages, an unused import
    // is a compile *error* here, so the base block can't just defensively
    // import everything a solution might need. Putting solutionCode first
    // means a user needing e.g. "sort" or "strings" can add their own import
    // block at the top of their code, exactly like a real Go environment.
    return `package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

${solutionCode}
${GO_JSON_HELPERS}${needsList ? GO_LIST_HELPERS : ''}${needsTree ? GO_TREE_HELPERS : ''}

func main() {
	inputBytes, _ := io.ReadAll(os.Stdin)
	var raw map[string]interface{}
	json.Unmarshal(inputBytes, &raw)

${decodes}
	${resultExpr}
	${printExpr}
}
`;
}

export function wrapMultiCallGo(solutionCode: string, problem: any): string {
    const methods: MethodSig[] = problem.methods || [];
    const ctor = methods[0];
    const rest = methods.slice(1);
    const className = toPascalCase(problem.functionName);

    const cases = rest.map((m, idx) => {
        const argExprs = m.paramTypes.map((p, i) => goDecode(p.type, `callArgs[${i}]`)).join(', ');
        const methodName = toPascalCase(m.name);
        if (m.returnType === 'void') {
            return `\t\tcase "${m.name}":\n\t\t\tobj.${methodName}(${argExprs})\n\t\t\tresults = append(results, nil)`;
        }
        return `\t\tcase "${m.name}":\n\t\t\tresults = append(results, ${goEncodeResult(m.returnType, `obj.${methodName}(${argExprs})`)})`;
    }).join('\n');

    const ctorArgs = ctor.paramTypes.map((p, i) => goDecode(p.type, `callArgs[${i}]`)).join(', ');

    // See wrapFunctionGo for why solutionCode precedes the helper functions.
    return `package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

${solutionCode}
${GO_JSON_HELPERS}

func main() {
	inputBytes, _ := io.ReadAll(os.Stdin)
	var raw map[string]interface{}
	json.Unmarshal(inputBytes, &raw)

	operations := raw["operations"].([]interface{})
	argsList := raw["args"].([]interface{})

	var obj *${className}
	results := []interface{}{}

	for i, opRaw := range operations {
		op := opRaw.(string)
		callArgs := argsList[i].([]interface{})
		if i == 0 {
			obj = New${className}(${ctorArgs})
			results = append(results, nil)
			continue
		}
		switch op {
${cases}
		}
	}

	out, _ := json.Marshal(results)
	fmt.Println(string(out))
}
`;
}

// ===================================================================
// C#
// ===================================================================
// Judge0's C# runtime is Mono 6.6 with no System.Text.Json available in a
// single-file compile — hand-rolled JSON, same as C++/Rust/C.

export const CSHARP_JSON_HELPERS = `
class Json {
    string s; int i = 0;
    Json(string s) { this.s = s; }
    public static object Parse(string s) { return new Json(s).ParseValue(); }
    void SkipWs() { while (i < s.Length && char.IsWhiteSpace(s[i])) i++; }
    object ParseValue() {
        SkipWs();
        char c = s[i];
        if (c == '{') return ParseObject();
        if (c == '[') return ParseArray();
        if (c == '"') return ParseString();
        if (c == 't') { i += 4; return true; }
        if (c == 'f') { i += 5; return false; }
        if (c == 'n') { i += 4; return null; }
        return ParseNumber();
    }
    System.Collections.Generic.Dictionary<string, object> ParseObject() {
        var m = new System.Collections.Generic.Dictionary<string, object>();
        i++; SkipWs();
        if (s[i] == '}') { i++; return m; }
        while (true) {
            SkipWs(); string key = ParseString(); SkipWs(); i++;
            m[key] = ParseValue(); SkipWs();
            if (s[i] == ',') { i++; continue; }
            if (s[i] == '}') { i++; break; }
        }
        return m;
    }
    System.Collections.Generic.List<object> ParseArray() {
        var list = new System.Collections.Generic.List<object>();
        i++; SkipWs();
        if (s[i] == ']') { i++; return list; }
        while (true) {
            list.Add(ParseValue()); SkipWs();
            if (s[i] == ',') { i++; continue; }
            if (s[i] == ']') { i++; break; }
        }
        return list;
    }
    string ParseString() {
        SkipWs(); i++;
        var sb = new System.Text.StringBuilder();
        while (s[i] != '"') {
            char c = s[i];
            if (c == '\\\\') {
                i++; char esc = s[i];
                if (esc == 'n') sb.Append('\\n');
                else if (esc == 't') sb.Append('\\t');
                else if (esc == 'r') sb.Append('\\r');
                else sb.Append(esc);
            } else sb.Append(c);
            i++;
        }
        i++;
        return sb.ToString();
    }
    object ParseNumber() {
        int start = i;
        if (s[i] == '-') i++;
        while (i < s.Length && (char.IsDigit(s[i]) || s[i]=='.' || s[i]=='e' || s[i]=='E' || s[i]=='+' || s[i]=='-')) i++;
        string numStr = s.Substring(start, i - start);
        return double.Parse(numStr, System.Globalization.CultureInfo.InvariantCulture);
    }
    public static string Stringify(object o) {
        if (o == null) return "null";
        if (o is string str) {
            var sb = new System.Text.StringBuilder("\\"");
            foreach (char c in str) { if (c == '"' || c == '\\\\') sb.Append('\\\\'); sb.Append(c); }
            return sb.Append('"').ToString();
        }
        if (o is bool b) return b ? "true" : "false";
        if (o is double d) return d.ToString(System.Globalization.CultureInfo.InvariantCulture);
        if (o is int || o is long) return o.ToString();
        if (o is System.Collections.IEnumerable en) {
            var sb = new System.Text.StringBuilder("[");
            bool first = true;
            foreach (var item in en) { if (!first) sb.Append(','); first = false; sb.Append(Stringify(item)); }
            return sb.Append(']').ToString();
        }
        return o.ToString();
    }
}
class __Conv {
    public static int ToInt(object v) => System.Convert.ToInt32(v);
    public static long ToLong(object v) => System.Convert.ToInt64(v);
    public static bool ToBool(object v) => (bool)v;
    public static string ToStr(object v) => (string)v;
    public static int[] ToIntArray(object v) {
        var list = (System.Collections.Generic.List<object>)v;
        var r = new int[list.Count];
        for (int j = 0; j < list.Count; j++) r[j] = ToInt(list[j]);
        return r;
    }
    public static string[] ToStrArray(object v) {
        var list = (System.Collections.Generic.List<object>)v;
        var r = new string[list.Count];
        for (int j = 0; j < list.Count; j++) r[j] = ToStr(list[j]);
        return r;
    }
    public static int[][] ToIntGrid(object v) {
        var list = (System.Collections.Generic.List<object>)v;
        var r = new int[list.Count][];
        for (int j = 0; j < list.Count; j++) r[j] = ToIntArray(list[j]);
        return r;
    }
    public static char[][] ToCharGrid(object v) {
        var list = (System.Collections.Generic.List<object>)v;
        var r = new char[list.Count][];
        for (int j = 0; j < list.Count; j++) {
            var row = (System.Collections.Generic.List<object>)list[j];
            r[j] = new char[row.Count];
            for (int k = 0; k < row.Count; k++) r[j][k] = ((string)row[k])[0];
        }
        return r;
    }
}
`;

export const CSHARP_LIST_HELPERS = `
public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int val = 0, ListNode next = null) { this.val = val; this.next = next; }
}
class __ListHelper {
    public static ListNode Build(int[] arr) {
        var dummy = new ListNode(0);
        var cur = dummy;
        foreach (var v in arr) { cur.next = new ListNode(v); cur = cur.next; }
        return dummy.next;
    }
    public static System.Collections.Generic.List<object> ToArray(ListNode node) {
        var arr = new System.Collections.Generic.List<object>();
        while (node != null) { arr.Add(node.val); node = node.next; }
        return arr;
    }
}
`;

export const CSHARP_TREE_HELPERS = `
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null) { this.val = val; this.left = left; this.right = right; }
}
class __TreeHelper {
    public static TreeNode Build(System.Collections.Generic.List<object> arr) {
        if (arr.Count == 0 || arr[0] == null) return null;
        var root = new TreeNode(__Conv.ToInt(arr[0]));
        var queue = new System.Collections.Generic.Queue<TreeNode>();
        queue.Enqueue(root);
        int i = 1;
        while (queue.Count > 0 && i < arr.Count) {
            var node = queue.Dequeue();
            if (i < arr.Count && arr[i] != null) { node.left = new TreeNode(__Conv.ToInt(arr[i])); queue.Enqueue(node.left); }
            i++;
            if (i < arr.Count && arr[i] != null) { node.right = new TreeNode(__Conv.ToInt(arr[i])); queue.Enqueue(node.right); }
            i++;
        }
        return root;
    }
    public static System.Collections.Generic.List<object> ToArray(TreeNode root) {
        var result = new System.Collections.Generic.List<object>();
        if (root == null) return result;
        var queue = new System.Collections.Generic.Queue<TreeNode>();
        queue.Enqueue(root);
        while (queue.Count > 0) {
            var node = queue.Dequeue();
            if (node != null) { result.Add(node.val); queue.Enqueue(node.left); queue.Enqueue(node.right); }
            else result.Add(null);
        }
        while (result.Count > 0 && result[result.Count - 1] == null) result.RemoveAt(result.Count - 1);
        return result;
    }
}
`;

function csharpDecode(t: string, raw: string): string {
    if (t === 'int') return `__Conv.ToInt(${raw})`;
    if (t === 'long') return `__Conv.ToLong(${raw})`;
    if (t === 'bool') return `__Conv.ToBool(${raw})`;
    if (t === 'string') return `__Conv.ToStr(${raw})`;
    if (t === 'listNode') return `__ListHelper.Build(__Conv.ToIntArray(${raw}))`;
    if (t === 'treeNode') return `__TreeHelper.Build((System.Collections.Generic.List<object>)${raw})`;
    if (t === 'node' || t === 'dynamic') return raw;
    if (t === 'char[][]') return `__Conv.ToCharGrid(${raw})`;
    if (t === 'int[]') return `__Conv.ToIntArray(${raw})`;
    if (t === 'int[][]') return `__Conv.ToIntGrid(${raw})`;
    if (t === 'string[]') return `__Conv.ToStrArray(${raw})`;
    throw new Error(`csharpDecode: unsupported type ${t}`);
}

function csharpEncodeResult(returnType: string, resultVar: string): string {
    if (returnType === 'listNode') return `__ListHelper.ToArray(${resultVar})`;
    if (returnType === 'treeNode') return `__TreeHelper.ToArray(${resultVar})`;
    return resultVar;
}

export function wrapFunctionCSharp(solutionCode: string, problem: any): string {
    const needsList = problem.listNodeParams?.length || problem.returnsListNode;
    const needsTree = problem.treeNodeParams?.length || problem.returnsTreeNode;
    const params: ParamType[] = problem.paramTypes || [];

    const decodes = params.map(p => `        var ${p.name} = ${csharpDecode(p.type, `data["${p.name}"]`)};`).join('\n');
    const callArgs = params.map(p => p.name).join(', ');
    // Starter code convention (matching Python/JS/Java) is a top-level
    // `class Solution { public static ... }` — the call must be qualified
    // since Program.Main() isn't inside that class.
    const funcName = `Solution.${toPascalCase(problem.functionName)}`;
    const printExpr = problem.returnType === 'void'
        ? `${funcName}(${callArgs});\n        System.Console.WriteLine("null");`
        : `var result = ${funcName}(${callArgs});\n        System.Console.WriteLine(Json.Stringify(${csharpEncodeResult(problem.returnType, 'result')}));`;

    return `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
${CSHARP_JSON_HELPERS}${needsList ? CSHARP_LIST_HELPERS : ''}${needsTree ? CSHARP_TREE_HELPERS : ''}
${solutionCode}

class Program {
    static void Main() {
        string input = Console.In.ReadToEnd();
        var data = (System.Collections.Generic.Dictionary<string, object>)Json.Parse(input);
${decodes}
        ${printExpr}
    }
}
`;
}

export function wrapMultiCallCSharp(solutionCode: string, problem: any): string {
    const methods: MethodSig[] = problem.methods || [];
    const ctor = methods[0];
    const rest = methods.slice(1);
    const className = toPascalCase(problem.functionName);

    const cases = rest.map(m => {
        const argExprs = m.paramTypes.map((p, i) => csharpDecode(p.type, `callArgs[${i}]`)).join(', ');
        const methodName = toPascalCase(m.name);
        if (m.returnType === 'void') {
            return `                    case "${m.name}": obj.${methodName}(${argExprs}); results.Add(null); break;`;
        }
        return `                    case "${m.name}": results.Add(${csharpEncodeResult(m.returnType, `obj.${methodName}(${argExprs})`)}); break;`;
    }).join('\n');

    const ctorArgs = ctor.paramTypes.map((p, i) => csharpDecode(p.type, `callArgs[${i}]`)).join(', ');

    return `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
${CSHARP_JSON_HELPERS}
${solutionCode}

class Program {
    static void Main() {
        string input = Console.In.ReadToEnd();
        var data = (System.Collections.Generic.Dictionary<string, object>)Json.Parse(input);
        var operations = (System.Collections.Generic.List<object>)data["operations"];
        var argsList = (System.Collections.Generic.List<object>)data["args"];

        ${className} obj = null;
        var results = new System.Collections.Generic.List<object>();

        for (int i = 0; i < operations.Count; i++) {
            string op = (string)operations[i];
            var callArgs = (System.Collections.Generic.List<object>)argsList[i];
            if (i == 0) {
                obj = new ${className}(${ctorArgs});
                results.Add(null);
                continue;
            }
            switch (op) {
${cases}
            }
        }

        Console.WriteLine(Json.Stringify(results));
    }
}
`;
}

// ===================================================================
// TYPESCRIPT — near-identical to the existing JS wrapping; the only real
// differences are the lib/process-type preamble Judge0's bundled tsc needs
// (its default compile target has no DOM/ES2015 lib and no @types/node) and
// optional type annotations in the solution signature itself.
// ===================================================================

const TS_PREAMBLE = `/// <reference lib="es2017" />
declare const process: any;
`;

export function wrapFunctionTypeScript(solutionCode: string, problem: any): string {
    const funcName = toCamelCase(problem.functionName);
    const params: ParamType[] = problem.paramTypes || [];
    const listParams: string[] = problem.listNodeParams || [];
    const treeParams: string[] = problem.treeNodeParams || [];

    const dataArgs = params.map(p => {
        if (listParams.includes(p.name)) return `__buildList(data.${p.name})`;
        if (treeParams.includes(p.name)) return `__buildTree(data.${p.name})`;
        return `data.${p.name}`;
    }).join(', ');
    const helpers = (listParams.length ? TS_LIST_HELPERS : '') + (treeParams.length ? TS_TREE_HELPERS : '');
    const resultLine = problem.returnsListNode
        ? `const result = __listToArray(${funcName}(${dataArgs}));`
        : problem.returnsTreeNode
            ? `const result = __treeToArray(${funcName}(${dataArgs}));`
            : `const result = ${funcName}(${dataArgs});`;

    return `${TS_PREAMBLE}${helpers}
${solutionCode}

const chunks: any[] = [];
process.stdin.on('data', (chunk: any) => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    ${resultLine}
    console.log(JSON.stringify(result));
});
`;
}

const TS_LIST_HELPERS = `
class ListNode {
    val: number; next: ListNode | null;
    constructor(val = 0, next: ListNode | null = null) { this.val = val; this.next = next; }
}
function __buildList(arr: number[]): ListNode | null {
    const dummy = new ListNode(0);
    let cur = dummy;
    for (const v of arr) { cur.next = new ListNode(v); cur = cur.next; }
    return dummy.next;
}
function __listToArray(node: ListNode | null): number[] {
    const arr: number[] = [];
    while (node) { arr.push(node.val); node = node.next; }
    return arr;
}
`;

const TS_TREE_HELPERS = `
class TreeNode {
    val: number; left: TreeNode | null; right: TreeNode | null;
    constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) { this.val = val; this.left = left; this.right = right; }
}
function __buildTree(arr: any[]): TreeNode | null {
    if (!arr.length || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
        const node = queue.shift()!;
        if (i < arr.length && arr[i] !== null) { node.left = new TreeNode(arr[i]); queue.push(node.left); }
        i++;
        if (i < arr.length && arr[i] !== null) { node.right = new TreeNode(arr[i]); queue.push(node.right); }
        i++;
    }
    return root;
}
function __treeToArray(root: TreeNode | null): (number | null)[] {
    const result: (number | null)[] = [];
    if (!root) return result;
    const queue: (TreeNode | null)[] = [root];
    while (queue.length) {
        const node = queue.shift();
        if (node) { result.push(node.val); queue.push(node.left, node.right); }
        else result.push(null);
    }
    while (result.length && result[result.length - 1] === null) result.pop();
    return result;
}
`;

// ===================================================================
// C++
// ===================================================================

export const CPP_JSON_HELPERS = `
struct __JsonValue {
    enum Type { NUL, BOOL, NUM, STR, ARR, OBJ } type = NUL;
    bool b = false;
    double num = 0;
    std::string str;
    std::vector<__JsonValue> arr;
    std::map<std::string, __JsonValue> obj;

    int asInt() const { return (int)num; }
    long long asLong() const { return (long long)num; }
    bool asBool() const { return b; }
    std::string asStr() const { return str; }
    std::vector<int> asIntArray() const {
        std::vector<int> r;
        for (auto& v : arr) r.push_back(v.asInt());
        return r;
    }
    std::vector<std::string> asStrArray() const {
        std::vector<std::string> r;
        for (auto& v : arr) r.push_back(v.asStr());
        return r;
    }
    std::vector<std::vector<int>> asIntGrid() const {
        std::vector<std::vector<int>> r;
        for (auto& v : arr) r.push_back(v.asIntArray());
        return r;
    }
    std::vector<std::vector<char>> asCharGrid() const {
        std::vector<std::vector<char>> r;
        for (auto& row : arr) {
            std::vector<char> rowOut;
            for (auto& c : row.arr) rowOut.push_back(c.asStr()[0]);
            r.push_back(rowOut);
        }
        return r;
    }
    const __JsonValue& at(const std::string& key) const { return obj.at(key); }
};

struct __JsonParser {
    const std::string& s;
    size_t i = 0;
    __JsonParser(const std::string& s) : s(s) {}
    void skipWs() { while (i < s.size() && isspace((unsigned char)s[i])) i++; }
    __JsonValue parseValue() {
        skipWs();
        char c = s[i];
        if (c == '{') return parseObject();
        if (c == '[') return parseArray();
        if (c == '"') { __JsonValue v; v.type = __JsonValue::STR; v.str = parseString(); return v; }
        if (c == 't') { i += 4; __JsonValue v; v.type = __JsonValue::BOOL; v.b = true; return v; }
        if (c == 'f') { i += 5; __JsonValue v; v.type = __JsonValue::BOOL; v.b = false; return v; }
        if (c == 'n') { i += 4; __JsonValue v; v.type = __JsonValue::NUL; return v; }
        return parseNumber();
    }
    __JsonValue parseObject() {
        __JsonValue v; v.type = __JsonValue::OBJ;
        i++; skipWs();
        if (s[i] == '}') { i++; return v; }
        while (true) {
            skipWs();
            std::string key = parseString();
            skipWs(); i++;
            v.obj[key] = parseValue();
            skipWs();
            if (s[i] == ',') { i++; continue; }
            if (s[i] == '}') { i++; break; }
        }
        return v;
    }
    __JsonValue parseArray() {
        __JsonValue v; v.type = __JsonValue::ARR;
        i++; skipWs();
        if (s[i] == ']') { i++; return v; }
        while (true) {
            v.arr.push_back(parseValue());
            skipWs();
            if (s[i] == ',') { i++; continue; }
            if (s[i] == ']') { i++; break; }
        }
        return v;
    }
    std::string parseString() {
        skipWs(); i++;
        std::string out;
        while (s[i] != '"') {
            char c = s[i];
            if (c == '\\\\') {
                i++;
                char esc = s[i];
                if (esc == 'n') out += '\\n';
                else if (esc == 't') out += '\\t';
                else if (esc == 'r') out += '\\r';
                else out += esc;
            } else out += c;
            i++;
        }
        i++;
        return out;
    }
    __JsonValue parseNumber() {
        size_t start = i;
        if (s[i] == '-') i++;
        while (i < s.size() && (isdigit((unsigned char)s[i]) || s[i]=='.' || s[i]=='e' || s[i]=='E' || s[i]=='+' || s[i]=='-')) i++;
        __JsonValue v; v.type = __JsonValue::NUM;
        v.num = std::stod(s.substr(start, i - start));
        return v;
    }
};

__JsonValue __parseJson(const std::string& s) { __JsonParser p(s); return p.parseValue(); }

std::string __stringify(int v) { return std::to_string(v); }
std::string __stringify(long long v) { return std::to_string(v); }
std::string __stringify(bool v) { return v ? "true" : "false"; }
std::string __stringify(const std::string& v) {
    std::string out = "\\"";
    for (char c : v) { if (c == '"' || c == '\\\\') out += '\\\\'; out += c; }
    return out + "\\"";
}
std::string __stringify(const std::vector<int>& v) {
    std::string out = "[";
    for (size_t i = 0; i < v.size(); i++) { if (i) out += ','; out += std::to_string(v[i]); }
    return out + "]";
}
std::string __stringify(const std::vector<std::vector<int>>& v) {
    std::string out = "[";
    for (size_t i = 0; i < v.size(); i++) { if (i) out += ','; out += __stringify(v[i]); }
    return out + "]";
}
std::string __stringify(const std::vector<std::string>& v) {
    std::string out = "[";
    for (size_t i = 0; i < v.size(); i++) { if (i) out += ','; out += __stringify(v[i]); }
    return out + "]";
}
template<typename T>
std::string __stringify(const std::vector<T>& v) {
    std::string out = "[";
    for (size_t i = 0; i < v.size(); i++) { if (i) out += ','; out += __stringify(v[i]); }
    return out + "]";
}
`;

export const CPP_LIST_HELPERS = `
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x = 0) : val(x), next(nullptr) {}
};
ListNode* __buildList(const std::vector<int>& arr) {
    ListNode dummy(0);
    ListNode* cur = &dummy;
    for (int v : arr) { cur->next = new ListNode(v); cur = cur->next; }
    return dummy.next;
}
std::vector<int> __listToArray(ListNode* node) {
    std::vector<int> out;
    while (node) { out.push_back(node->val); node = node->next; }
    return out;
}
`;

export const CPP_TREE_HELPERS = `
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x = 0) : val(x), left(nullptr), right(nullptr) {}
};
TreeNode* __buildTree(const __JsonValue& jv) {
    auto& arr = jv.arr;
    if (arr.empty() || arr[0].type == __JsonValue::NUL) return nullptr;
    TreeNode* root = new TreeNode(arr[0].asInt());
    std::vector<TreeNode*> queue = { root };
    size_t i = 1, qi = 0;
    while (qi < queue.size() && i < arr.size()) {
        TreeNode* node = queue[qi++];
        if (i < arr.size() && arr[i].type != __JsonValue::NUL) { node->left = new TreeNode(arr[i].asInt()); queue.push_back(node->left); }
        i++;
        if (i < arr.size() && arr[i].type != __JsonValue::NUL) { node->right = new TreeNode(arr[i].asInt()); queue.push_back(node->right); }
        i++;
    }
    return root;
}
std::vector<int>* __treeToArrayRaw(TreeNode* root, std::vector<std::string>* outStr) {
    return nullptr; // unused, placeholder to keep signature simple below
}
std::string __treeToArrayStr(TreeNode* root) {
    if (!root) return "[]";
    std::vector<std::string> parts;
    std::vector<TreeNode*> queue = { root };
    size_t qi = 0;
    while (qi < queue.size()) {
        TreeNode* node = queue[qi++];
        if (node) { parts.push_back(std::to_string(node->val)); queue.push_back(node->left); queue.push_back(node->right); }
        else parts.push_back("null");
    }
    while (!parts.empty() && parts.back() == "null") parts.pop_back();
    std::string out = "[";
    for (size_t i = 0; i < parts.size(); i++) { if (i) out += ','; out += parts[i]; }
    return out + "]";
}
`;

function cppType(t: string): string {
    if (t === 'int') return 'int';
    if (t === 'long') return 'long long';
    if (t === 'bool') return 'bool';
    if (t === 'string') return 'std::string';
    if (t === 'void') return 'void';
    if (t === 'listNode') return 'ListNode*';
    if (t === 'treeNode') return 'TreeNode*';
    if (t === 'char[][]') return 'std::vector<std::vector<char>>';
    if (t === 'int[]') return 'std::vector<int>';
    if (t === 'int[][]') return 'std::vector<std::vector<int>>';
    if (t === 'string[]') return 'std::vector<std::string>';
    throw new Error(`cppType: unsupported type ${t}`);
}

function cppDecode(t: string, raw: string): string {
    if (t === 'int') return `${raw}.asInt()`;
    if (t === 'long') return `${raw}.asLong()`;
    if (t === 'bool') return `${raw}.asBool()`;
    if (t === 'string') return `${raw}.asStr()`;
    if (t === 'listNode') return `__buildList(${raw}.asIntArray())`;
    if (t === 'treeNode') return `__buildTree(${raw})`;
    if (t === 'char[][]') return `${raw}.asCharGrid()`;
    if (t === 'int[]') return `${raw}.asIntArray()`;
    if (t === 'int[][]') return `${raw}.asIntGrid()`;
    if (t === 'string[]') return `${raw}.asStrArray()`;
    throw new Error(`cppDecode: unsupported type ${t}`);
}

function cppEncode(t: string, resultExpr: string): string {
    if (t === 'listNode') return `__stringify(__listToArray(${resultExpr}))`;
    if (t === 'treeNode') return `__treeToArrayStr(${resultExpr})`;
    return `__stringify(${resultExpr})`;
}

const CPP_INCLUDES = `#include <bits/stdc++.h>
using namespace std;
`;

export function wrapFunctionCpp(solutionCode: string, problem: any): string {
    const needsList = problem.listNodeParams?.length || problem.returnsListNode;
    const needsTree = problem.treeNodeParams?.length || problem.returnsTreeNode;
    const params: ParamType[] = problem.paramTypes || [];

    const decodes = params.map(p => `    auto ${p.name} = ${cppDecode(p.type, `data.at("${p.name}")`)};`).join('\n');
    const callArgs = params.map(p => p.name).join(', ');
    const funcName = toCamelCase(problem.functionName);
    const body = problem.returnType === 'void'
        ? `${funcName}(${callArgs});\n    cout << "null" << endl;`
        : `auto result = ${funcName}(${callArgs});\n    cout << ${cppEncode(problem.returnType, 'result')} << endl;`;

    return `${CPP_INCLUDES}${CPP_JSON_HELPERS}${needsList ? CPP_LIST_HELPERS : ''}${needsTree ? CPP_TREE_HELPERS : ''}
${solutionCode}

int main() {
    string input((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    __JsonValue data = __parseJson(input);
${decodes}
    ${body}
    return 0;
}
`;
}

export function wrapMultiCallCpp(solutionCode: string, problem: any): string {
    const methods: MethodSig[] = problem.methods || [];
    const ctor = methods[0];
    const rest = methods.slice(1);
    const className = problem.functionName;

    const cases = rest.map(m => {
        const argExprs = m.paramTypes.map((p, i) => cppDecode(p.type, `callArgs[${i}]`)).join(', ');
        const methodName = toCamelCase(m.name);
        if (m.returnType === 'void') {
            return `        if (op == "${m.name}") { obj->${methodName}(${argExprs}); results.push_back("null"); }`;
        }
        return `        if (op == "${m.name}") { results.push_back(${cppEncode(m.returnType, `obj->${methodName}(${argExprs})`)}); }`;
    }).join('\n');

    const ctorArgs = ctor.paramTypes.map((p, i) => cppDecode(p.type, `callArgs[${i}]`)).join(', ');

    return `${CPP_INCLUDES}${CPP_JSON_HELPERS}
${solutionCode}

int main() {
    string input((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    __JsonValue data = __parseJson(input);
    auto& operations = data.at("operations").arr;
    auto& argsList = data.at("args").arr;

    ${className}* obj = nullptr;
    vector<string> results;

    for (size_t idx = 0; idx < operations.size(); idx++) {
        string op = operations[idx].asStr();
        auto& callArgs = argsList[idx].arr;
        if (idx == 0) {
            obj = new ${className}(${ctorArgs});
            results.push_back("null");
            continue;
        }
${cases}
    }

    cout << "[";
    for (size_t i = 0; i < results.size(); i++) { if (i) cout << ','; cout << results[i]; }
    cout << "]" << endl;
    return 0;
}
`;
}

// ===================================================================
// RUST
// ===================================================================

export const RUST_JSON_HELPERS = `
#[derive(Debug, Clone)]
enum __Json { Null, Bool(bool), Num(f64), Str(String), Arr(Vec<__Json>), Obj(std::collections::HashMap<String, __Json>) }
impl __Json {
    fn as_int(&self) -> i32 { if let __Json::Num(n) = self { *n as i32 } else { panic!("expected number") } }
    fn as_long(&self) -> i64 { if let __Json::Num(n) = self { *n as i64 } else { panic!("expected number") } }
    fn as_bool(&self) -> bool { if let __Json::Bool(b) = self { *b } else { panic!("expected bool") } }
    fn as_str(&self) -> String { if let __Json::Str(s) = self { s.clone() } else { panic!("expected string") } }
    fn as_arr(&self) -> &Vec<__Json> { if let __Json::Arr(a) = self { a } else { panic!("expected array") } }
    fn as_int_array(&self) -> Vec<i32> { self.as_arr().iter().map(|v| v.as_int()).collect() }
    fn as_str_array(&self) -> Vec<String> { self.as_arr().iter().map(|v| v.as_str()).collect() }
    fn as_int_grid(&self) -> Vec<Vec<i32>> { self.as_arr().iter().map(|v| v.as_int_array()).collect() }
    fn as_char_grid(&self) -> Vec<Vec<char>> {
        self.as_arr().iter().map(|row| row.as_arr().iter().map(|c| c.as_str().chars().next().unwrap()).collect()).collect()
    }
    fn get(&self, key: &str) -> &__Json { if let __Json::Obj(m) = self { m.get(key).unwrap() } else { panic!("expected object") } }
}
struct __JsonParser { chars: Vec<char>, pos: usize }
impl __JsonParser {
    fn new(s: &str) -> Self { __JsonParser { chars: s.chars().collect(), pos: 0 } }
    fn skip_ws(&mut self) { while self.pos < self.chars.len() && self.chars[self.pos].is_whitespace() { self.pos += 1; } }
    fn parse_value(&mut self) -> __Json {
        self.skip_ws();
        match self.chars[self.pos] {
            '{' => self.parse_object(), '[' => self.parse_array(), '"' => __Json::Str(self.parse_string()),
            't' => { self.pos += 4; __Json::Bool(true) } 'f' => { self.pos += 5; __Json::Bool(false) }
            'n' => { self.pos += 4; __Json::Null } _ => self.parse_number(),
        }
    }
    fn parse_object(&mut self) -> __Json {
        let mut m = std::collections::HashMap::new(); self.pos += 1; self.skip_ws();
        if self.chars[self.pos] == '}' { self.pos += 1; return __Json::Obj(m); }
        loop {
            self.skip_ws(); let key = self.parse_string(); self.skip_ws(); self.pos += 1;
            let val = self.parse_value(); m.insert(key, val); self.skip_ws();
            if self.chars[self.pos] == ',' { self.pos += 1; continue; }
            if self.chars[self.pos] == '}' { self.pos += 1; break; }
        }
        __Json::Obj(m)
    }
    fn parse_array(&mut self) -> __Json {
        let mut arr = Vec::new(); self.pos += 1; self.skip_ws();
        if self.chars[self.pos] == ']' { self.pos += 1; return __Json::Arr(arr); }
        loop {
            arr.push(self.parse_value()); self.skip_ws();
            if self.chars[self.pos] == ',' { self.pos += 1; continue; }
            if self.chars[self.pos] == ']' { self.pos += 1; break; }
        }
        __Json::Arr(arr)
    }
    fn parse_string(&mut self) -> String {
        self.skip_ws(); self.pos += 1; let mut s = String::new();
        while self.chars[self.pos] != '"' {
            let c = self.chars[self.pos];
            if c == '\\\\' { self.pos += 1; let esc = self.chars[self.pos]; match esc { 'n'=>s.push('\\n'), 't'=>s.push('\\t'), 'r'=>s.push('\\r'), _=>s.push(esc) } }
            else { s.push(c); }
            self.pos += 1;
        }
        self.pos += 1; s
    }
    fn parse_number(&mut self) -> __Json {
        let start = self.pos;
        if self.chars[self.pos] == '-' { self.pos += 1; }
        while self.pos < self.chars.len() && (self.chars[self.pos].is_ascii_digit() || ".eE+-".contains(self.chars[self.pos])) { self.pos += 1; }
        let numstr: String = self.chars[start..self.pos].iter().collect();
        __Json::Num(numstr.parse().unwrap())
    }
}
fn __parse_json(s: &str) -> __Json { let mut p = __JsonParser::new(s); p.parse_value() }

fn __stringify_int(v: i32) -> String { v.to_string() }
fn __stringify_long(v: i64) -> String { v.to_string() }
fn __stringify_bool(v: bool) -> String { if v { "true".to_string() } else { "false".to_string() } }
fn __stringify_str(v: &str) -> String { format!("\\"{}\\"", v.replace('\\\\', "\\\\\\\\").replace('"', "\\\\\\"")) }
fn __stringify_int_vec(v: &Vec<i32>) -> String { format!("[{}]", v.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(",")) }
fn __stringify_int_grid(v: &Vec<Vec<i32>>) -> String { format!("[{}]", v.iter().map(__stringify_int_vec).collect::<Vec<_>>().join(",")) }
fn __stringify_str_vec(v: &Vec<String>) -> String { format!("[{}]", v.iter().map(|x| __stringify_str(x)).collect::<Vec<_>>().join(",")) }
`;

export const RUST_LIST_HELPERS = `
#[derive(Debug)]
struct ListNode { val: i32, next: Option<Box<ListNode>> }
impl ListNode { fn new(val: i32) -> Self { ListNode { val, next: None } } }
fn __build_list(arr: Vec<i32>) -> Option<Box<ListNode>> {
    let mut dummy = Box::new(ListNode::new(0));
    let mut cur = &mut dummy;
    for v in arr { cur.next = Some(Box::new(ListNode::new(v))); cur = cur.next.as_mut().unwrap(); }
    dummy.next
}
fn __list_to_array(mut node: Option<Box<ListNode>>) -> Vec<i32> {
    let mut out = Vec::new();
    while let Some(n) = node { out.push(n.val); node = n.next; }
    out
}
`;

export const RUST_TREE_HELPERS = `
#[derive(Debug)]
struct TreeNode { val: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>> }
impl TreeNode { fn new(val: i32) -> Self { TreeNode { val, left: None, right: None } } }
fn __build_tree(jv: &__Json) -> Option<Box<TreeNode>> {
    let arr = jv.as_arr();
    if arr.is_empty() || matches!(arr[0], __Json::Null) { return None; }
    let mut root = Box::new(TreeNode::new(arr[0].as_int()));
    let mut queue: std::collections::VecDeque<*mut TreeNode> = std::collections::VecDeque::new();
    queue.push_back(root.as_mut() as *mut TreeNode);
    let mut i = 1;
    while let Some(ptr) = queue.pop_front() {
        if i >= arr.len() { break; }
        unsafe {
            if !matches!(arr[i], __Json::Null) {
                (*ptr).left = Some(Box::new(TreeNode::new(arr[i].as_int())));
                queue.push_back((*ptr).left.as_mut().unwrap().as_mut() as *mut TreeNode);
            }
            i += 1;
            if i < arr.len() && !matches!(arr[i], __Json::Null) {
                (*ptr).right = Some(Box::new(TreeNode::new(arr[i].as_int())));
                queue.push_back((*ptr).right.as_mut().unwrap().as_mut() as *mut TreeNode);
            }
            i += 1;
        }
    }
    Some(root)
}
fn __tree_to_array(root: &Option<Box<TreeNode>>) -> String {
    let mut parts: Vec<String> = Vec::new();
    let mut queue: std::collections::VecDeque<&Option<Box<TreeNode>>> = std::collections::VecDeque::new();
    queue.push_back(root);
    while let Some(node) = queue.pop_front() {
        match node {
            Some(n) => { parts.push(n.val.to_string()); queue.push_back(&n.left); queue.push_back(&n.right); }
            None => parts.push("null".to_string()),
        }
    }
    while parts.last().map(|s| s.as_str()) == Some("null") { parts.pop(); }
    format!("[{}]", parts.join(","))
}
`;

function rustType(t: string): string {
    if (t === 'int') return 'i32';
    if (t === 'long') return 'i64';
    if (t === 'bool') return 'bool';
    if (t === 'string') return 'String';
    if (t === 'void') return '()';
    if (t === 'listNode') return 'Option<Box<ListNode>>';
    if (t === 'treeNode') return 'Option<Box<TreeNode>>';
    if (t === 'char[][]') return 'Vec<Vec<char>>';
    if (t === 'int[]') return 'Vec<i32>';
    if (t === 'int[][]') return 'Vec<Vec<i32>>';
    if (t === 'string[]') return 'Vec<String>';
    throw new Error(`rustType: unsupported type ${t}`);
}

function rustDecode(t: string, raw: string): string {
    if (t === 'int') return `${raw}.as_int()`;
    if (t === 'long') return `${raw}.as_long()`;
    if (t === 'bool') return `${raw}.as_bool()`;
    if (t === 'string') return `${raw}.as_str()`;
    if (t === 'listNode') return `__build_list(${raw}.as_int_array())`;
    if (t === 'treeNode') return `__build_tree(${raw})`;
    if (t === 'char[][]') return `${raw}.as_char_grid()`;
    if (t === 'int[]') return `${raw}.as_int_array()`;
    if (t === 'int[][]') return `${raw}.as_int_grid()`;
    if (t === 'string[]') return `${raw}.as_str_array()`;
    throw new Error(`rustDecode: unsupported type ${t}`);
}

function rustEncode(t: string, resultExpr: string): string {
    if (t === 'listNode') return `__stringify_int_vec(&__list_to_array(${resultExpr}))`;
    if (t === 'treeNode') return `__tree_to_array(&${resultExpr})`;
    if (t === 'int') return `__stringify_int(${resultExpr})`;
    if (t === 'long') return `__stringify_long(${resultExpr})`;
    if (t === 'bool') return `__stringify_bool(${resultExpr})`;
    if (t === 'string') return `__stringify_str(&${resultExpr})`;
    if (t === 'int[]') return `__stringify_int_vec(&${resultExpr})`;
    if (t === 'int[][]') return `__stringify_int_grid(&${resultExpr})`;
    if (t === 'string[]') return `__stringify_str_vec(&${resultExpr})`;
    throw new Error(`rustEncode: unsupported type ${t}`);
}

export function wrapFunctionRust(solutionCode: string, problem: any): string {
    const needsList = problem.listNodeParams?.length || problem.returnsListNode;
    const needsTree = problem.treeNodeParams?.length || problem.returnsTreeNode;
    const params: ParamType[] = problem.paramTypes || [];

    const decodes = params.map(p => `    let ${p.name} = ${rustDecode(p.type, `data.get("${p.name}")`)};`).join('\n');
    const callArgs = params.map(p => p.name).join(', ');
    const funcName = toSnakeCase(problem.functionName);
    const body = problem.returnType === 'void'
        ? `${funcName}(${callArgs});\n    println!("null");`
        : `let result = ${funcName}(${callArgs});\n    println!("{}", ${rustEncode(problem.returnType, 'result')});`;

    return `use std::io::Read;
${RUST_JSON_HELPERS}${needsList ? RUST_LIST_HELPERS : ''}${needsTree ? RUST_TREE_HELPERS : ''}
${solutionCode}

fn main() {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    let data = __parse_json(&input);
${decodes}
    ${body}
}
`;
}

function toSnakeCase(name: string): string {
    // functionName is already stored snake_case in the DB (shared with Python).
    return name;
}

export function wrapMultiCallRust(solutionCode: string, problem: any): string {
    const methods: MethodSig[] = problem.methods || [];
    const ctor = methods[0];
    const rest = methods.slice(1);
    const structName = toPascalCase(problem.functionName);

    const cases = rest.map(m => {
        const argExprs = m.paramTypes.map((p, i) => rustDecode(p.type, `call_args[${i}]`)).join(', ');
        const methodName = m.name; // Java-derived method names are already camelCase, callable as-is (Rust only warns on non-snake_case, never errors)
        if (m.returnType === 'void') {
            return `            "${m.name}" => { obj.as_mut().unwrap().${methodName}(${argExprs}); results.push("null".to_string()); }`;
        }
        return `            "${m.name}" => { results.push(${rustEncode(m.returnType, `obj.as_mut().unwrap().${methodName}(${argExprs})`)}); }`;
    }).join('\n');

    const ctorArgs = ctor.paramTypes.map((p, i) => rustDecode(p.type, `call_args[${i}]`)).join(', ');

    return `use std::io::Read;
${RUST_JSON_HELPERS}
${solutionCode}

fn main() {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    let data = __parse_json(&input);
    let operations = data.get("operations").as_arr();
    let args_list = data.get("args").as_arr();

    let mut obj: Option<${structName}> = None;
    let mut results: Vec<String> = Vec::new();

    for (idx, op_val) in operations.iter().enumerate() {
        let op = op_val.as_str();
        let call_args = args_list[idx].as_arr();
        if idx == 0 {
            obj = Some(${structName}::new(${ctorArgs}));
            results.push("null".to_string());
            continue;
        }
        match op.as_str() {
${cases}
            _ => {}
        }
    }

    println!("[{}]", results.join(","));
}
`;
}

// ===================================================================
// C — the odd one out: no vector/string/classes, so arrays are pointer +
// explicit length following the standard LeetCode-C convention
// (`int* nums, int numsSize`), and array returns use out-params
// (`int* returnSize`, `int* returnColumnSizes` for 2D) rather than being
// returned by value. Every other language's parameter/return handling is
// uniform across types; C's is genuinely structural per type, which is why
// it gets its own signature-building logic instead of reusing a shared
// declParam/declReturn helper.
// ===================================================================

export const C_JSON_HELPERS = `
typedef enum { __J_NULL, __J_BOOL, __J_NUM, __J_STR, __J_ARR, __J_OBJ } __JType;
typedef struct __JVal {
    __JType type;
    int b;
    double num;
    char* str;
    struct __JVal** arr;
    int arrLen;
    char** keys;
    struct __JVal** vals;
    int objLen;
} __JVal;
typedef struct { const char* s; int i; } __JParser;

void __jskip(__JParser* p) { while (isspace((unsigned char)p->s[p->i])) p->i++; }
__JVal* __jparse_value(__JParser* p);

char* __jparse_string(__JParser* p) {
    __jskip(p);
    p->i++;
    char buf[65536]; int n = 0;
    while (p->s[p->i] != '"') {
        char c = p->s[p->i];
        if (c == '\\\\') {
            p->i++;
            char esc = p->s[p->i];
            if (esc == 'n') buf[n++] = '\\n';
            else if (esc == 't') buf[n++] = '\\t';
            else buf[n++] = esc;
        } else buf[n++] = c;
        p->i++;
    }
    p->i++;
    buf[n] = '\\0';
    char* out = malloc(n + 1);
    memcpy(out, buf, n + 1);
    return out;
}
__JVal* __jparse_number(__JParser* p) {
    int start = p->i;
    if (p->s[p->i] == '-') p->i++;
    while (isdigit((unsigned char)p->s[p->i]) || p->s[p->i]=='.' || p->s[p->i]=='e' || p->s[p->i]=='E' || p->s[p->i]=='+' || p->s[p->i]=='-') p->i++;
    char buf[64];
    int len = p->i - start;
    memcpy(buf, p->s + start, len);
    buf[len] = '\\0';
    __JVal* v = calloc(1, sizeof(__JVal));
    v->type = __J_NUM;
    v->num = atof(buf);
    return v;
}
__JVal* __jparse_array(__JParser* p) {
    __JVal* v = calloc(1, sizeof(__JVal));
    v->type = __J_ARR;
    __JVal* items[10000];
    int count = 0;
    p->i++; __jskip(p);
    if (p->s[p->i] == ']') { p->i++; v->arr = NULL; v->arrLen = 0; return v; }
    while (1) {
        items[count++] = __jparse_value(p);
        __jskip(p);
        if (p->s[p->i] == ',') { p->i++; continue; }
        if (p->s[p->i] == ']') { p->i++; break; }
    }
    v->arr = malloc(sizeof(__JVal*) * count);
    memcpy(v->arr, items, sizeof(__JVal*) * count);
    v->arrLen = count;
    return v;
}
__JVal* __jparse_object(__JParser* p) {
    __JVal* v = calloc(1, sizeof(__JVal));
    v->type = __J_OBJ;
    char* keys[256];
    __JVal* vals[256];
    int count = 0;
    p->i++; __jskip(p);
    if (p->s[p->i] == '}') { p->i++; return v; }
    while (1) {
        __jskip(p);
        keys[count] = __jparse_string(p);
        __jskip(p);
        p->i++;
        vals[count] = __jparse_value(p);
        count++;
        __jskip(p);
        if (p->s[p->i] == ',') { p->i++; continue; }
        if (p->s[p->i] == '}') { p->i++; break; }
    }
    v->keys = malloc(sizeof(char*) * count);
    v->vals = malloc(sizeof(__JVal*) * count);
    memcpy(v->keys, keys, sizeof(char*) * count);
    memcpy(v->vals, vals, sizeof(__JVal*) * count);
    v->objLen = count;
    return v;
}
__JVal* __jparse_value(__JParser* p) {
    __jskip(p);
    char c = p->s[p->i];
    if (c == '{') return __jparse_object(p);
    if (c == '[') return __jparse_array(p);
    if (c == '"') { __JVal* v = calloc(1, sizeof(__JVal)); v->type = __J_STR; v->str = __jparse_string(p); return v; }
    if (c == 't') { p->i += 4; __JVal* v = calloc(1, sizeof(__JVal)); v->type = __J_BOOL; v->b = 1; return v; }
    if (c == 'f') { p->i += 5; __JVal* v = calloc(1, sizeof(__JVal)); v->type = __J_BOOL; v->b = 0; return v; }
    if (c == 'n') { p->i += 4; __JVal* v = calloc(1, sizeof(__JVal)); v->type = __J_NULL; return v; }
    return __jparse_number(p);
}
__JVal* __jget(__JVal* obj, const char* key) {
    for (int i = 0; i < obj->objLen; i++) if (strcmp(obj->keys[i], key) == 0) return obj->vals[i];
    return NULL;
}
int* __toIntArray(__JVal* v, int* outLen) {
    int* r = malloc(sizeof(int) * (v->arrLen > 0 ? v->arrLen : 1));
    for (int i = 0; i < v->arrLen; i++) r[i] = (int)v->arr[i]->num;
    *outLen = v->arrLen;
    return r;
}
int** __toIntGrid(__JVal* v, int* outRows, int** outColSizes) {
    int** r = malloc(sizeof(int*) * (v->arrLen > 0 ? v->arrLen : 1));
    int* colSizes = malloc(sizeof(int) * (v->arrLen > 0 ? v->arrLen : 1));
    for (int i = 0; i < v->arrLen; i++) r[i] = __toIntArray(v->arr[i], &colSizes[i]);
    *outRows = v->arrLen;
    *outColSizes = colSizes;
    return r;
}
char** __toStrArray(__JVal* v, int* outLen) {
    char** r = malloc(sizeof(char*) * (v->arrLen > 0 ? v->arrLen : 1));
    for (int i = 0; i < v->arrLen; i++) r[i] = v->arr[i]->str;
    *outLen = v->arrLen;
    return r;
}
char** __toCharGrid(__JVal* v, int* outRows, int* outCols) {
    int rows = v->arrLen;
    char** r = malloc(sizeof(char*) * (rows > 0 ? rows : 1));
    int cols = rows > 0 ? v->arr[0]->arrLen : 0;
    for (int i = 0; i < rows; i++) {
        __JVal* row = v->arr[i];
        char* rowBuf = malloc(row->arrLen + 1);
        for (int j = 0; j < row->arrLen; j++) rowBuf[j] = row->arr[j]->str[0];
        rowBuf[row->arrLen] = '\\0';
        r[i] = rowBuf;
    }
    *outRows = rows;
    *outCols = cols;
    return r;
}
`;

export const C_LIST_HELPERS = `
struct ListNode { int val; struct ListNode* next; };
struct ListNode* __buildList(int* arr, int len) {
    struct ListNode dummy; dummy.next = NULL;
    struct ListNode* cur = &dummy;
    for (int i = 0; i < len; i++) {
        struct ListNode* node = malloc(sizeof(struct ListNode));
        node->val = arr[i]; node->next = NULL;
        cur->next = node; cur = node;
    }
    return dummy.next;
}
int* __listToArray(struct ListNode* node, int* outLen) {
    int cap = 1024, n = 0;
    int* out = malloc(sizeof(int) * cap);
    while (node) { if (n >= cap) { cap *= 2; out = realloc(out, sizeof(int)*cap); } out[n++] = node->val; node = node->next; }
    *outLen = n;
    return out;
}
`;

export const C_TREE_HELPERS = `
struct TreeNode { int val; struct TreeNode* left; struct TreeNode* right; };
struct TreeNode* __buildTree(__JVal* jv) {
    if (jv->arrLen == 0 || jv->arr[0]->type == __J_NULL) return NULL;
    struct TreeNode* root = malloc(sizeof(struct TreeNode));
    root->val = (int)jv->arr[0]->num; root->left = NULL; root->right = NULL;
    struct TreeNode* queue[10000]; int qh = 0, qt = 0;
    queue[qt++] = root;
    int i = 1;
    while (qh < qt && i < jv->arrLen) {
        struct TreeNode* node = queue[qh++];
        if (i < jv->arrLen && jv->arr[i]->type != __J_NULL) {
            struct TreeNode* l = malloc(sizeof(struct TreeNode));
            l->val = (int)jv->arr[i]->num; l->left = NULL; l->right = NULL;
            node->left = l; queue[qt++] = l;
        }
        i++;
        if (i < jv->arrLen && jv->arr[i]->type != __J_NULL) {
            struct TreeNode* r = malloc(sizeof(struct TreeNode));
            r->val = (int)jv->arr[i]->num; r->left = NULL; r->right = NULL;
            node->right = r; queue[qt++] = r;
        }
        i++;
    }
    return root;
}
int* __treeToArray(struct TreeNode* root, int* outLen) {
    struct TreeNode* queue[10000]; int qh = 0, qt = 0;
    int vals[10000]; int isNull[10000]; int n = 0;
    if (root) queue[qt++] = root; else { *outLen = 0; return malloc(0); }
    while (qh < qt) {
        struct TreeNode* node = queue[qh++];
        if (node) { vals[n] = node->val; isNull[n] = 0; n++; queue[qt++] = node->left; queue[qt++] = node->right; }
        else { isNull[n] = 1; n++; }
    }
    while (n > 0 && isNull[n-1]) n--;
    int* out = malloc(sizeof(int) * (n > 0 ? n : 1));
    memcpy(out, vals, sizeof(int) * n);
    *outLen = n;
    return out;
}
`;

// Returns the C parameter DECLARATIONS for one canonical param (arrays need
// an extra `<name>Size` companion, per the standard LeetCode-C convention).
function cParamDecls(p: ParamType): string[] {
    if (p.type === 'int') return [`int ${p.name}`];
    if (p.type === 'long') return [`long long ${p.name}`];
    if (p.type === 'bool') return [`int ${p.name}`];
    if (p.type === 'string') return [`char* ${p.name}`];
    if (p.type === 'listNode') return [`struct ListNode* ${p.name}`];
    if (p.type === 'treeNode') return [`struct TreeNode* ${p.name}`];
    if (p.type === 'int[]') return [`int* ${p.name}`, `int ${p.name}Size`];
    if (p.type === 'int[][]') return [`int** ${p.name}`, `int ${p.name}Size`, `int* ${p.name}ColSize`];
    if (p.type === 'string[]') return [`char** ${p.name}`, `int ${p.name}Size`];
    if (p.type === 'char[][]') return [`char** ${p.name}`, `int ${p.name}Size`, `int ${p.name}ColSize`];
    throw new Error(`cParamDecls: unsupported type ${p.type}`);
}

// Decode statements (one param can expand to several C locals) run before
// the call; returns the list of local variable name(s) to pass as arguments.
function cDecodeParam(p: ParamType): { decl: string; callArgs: string[] } {
    const key = p.name;
    if (p.type === 'int') return { decl: `    int ${key} = (int)__jget(data, "${key}")->num;`, callArgs: [key] };
    if (p.type === 'long') return { decl: `    long long ${key} = (long long)__jget(data, "${key}")->num;`, callArgs: [key] };
    if (p.type === 'bool') return { decl: `    int ${key} = __jget(data, "${key}")->b;`, callArgs: [key] };
    if (p.type === 'string') return { decl: `    char* ${key} = __jget(data, "${key}")->str;`, callArgs: [key] };
    if (p.type === 'listNode') {
        return { decl: `    int ${key}RawLen; int* ${key}Raw = __toIntArray(__jget(data, "${key}"), &${key}RawLen);\n    struct ListNode* ${key} = __buildList(${key}Raw, ${key}RawLen);`, callArgs: [key] };
    }
    if (p.type === 'treeNode') return { decl: `    struct TreeNode* ${key} = __buildTree(__jget(data, "${key}"));`, callArgs: [key] };
    if (p.type === 'int[]') return { decl: `    int ${key}Size;\n    int* ${key} = __toIntArray(__jget(data, "${key}"), &${key}Size);`, callArgs: [key, `${key}Size`] };
    if (p.type === 'int[][]') return { decl: `    int ${key}Size; int* ${key}ColSize;\n    int** ${key} = __toIntGrid(__jget(data, "${key}"), &${key}Size, &${key}ColSize);`, callArgs: [key, `${key}Size`, `${key}ColSize`] };
    if (p.type === 'string[]') return { decl: `    int ${key}Size;\n    char** ${key} = __toStrArray(__jget(data, "${key}"), &${key}Size);`, callArgs: [key, `${key}Size`] };
    if (p.type === 'char[][]') return { decl: `    int ${key}Size, ${key}ColSize;\n    char** ${key} = __toCharGrid(__jget(data, "${key}"), &${key}Size, &${key}ColSize);`, callArgs: [key, `${key}Size`, `${key}ColSize`] };
    throw new Error(`cDecodeParam: unsupported type ${p.type}`);
}

function cReturnDecl(t: string): string {
    if (t === 'int') return 'int';
    if (t === 'long') return 'long long';
    if (t === 'bool') return 'int';
    if (t === 'string') return 'char*';
    if (t === 'void') return 'void';
    if (t === 'listNode') return 'struct ListNode*';
    if (t === 'treeNode') return 'struct TreeNode*';
    if (t === 'int[]') return 'int*';
    if (t === 'int[][]') return 'int**';
    if (t === 'string[]') return 'char**';
    throw new Error(`cReturnDecl: unsupported type ${t}`);
}

// Extra out-params a function needs when returning arrays (LeetCode-C
// convention) — appended to the parameter list and passed by the caller.
function cReturnOutParams(t: string): string[] {
    if (t === 'int[]') return ['int* returnSize'];
    if (t === 'int[][]') return ['int* returnSize', 'int** returnColumnSizes'];
    if (t === 'string[]') return ['int* returnSize'];
    return [];
}

function cEncodeAndPrint(t: string, resultVar: string): string {
    if (t === 'void') return `printf("null\\n");`;
    if (t === 'int') return `printf("%d\\n", ${resultVar});`;
    if (t === 'long') return `printf("%lld\\n", ${resultVar});`;
    if (t === 'bool') return `printf(${resultVar} ? "true\\n" : "false\\n");`;
    if (t === 'string') return `printf("\\"%s\\"\\n", ${resultVar});`;
    if (t === 'listNode') return `{ int __n; int* __arr = __listToArray(${resultVar}, &__n); printf("["); for (int __i=0;__i<__n;__i++) { if (__i) printf(","); printf("%d", __arr[__i]); } printf("]\\n"); }`;
    if (t === 'treeNode') return `{ int __n; int* __arr = __treeToArray(${resultVar}, &__n); printf("["); for (int __i=0;__i<__n;__i++) { if (__i) printf(","); printf("%d", __arr[__i]); } printf("]\\n"); }`;
    if (t === 'int[]') return `{ printf("["); for (int __i=0;__i<returnSize;__i++) { if (__i) printf(","); printf("%d", ${resultVar}[__i]); } printf("]\\n"); }`;
    if (t === 'int[][]') return `{ printf("["); for (int __i=0;__i<returnSize;__i++) { if (__i) printf(","); printf("["); for (int __j=0;__j<returnColumnSizes[__i];__j++) { if (__j) printf(","); printf("%d", ${resultVar}[__i][__j]); } printf("]"); } printf("]\\n"); }`;
    if (t === 'string[]') return `{ printf("["); for (int __i=0;__i<returnSize;__i++) { if (__i) printf(","); printf("\\"%s\\"", ${resultVar}[__i]); } printf("]\\n"); }`;
    throw new Error(`cEncodeAndPrint: unsupported type ${t}`);
}

const C_INCLUDES = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
`;

export function wrapFunctionC(solutionCode: string, problem: any): string {
    const needsList = problem.listNodeParams?.length || problem.returnsListNode;
    const needsTree = problem.treeNodeParams?.length || problem.returnsTreeNode;
    const params: ParamType[] = problem.paramTypes || [];

    const decoded = params.map(cDecodeParam);
    const decodeStmts = decoded.map(d => d.decl).join('\n');
    const callArgs = decoded.flatMap(d => d.callArgs);

    // Each out-param string describes the *parameter's* type (e.g. "int*
    // returnSize", "int** returnColumnSizes") — the local variable declared
    // here needs exactly one less pointer level, since it's passed as `&name`.
    const outParams = cReturnOutParams(problem.returnType);
    const outVars = outParams.map(p => {
        const lastStar = p.lastIndexOf('*');
        const name = p.slice(lastStar + 1).trim();
        const localType = p.slice(0, lastStar); // strip exactly one '*'
        return { name, localType };
    });
    const outDecls = outVars.map(v => `    ${v.localType} ${v.name};`).join('\n');
    callArgs.push(...outVars.map(v => `&${v.name}`));

    const funcName = toCamelCase(problem.functionName);
    const call = problem.returnType === 'void'
        ? `${funcName}(${callArgs.join(', ')});`
        : `${cReturnDecl(problem.returnType)} __result = ${funcName}(${callArgs.join(', ')});`;

    return `${C_INCLUDES}${C_JSON_HELPERS}${needsList ? C_LIST_HELPERS : ''}${needsTree ? C_TREE_HELPERS : ''}
${solutionCode}

int main() {
    char* buf = malloc(1 << 22);
    int total = fread(buf, 1, (1 << 22) - 1, stdin);
    buf[total] = '\\0';

    __JParser p = { buf, 0 };
    __JVal* data = __jparse_value(&p);

${decodeStmts}
${outDecls}
    ${call}
    ${cEncodeAndPrint(problem.returnType, '__result')}
    return 0;
}
`;
}

// C has no classes — "design" problems follow the real LeetCode-C convention
// instead: a typedef'd struct plus free functions named
// `<lowerClassName>Create`/`<lowerClassName><Method>`/`<lowerClassName>Free`,
// each taking the struct pointer as an explicit first argument.
export function wrapMultiCallC(solutionCode: string, problem: any): string {
    const methods: MethodSig[] = problem.methods || [];
    const ctor = methods[0];
    const rest = methods.slice(1);
    const className = problem.functionName;
    const lowerName = className.charAt(0).toLowerCase() + className.slice(1);

    const ctorDecoded = ctor.paramTypes.map(cDecodeParamForOp);
    const ctorDecodeStmts = ctorDecoded.map((d, i) => d.decl(`callArgs[${i}]`)).join('\n');
    const ctorCallArgs = ctorDecoded.flatMap(d => d.callArgs);

    const cases = rest.map(m => {
        const decoded = m.paramTypes.map(cDecodeParamForOp);
        const decodeStmts = decoded.map((d, i) => d.decl(`callArgs[${i}]`)).join('\n');
        const callArgs = ['obj', ...decoded.flatMap(d => d.callArgs)];
        const methodName = `${lowerName}${toPascalCase(m.name)}`;
        if (m.returnType === 'void') {
            return `        if (strcmp(op, "${m.name}") == 0) {\n${decodeStmts}\n            ${methodName}(${callArgs.join(', ')});\n            strcpy(results[idx], "null");\n        }`;
        }
        const resultLine = m.returnType === 'string'
            ? `char* __r = ${methodName}(${callArgs.join(', ')}); snprintf(results[idx], 1024, "\\"%s\\"", __r);`
            : m.returnType === 'bool'
                ? `int __r = ${methodName}(${callArgs.join(', ')}); strcpy(results[idx], __r ? "true" : "false");`
                : `long long __r = ${methodName}(${callArgs.join(', ')}); snprintf(results[idx], 1024, "%lld", __r);`;
        return `        if (strcmp(op, "${m.name}") == 0) {\n${decodeStmts}\n            ${resultLine}\n        }`;
    }).join('\n');

    return `${C_INCLUDES}${C_JSON_HELPERS}
${solutionCode}

int main() {
    char* buf = malloc(1 << 22);
    int total = fread(buf, 1, (1 << 22) - 1, stdin);
    buf[total] = '\\0';

    __JParser p = { buf, 0 };
    __JVal* data = __jparse_value(&p);
    __JVal* operations = __jget(data, "operations");
    __JVal* argsList = __jget(data, "args");

    ${className}* obj = NULL;
    char results[10000][1024];

    for (int idx = 0; idx < operations->arrLen; idx++) {
        char* op = operations->arr[idx]->str;
        __JVal** callArgs = argsList->arr[idx]->arr;

        if (idx == 0) {
${ctorDecodeStmts}
            obj = ${lowerName}Create(${ctorCallArgs.join(', ')});
            strcpy(results[idx], "null");
            continue;
        }
${cases}
    }

    printf("[");
    for (int i = 0; i < operations->arrLen; i++) { if (i) printf(","); printf("%s", results[i]); }
    printf("]\\n");
    return 0;
}
`;
}

// Decode helper for multi-call operation args (each arg is a raw __JVal*
// already, not wrapped in an object key lookup like function-type params).
function cDecodeParamForOp(p: ParamType): { decl: (raw: string) => string; callArgs: string[] } {
    const key = p.name + '_' + Math.random().toString(36).slice(2, 6); // avoid collisions across calls in the same switch
    if (p.type === 'int') return { decl: (raw) => `            int ${key} = (int)${raw}->num;`, callArgs: [key] };
    if (p.type === 'long') return { decl: (raw) => `            long long ${key} = (long long)${raw}->num;`, callArgs: [key] };
    if (p.type === 'bool') return { decl: (raw) => `            int ${key} = ${raw}->b;`, callArgs: [key] };
    if (p.type === 'string') return { decl: (raw) => `            char* ${key} = ${raw}->str;`, callArgs: [key] };
    if (p.type === 'int[]') return { decl: (raw) => `            int ${key}Size;\n            int* ${key} = __toIntArray(${raw}, &${key}Size);`, callArgs: [key, `${key}Size`] };
    if (p.type === 'int[][]') return { decl: (raw) => `            int ${key}Size; int* ${key}ColSize;\n            int** ${key} = __toIntGrid(${raw}, &${key}Size, &${key}ColSize);`, callArgs: [key, `${key}Size`, `${key}ColSize`] };
    throw new Error(`cDecodeParamForOp: unsupported type ${p.type}`);
}

// ===================================================================
// INTERACTIVE — problem.customDriver[language] defines a callback (e.g.
// `guess(num)`) closing over a hidden `data`/secret value, which the
// solution calls directly. Same shape as wrapFunction but the driver needs
// module/global-level access to the raw parsed JSON (not just the visible,
// typed params) since the secret keys are deliberately excluded from the
// solution's own argument list.
// ===================================================================

export function wrapInteractiveGo(solutionCode: string, driver: string, problem: any): string {
    const visibleParams: ParamType[] = (problem.paramTypes || []).filter((p: ParamType) => !(problem.interactiveSecretKeys || []).includes(p.name));
    const decodes = visibleParams.map(p => `\t${p.name} := ${goDecode(p.type, `__data["${p.name}"]`)}`).join('\n');
    const callArgs = visibleParams.map(p => p.name).join(', ');
    const funcName = toCamelCase(problem.functionName);

    // See wrapFunctionGo for why solutionCode precedes the helper functions
    // (Go resolves top-level declarations regardless of order, so
    // solutionCode calling driver's functions here is still fine).
    return `package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

${solutionCode}
${GO_JSON_HELPERS}
var __data map[string]interface{}

${driver}

func main() {
	inputBytes, _ := io.ReadAll(os.Stdin)
	json.Unmarshal(inputBytes, &__data)
${decodes}
	result := ${funcName}(${callArgs})
	out, _ := json.Marshal(result)
	fmt.Println(string(out))
}
`;
}

export function wrapInteractiveCSharp(solutionCode: string, driver: string, problem: any): string {
    const visibleParams: ParamType[] = (problem.paramTypes || []).filter((p: ParamType) => !(problem.interactiveSecretKeys || []).includes(p.name));
    const decodes = visibleParams.map(p => `        var ${p.name} = ${csharpDecode(p.type, `data["${p.name}"]`)};`).join('\n');
    const callArgs = visibleParams.map(p => p.name).join(', ');
    const funcName = `Solution.${toPascalCase(problem.functionName)}`;

    return `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
${CSHARP_JSON_HELPERS}
class Judge {
    public static System.Collections.Generic.Dictionary<string, object> data;
}

${driver}

${solutionCode}

class Program {
    static void Main() {
        string input = Console.In.ReadToEnd();
        var data = (System.Collections.Generic.Dictionary<string, object>)Json.Parse(input);
        Judge.data = data;
${decodes}
        var result = ${funcName}(${callArgs});
        Console.WriteLine(Json.Stringify(result));
    }
}
`;
}

export function wrapInteractiveTypeScript(solutionCode: string, driver: string, problem: any): string {
    const visibleParams: ParamType[] = (problem.paramTypes || []).filter((p: ParamType) => !(problem.interactiveSecretKeys || []).includes(p.name));
    const dataArgs = visibleParams.map(p => `data.${p.name}`).join(', ');
    const funcName = toCamelCase(problem.functionName);

    return `${TS_PREAMBLE}
let data: any;

${driver}

${solutionCode}

const chunks: any[] = [];
process.stdin.on('data', (chunk: any) => chunks.push(chunk));
process.stdin.on('end', () => {
    data = JSON.parse(chunks.join(''));
    const result = ${funcName}(${dataArgs});
    console.log(JSON.stringify(result));
});
`;
}

export function wrapInteractiveCpp(solutionCode: string, driver: string, problem: any): string {
    const visibleParams: ParamType[] = (problem.paramTypes || []).filter((p: ParamType) => !(problem.interactiveSecretKeys || []).includes(p.name));
    const decodes = visibleParams.map(p => `    auto ${p.name} = ${cppDecode(p.type, `__data.at("${p.name}")`)};`).join('\n');
    const callArgs = visibleParams.map(p => p.name).join(', ');
    const funcName = toCamelCase(problem.functionName);

    return `${CPP_INCLUDES}${CPP_JSON_HELPERS}
__JsonValue __data;

${driver}

${solutionCode}

int main() {
    string input((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    __data = __parseJson(input);
${decodes}
    auto result = ${funcName}(${callArgs});
    cout << ${cppEncode(problem.returnType, 'result')} << endl;
    return 0;
}
`;
}

export function wrapInteractiveRust(solutionCode: string, driver: string, problem: any): string {
    const visibleParams: ParamType[] = (problem.paramTypes || []).filter((p: ParamType) => !(problem.interactiveSecretKeys || []).includes(p.name));
    const decodes = visibleParams.map(p => `    let ${p.name} = unsafe { ${rustDecode(p.type, `__DATA.as_ref().unwrap().get("${p.name}")`)} };`).join('\n');
    const callArgs = visibleParams.map(p => p.name).join(', ');
    const funcName = toSnakeCase(problem.functionName);

    return `use std::io::Read;
${RUST_JSON_HELPERS}
static mut __DATA: Option<__Json> = None;

${driver}

${solutionCode}

fn main() {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    unsafe { __DATA = Some(__parse_json(&input)); }
${decodes}
    let result = ${funcName}(${callArgs});
    println!("{}", ${rustEncode(problem.returnType, 'result')});
}
`;
}

export function wrapInteractiveC(solutionCode: string, driver: string, problem: any): string {
    const visibleParams: ParamType[] = (problem.paramTypes || []).filter((p: ParamType) => !(problem.interactiveSecretKeys || []).includes(p.name));
    const decoded = visibleParams.map(cDecodeParam);
    // cDecodeParam reads from `data`, matching the local var name used below.
    const decodeStmts = decoded.map(d => d.decl).join('\n');
    const callArgs = decoded.flatMap(d => d.callArgs);
    const funcName = toCamelCase(problem.functionName);

    return `${C_INCLUDES}${C_JSON_HELPERS}
__JVal* __data;

${driver}

${solutionCode}

int main() {
    char* buf = malloc(1 << 22);
    int total = fread(buf, 1, (1 << 22) - 1, stdin);
    buf[total] = '\\0';

    __JParser p = { buf, 0 };
    __JVal* data = __jparse_value(&p);
    __data = data;

${decodeStmts}
    ${cReturnDecl(problem.returnType)} __result = ${funcName}(${callArgs.join(', ')});
    ${cEncodeAndPrint(problem.returnType, '__result')}
    return 0;
}
`;
}

export function wrapMultiCallTypeScript(solutionCode: string, problem: any): string {
    // Judge0's tsc defaults to an ES3 target, which doesn't support spread
    // in `new`/call expressions — so args are indexed explicitly (also
    // consistent with how every other new language dispatches multi-call
    // methods, since none of them can do `...args` either).
    const methods: MethodSig[] = problem.methods || [];
    const ctor = methods[0];
    const rest = methods.slice(1);
    const className = toPascalCase(problem.functionName);

    const ctorArgs = ctor.paramTypes.map((_, i) => `callArgs[${i}]`).join(', ');
    const cases = rest.map(m => {
        const argExprs = m.paramTypes.map((_, i) => `callArgs[${i}]`).join(', ');
        return `        case '${m.name}': results.push((obj as any).${toCamelCase(m.name)}(${argExprs})); break;`;
    }).join('\n');

    return `${TS_PREAMBLE}
${solutionCode}

const chunks: any[] = [];
process.stdin.on('data', (chunk: any) => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const operations: string[] = data.operations;
    const args: any[] = data.args;
    const results: any[] = [];
    let obj: any = null;
    for (let i = 0; i < operations.length; i++) {
        const callArgs = args[i];
        if (i === 0) {
            obj = new (${className} as any)(${ctorArgs});
            results.push(null);
            continue;
        }
        switch (operations[i]) {
${cases}
        }
    }
    console.log(JSON.stringify(results));
});
`;
}

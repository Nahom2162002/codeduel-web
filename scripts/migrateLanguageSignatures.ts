// One-time migration: parses each problem's existing (known-correct) Java
// starterCode signature into the canonical paramTypes/returnType/methods
// fields on the Problem schema. This is the single source of truth the new
// languages' code generation (lib/codeExecution.ts) uses to emit statically
// typed parsing/call code, instead of re-parsing Java source at request time.
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const JAVA_TYPE_MAP: Record<string, string> = {
    'int': 'int', 'long': 'long', 'boolean': 'bool', 'double': 'double',
    'String': 'string', 'char': 'char', 'Integer': 'int', 'Long': 'long',
    'int[]': 'int[]', 'long[]': 'long[]', 'String[]': 'string[]', 'char[]': 'char[]', 'boolean[]': 'bool[]',
    'int[][]': 'int[][]', 'char[][]': 'char[][]', 'String[][]': 'string[][]',
    'List<Integer>': 'int[]', 'List<String>': 'string[]', 'List<List<Integer>>': 'int[][]', 'List<Boolean>': 'bool[]',
    'ListNode': 'listNode', 'TreeNode': 'treeNode', 'Node': 'node',
    'void': 'void',
    'Runnable': 'runnable', 'java.util.function.IntConsumer': 'intConsumer'
};

interface ParamType { name: string; type: string; }
interface MethodSig { name: string; paramTypes: ParamType[]; returnType: string; }

function normalizeJavaType(javaType: string): string {
    const t = javaType.replace(/\s+/g, ' ').trim();
    if (JAVA_TYPE_MAP[t]) return JAVA_TYPE_MAP[t];
    throw new Error(`Unknown Java type: "${t}"`);
}

function parseParams(paramStr: string): ParamType[] {
    if (!paramStr.trim()) return [];
    return paramStr.split(',').map(part => {
        const trimmed = part.trim();
        const lastSpace = trimmed.lastIndexOf(' ');
        if (lastSpace === -1) throw new Error(`Cannot parse param: "${trimmed}"`);
        const type = trimmed.slice(0, lastSpace).trim();
        const name = trimmed.slice(lastSpace + 1).trim();
        return { name, type: normalizeJavaType(type) };
    });
}

// Extracts the body between the first `class <className> {` and its
// brace-matched closing `}` (methods can themselves contain braces, so a
// naive regex can't find the right closing brace — this counts depth).
function extractClassBody(source: string, className: string): string {
    const marker = `class ${className}`;
    const idx = source.indexOf(marker);
    if (idx === -1) throw new Error(`Class "${className}" not found`);
    const openBrace = source.indexOf('{', idx);
    let depth = 0;
    for (let i = openBrace; i < source.length; i++) {
        if (source[i] === '{') depth++;
        else if (source[i] === '}') {
            depth--;
            if (depth === 0) return source.slice(openBrace + 1, i);
        }
    }
    throw new Error(`Unbalanced braces for class "${className}"`);
}

// Matches `public <ReturnType> <name>(<params>) {` (methods) or
// `public <ClassName>(<params>) {` (constructor, no return type).
const METHOD_REGEX = /public\s+([\w<>\[\],.\s]+?)\s+(\w+)\s*\(([^)]*)\)\s*\{/g;
const CTOR_REGEX = /public\s+(\w+)\s*\(([^)]*)\)\s*\{/;

function parseSingleMethod(classBody: string): { returnType: string; paramTypes: ParamType[] } {
    METHOD_REGEX.lastIndex = 0;
    const m = METHOD_REGEX.exec(classBody);
    if (!m) throw new Error('No method found');
    return { returnType: normalizeJavaType(m[1]), paramTypes: parseParams(m[3]) };
}

function parseMultiCallMethods(classBody: string, className: string): MethodSig[] {
    const methods: MethodSig[] = [];

    // Constructor first (may be implicit/absent in source if it takes no
    // args and isn't written out — but every problem in this DB writes an
    // explicit constructor, so require it).
    const ctorMatch = classBody.match(new RegExp(`public\\s+${className}\\s*\\(([^)]*)\\)\\s*\\{`));
    if (!ctorMatch) throw new Error(`No constructor found for ${className}`);
    methods.push({ name: className, paramTypes: parseParams(ctorMatch[1]), returnType: 'void' });

    METHOD_REGEX.lastIndex = 0;
    let m;
    while ((m = METHOD_REGEX.exec(classBody)) !== null) {
        const [, returnTypeRaw, name, paramStr] = m;
        if (name === className) continue; // already handled as constructor
        methods.push({ name, paramTypes: parseParams(paramStr), returnType: normalizeJavaType(returnTypeRaw) });
    }
    return methods;
}

async function main() {
    const mongoose = (await import('mongoose')).default;
    const { connectDB } = await import('../lib/mongodb');
    const Problem = (await import('../models/Problem')).default;

    const dryRun = process.argv.includes('--dry-run');

    await connectDB();
    const problems = await Problem.find({});

    let updated = 0;
    const failures: { title: string; error: string }[] = [];

    for (const p of problems) {
        try {
            const java = p.starterCode.java || '';

            if (p.executionType === 'multi-call') {
                const classBody = extractClassBody(java, p.functionName);
                const methods = parseMultiCallMethods(classBody, p.functionName);
                if (!dryRun) {
                    p.methods = methods as any;
                    p.paramTypes = undefined;
                    p.returnType = undefined;
                    await p.save();
                }
                console.log(`[multi-call] ${p.title}: ${methods.map(m => `${m.name}(${m.paramTypes.map(pt => pt.type).join(',')})->${m.returnType}`).join(' | ')}`);
            } else if (p.executionType === 'concurrent') {
                // Runnable/IntConsumer-based — handled by hand-authored
                // per-language drivers, not the generic type system.
                console.log(`[concurrent] ${p.title}: skipped (hand-authored drivers)`);
            } else {
                // 'function' and 'interactive' both have a single Solution method.
                const classBody = extractClassBody(java, 'Solution');
                const { returnType, paramTypes } = parseSingleMethod(classBody);
                if (!dryRun) {
                    p.paramTypes = paramTypes as any;
                    p.returnType = returnType;
                    p.methods = undefined;
                    await p.save();
                }
                console.log(`[${p.executionType}] ${p.title}: (${paramTypes.map(pt => `${pt.name}:${pt.type}`).join(', ')}) -> ${returnType}`);
            }
            updated++;
        } catch (err: any) {
            failures.push({ title: p.title, error: err.message });
        }
    }

    console.log(`\n=== ${updated}/${problems.length} parsed${dryRun ? ' (dry run, not saved)' : ' and saved'} ===`);
    if (failures.length) {
        console.log(`\n=== ${failures.length} FAILURES ===`);
        for (const f of failures) console.log(`${f.title}: ${f.error}`);
    }

    await mongoose.disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });

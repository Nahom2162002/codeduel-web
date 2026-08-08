// Bulk-generates starterCode.{go,csharp,typescript,cpp,rust,c} for every
// 'function'/'multi-call' problem, driven by the paramTypes/returnType/methods
// already parsed from each problem's Java signature (see
// migrateLanguageSignatures.ts) — the same source of truth
// lib/newLangCodegen.ts's wrappers use, so the signature shown to the user and
// the one the execution wrapper expects can't drift apart.
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

interface ParamType { name: string; type: string; }
interface MethodSig { name: string; paramTypes: ParamType[]; returnType: string; }

function toCamelCase(name: string): string {
    return name.replace(/_([a-z])/g, (_: string, l: string) => l.toUpperCase());
}
function toPascalCase(name: string): string {
    const camel = toCamelCase(name);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}

// Types with no clean static representation in a language without a
// dynamic/any type — Clone Graph's graph `Node` and Flatten Nested List
// Iterator's heterogeneous `List<Object>`. Only Go/C#/TS have a natural
// dynamic escape hatch (interface{}/object/any); C++/Rust/C skip starter
// code for just these two problems rather than fake a type system they don't have.
const DYNAMIC_TYPES = ['node', 'dynamic'];
function hasUnsupportedType(types: string[], supportsDynamic: boolean): boolean {
    if (supportsDynamic) return false;
    return types.some(t => DYNAMIC_TYPES.includes(t));
}

// ===================== GO =====================
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
    if (t === 'int[]') return '[]int';
    if (t === 'int[][]') return '[][]int';
    if (t === 'string[]') return '[]string';
    throw new Error(`goType: ${t}`);
}
function goZero(t: string): string {
    if (t === 'int' || t === 'long') return '0';
    if (t === 'bool') return 'false';
    if (t === 'string') return '""';
    if (t === 'listNode' || t === 'treeNode' || t === 'node' || t === 'dynamic') return 'nil';
    if (t === 'char[][]') return '[][]byte{}';
    if (t === 'int[]') return '[]int{}';
    if (t === 'int[][]') return '[][]int{}';
    if (t === 'string[]') return '[]string{}';
    throw new Error(`goZero: ${t}`);
}
function goFunctionStub(fnName: string, params: ParamType[], returnType: string): string {
    const paramList = params.map(p => `${p.name} ${goType(p.type)}`).join(', ');
    const ret = returnType === 'void' ? '' : ` ${goType(returnType)}`;
    const body = returnType === 'void' ? '\t// Write your solution here' : `\t// Write your solution here\n\treturn ${goZero(returnType)}`;
    return `func ${toCamelCase(fnName)}(${paramList})${ret} {\n${body}\n}`;
}
function goMultiCallStub(className: string, methods: MethodSig[]): string {
    const ctor = methods[0];
    const rest = methods.slice(1);
    const ctorParams = ctor.paramTypes.map(p => `${p.name} ${goType(p.type)}`).join(', ');
    const methodStubs = rest.map(m => {
        const paramList = m.paramTypes.map(p => `${p.name} ${goType(p.type)}`).join(', ');
        const ret = m.returnType === 'void' ? '' : ` ${goType(m.returnType)}`;
        const body = m.returnType === 'void' ? '\t// Write your solution here' : `\t// Write your solution here\n\treturn ${goZero(m.returnType)}`;
        return `func (this *${className}) ${toPascalCase(m.name)}(${paramList})${ret} {\n${body}\n}`;
    }).join('\n\n');
    return `type ${className} struct {\n}\n\nfunc New${className}(${ctorParams}) *${className} {\n\treturn &${className}{}\n}\n\n${methodStubs}`;
}

// ===================== C# =====================
function csType(t: string): string {
    if (t === 'int') return 'int';
    if (t === 'long') return 'long';
    if (t === 'bool') return 'bool';
    if (t === 'string') return 'string';
    if (t === 'void') return 'void';
    if (t === 'listNode') return 'ListNode';
    if (t === 'treeNode') return 'TreeNode';
    if (t === 'node' || t === 'dynamic') return 'object';
    if (t === 'char[][]') return 'char[][]';
    if (t === 'int[]') return 'int[]';
    if (t === 'int[][]') return 'int[][]';
    if (t === 'string[]') return 'string[]';
    throw new Error(`csType: ${t}`);
}
function csZero(t: string): string {
    if (t === 'int' || t === 'long') return '0';
    if (t === 'bool') return 'false';
    if (t === 'string') return '""';
    if (['listNode', 'treeNode', 'node', 'dynamic'].includes(t)) return 'null';
    if (t === 'char[][]') return 'new char[0][]';
    if (t === 'int[]') return 'new int[0]';
    if (t === 'int[][]') return 'new int[0][]';
    if (t === 'string[]') return 'new string[0]';
    throw new Error(`csZero: ${t}`);
}
function csFunctionStub(fnName: string, params: ParamType[], returnType: string): string {
    const paramList = params.map(p => `${csType(p.type)} ${p.name}`).join(', ');
    const body = returnType === 'void' ? '        // Write your solution here' : `        // Write your solution here\n        return ${csZero(returnType)};`;
    return `class Solution {\n    public static ${csType(returnType)} ${toPascalCase(fnName)}(${paramList}) {\n${body}\n    }\n}`;
}
function csMultiCallStub(className: string, methods: MethodSig[]): string {
    const ctor = methods[0];
    const rest = methods.slice(1);
    const ctorParams = ctor.paramTypes.map(p => `${csType(p.type)} ${p.name}`).join(', ');
    const methodStubs = rest.map(m => {
        const paramList = m.paramTypes.map(p => `${csType(p.type)} ${p.name}`).join(', ');
        const body = m.returnType === 'void' ? '        // Write your solution here' : `        // Write your solution here\n        return ${csZero(m.returnType)};`;
        return `    public ${csType(m.returnType)} ${toPascalCase(m.name)}(${paramList}) {\n${body}\n    }`;
    }).join('\n\n');
    return `class ${className} {\n    public ${className}(${ctorParams}) {\n        // Write your solution here\n    }\n\n${methodStubs}\n}`;
}

// ===================== TYPESCRIPT =====================
function tsType(t: string): string {
    if (t === 'int' || t === 'long') return 'number';
    if (t === 'bool') return 'boolean';
    if (t === 'string') return 'string';
    if (t === 'void') return 'void';
    if (t === 'listNode') return 'ListNode | null';
    if (t === 'treeNode') return 'TreeNode | null';
    if (t === 'node' || t === 'dynamic') return 'any';
    if (t === 'char[][]') return 'string[][]';
    if (t === 'int[]') return 'number[]';
    if (t === 'int[][]') return 'number[][]';
    if (t === 'string[]') return 'string[]';
    throw new Error(`tsType: ${t}`);
}
function tsZero(t: string): string {
    if (t === 'int' || t === 'long') return '0';
    if (t === 'bool') return 'false';
    if (t === 'string') return '""';
    if (['listNode', 'treeNode', 'node', 'dynamic'].includes(t)) return 'null';
    if (t === 'char[][]' || t === 'int[]' || t === 'int[][]' || t === 'string[]') return '[]';
    throw new Error(`tsZero: ${t}`);
}
function tsFunctionStub(fnName: string, params: ParamType[], returnType: string): string {
    const paramList = params.map(p => `${p.name}: ${tsType(p.type)}`).join(', ');
    const body = returnType === 'void' ? '    // Write your solution here' : `    // Write your solution here\n    return ${tsZero(returnType)};`;
    return `function ${toCamelCase(fnName)}(${paramList}): ${tsType(returnType)} {\n${body}\n}`;
}
function tsMultiCallStub(className: string, methods: MethodSig[]): string {
    const ctor = methods[0];
    const rest = methods.slice(1);
    const ctorParams = ctor.paramTypes.map(p => `${p.name}: ${tsType(p.type)}`).join(', ');
    const methodStubs = rest.map(m => {
        const paramList = m.paramTypes.map(p => `${p.name}: ${tsType(p.type)}`).join(', ');
        const body = m.returnType === 'void' ? '        // Write your solution here' : `        // Write your solution here\n        return ${tsZero(m.returnType)};`;
        return `    ${toCamelCase(m.name)}(${paramList}): ${tsType(m.returnType)} {\n${body}\n    }`;
    }).join('\n\n');
    return `class ${className} {\n    constructor(${ctorParams}) {\n        // Write your solution here\n    }\n\n${methodStubs}\n}`;
}

// ===================== C++ =====================
function cppType(t: string): string {
    if (t === 'int') return 'int';
    if (t === 'long') return 'long long';
    if (t === 'bool') return 'bool';
    if (t === 'string') return 'string';
    if (t === 'void') return 'void';
    if (t === 'listNode') return 'ListNode*';
    if (t === 'treeNode') return 'TreeNode*';
    if (t === 'char[][]') return 'vector<vector<char>>';
    if (t === 'int[]') return 'vector<int>';
    if (t === 'int[][]') return 'vector<vector<int>>';
    if (t === 'string[]') return 'vector<string>';
    throw new Error(`cppType: ${t}`);
}
function cppZero(t: string): string {
    if (t === 'int' || t === 'long') return '0';
    if (t === 'bool') return 'false';
    if (t === 'string') return '""';
    if (t === 'listNode' || t === 'treeNode') return 'nullptr';
    if (t === 'char[][]' || t === 'int[]' || t === 'int[][]' || t === 'string[]') return '{}';
    throw new Error(`cppZero: ${t}`);
}
function cppFunctionStub(fnName: string, params: ParamType[], returnType: string): string {
    // A bare top-level function, not wrapped in `class Solution` — matches
    // lib/newLangCodegen.ts's wrapFunctionCpp, which calls it directly as
    // `${funcName}(...)`, not `Solution().${funcName}(...)`.
    const paramList = params.map(p => `${cppType(p.type)} ${p.name}`).join(', ');
    const body = returnType === 'void' ? '    // Write your solution here' : `    // Write your solution here\n    return ${cppZero(returnType)};`;
    return `${cppType(returnType)} ${toCamelCase(fnName)}(${paramList}) {\n${body}\n}`;
}
function cppMultiCallStub(className: string, methods: MethodSig[]): string {
    const ctor = methods[0];
    const rest = methods.slice(1);
    const ctorParams = ctor.paramTypes.map(p => `${cppType(p.type)} ${p.name}`).join(', ');
    const methodStubs = rest.map(m => {
        const paramList = m.paramTypes.map(p => `${cppType(p.type)} ${p.name}`).join(', ');
        const body = m.returnType === 'void' ? '        // Write your solution here' : `        // Write your solution here\n        return ${cppZero(m.returnType)};`;
        return `    ${cppType(m.returnType)} ${toCamelCase(m.name)}(${paramList}) {\n${body}\n    }`;
    }).join('\n\n');
    return `class ${className} {\npublic:\n    ${className}(${ctorParams}) {\n        // Write your solution here\n    }\n\n${methodStubs}\n};`;
}

// ===================== RUST =====================
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
    throw new Error(`rustType: ${t}`);
}
function rustZero(t: string): string {
    if (t === 'int' || t === 'long') return '0';
    if (t === 'bool') return 'false';
    if (t === 'string') return 'String::new()';
    if (t === 'listNode' || t === 'treeNode') return 'None';
    if (t === 'char[][]' || t === 'int[]' || t === 'int[][]' || t === 'string[]') return 'vec![]';
    throw new Error(`rustZero: ${t}`);
}
function rustFunctionStub(fnName: string, params: ParamType[], returnType: string): string {
    // A bare top-level function, not wrapped in `impl Solution` — matches
    // lib/newLangCodegen.ts's wrapFunctionRust, which calls it directly as
    // `${funcName}(...)`, not `Solution::${funcName}(...)`.
    const paramList = params.map(p => `${p.name}: ${rustType(p.type)}`).join(', ');
    const ret = returnType === 'void' ? '' : ` -> ${rustType(returnType)}`;
    const body = returnType === 'void' ? '    // Write your solution here' : `    // Write your solution here\n    ${rustZero(returnType)}`;
    return `fn ${fnName}(${paramList})${ret} {\n${body}\n}`;
}
function rustMultiCallStub(className: string, methods: MethodSig[]): string {
    const ctor = methods[0];
    const rest = methods.slice(1);
    const ctorParams = ctor.paramTypes.map(p => `${p.name}: ${rustType(p.type)}`).join(', ');
    const methodStubs = rest.map(m => {
        const paramList = m.paramTypes.map(p => `${p.name}: ${rustType(p.type)}`).join(', ');
        const ret = m.returnType === 'void' ? '' : ` -> ${rustType(m.returnType)}`;
        const body = m.returnType === 'void' ? '    // Write your solution here' : `    // Write your solution here\n    ${rustZero(m.returnType)}`;
        return `    pub fn ${m.name}(&mut self, ${paramList})${ret} {\n${body}\n    }`;
    }).join('\n\n');
    return `struct ${className} {\n}\n\nimpl ${className} {\n    pub fn new(${ctorParams}) -> Self {\n        // Write your solution here\n        ${className} {}\n    }\n\n${methodStubs}\n}`;
}

// ===================== C =====================
// LeetCode-C convention: array params get a trailing `<name>Size` (and
// `<name>ColSize` for 2D), array returns use out-params instead of a value
// return — matches lib/newLangCodegen.ts's cParamDecls/cReturnOutParams exactly.
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
    throw new Error(`cParamDecls: ${p.type}`);
}
function cReturnType(t: string): string {
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
    throw new Error(`cReturnType: ${t}`);
}
function cReturnOutParams(t: string): string[] {
    if (t === 'int[]') return ['int* returnSize'];
    if (t === 'int[][]') return ['int* returnSize', 'int** returnColumnSizes'];
    if (t === 'string[]') return ['int* returnSize'];
    return [];
}
function cZero(t: string): string {
    if (t === 'int' || t === 'long') return '0';
    if (t === 'bool') return '0';
    if (['string', 'listNode', 'treeNode', 'int[]', 'int[][]', 'string[]'].includes(t)) return 'NULL';
    throw new Error(`cZero: ${t}`);
}
function cFunctionStub(fnName: string, params: ParamType[], returnType: string): string {
    const paramDecls = params.flatMap(cParamDecls).concat(cReturnOutParams(returnType));
    const body = returnType === 'void' ? '    // Write your solution here' : `    // Write your solution here\n    return ${cZero(returnType)};`;
    return `${cReturnType(returnType)} ${toCamelCase(fnName)}(${paramDecls.join(', ')}) {\n${body}\n}`;
}
// C "design" problems follow the real LeetCode-C convention: a typedef'd
// struct plus free functions named <lowerClassName>Create/<Method>/Free —
// matches lib/newLangCodegen.ts's wrapMultiCallC exactly.
function cMultiCallStub(className: string, methods: MethodSig[]): string {
    const ctor = methods[0];
    const rest = methods.slice(1);
    const lowerName = className.charAt(0).toLowerCase() + className.slice(1);
    const ctorParamDecls = ctor.paramTypes.flatMap(cParamDecls);
    const methodStubs = rest.map(m => {
        const paramDecls = [`${className}* obj`, ...m.paramTypes.flatMap(cParamDecls), ...cReturnOutParams(m.returnType)];
        const body = m.returnType === 'void' ? '    // Write your solution here' : `    // Write your solution here\n    return ${cZero(m.returnType)};`;
        return `${cReturnType(m.returnType)} ${lowerName}${toPascalCase(m.name)}(${paramDecls.join(', ')}) {\n${body}\n}`;
    }).join('\n\n');
    return `typedef struct {\n    int placeholder;\n} ${className};\n\n${className}* ${lowerName}Create(${ctorParamDecls.join(', ')}) {\n    // Write your solution here\n    ${className}* obj = malloc(sizeof(${className}));\n    return obj;\n}\n\n${methodStubs}\n\nvoid ${lowerName}Free(${className}* obj) {\n    free(obj);\n}`;
}

async function main() {
    const mongoose = (await import('mongoose')).default;
    const { connectDB } = await import('../lib/mongodb');
    const Problem = (await import('../models/Problem')).default;

    await connectDB();
    // 'function' and 'interactive' both have a single Solution-style
    // function signature (interactive's driver is layered in separately by
    // wrapInteractive*, via customDriver — see _migrate_interactive_drivers.ts);
    // 'multi-call' needs the class/struct stub path instead.
    const targets = await Problem.find({ executionType: { $in: ['function', 'interactive', 'multi-call'] } });

    let updated = 0;
    const skipped: string[] = [];

    const failures: { title: string; error: string }[] = [];

    for (const p of targets) {
        const sc: any = p.starterCode.toObject ? p.starterCode.toObject() : p.starterCode;

        if (p.executionType === 'multi-call' && (!p.methods || p.methods.length === 0)) {
            // paramTypes/methods failed to parse for this problem in
            // migrateLanguageSignatures.ts (e.g. an unsupported Java type) —
            // skip it here rather than crash the whole run for everyone else.
            failures.push({ title: p.title, error: 'no parsed methods (paramTypes/methods missing)' });
            continue;
        }

        if (p.executionType === 'multi-call') {
            const methods: MethodSig[] = (p.methods || []).map((m: any) => m.toObject ? m.toObject() : m);
            const className = p.functionName;
            const allTypes = methods.flatMap(m => [...m.paramTypes.map(pt => pt.type), m.returnType]);

            sc.go = goMultiCallStub(className, methods);
            sc.csharp = csMultiCallStub(className, methods);
            sc.typescript = tsMultiCallStub(className, methods);
            if (!hasUnsupportedType(allTypes, false)) {
                try {
                    sc.cpp = cppMultiCallStub(className, methods);
                    sc.rust = rustMultiCallStub(className, methods);
                    sc.c = cMultiCallStub(className, methods);
                } catch (err: any) {
                    skipped.push(`${p.title} (cpp/rust/c — ${err.message})`);
                }
            } else {
                skipped.push(`${p.title} (cpp/rust/c — dynamic type)`);
            }
        } else {
            const params: ParamType[] = (p.paramTypes || []).map((pt: any) => pt.toObject ? pt.toObject() : pt);
            const returnType: string = p.returnType;
            const allTypes = [...params.map(pt => pt.type), returnType];

            sc.go = goFunctionStub(p.functionName, params, returnType);
            sc.csharp = csFunctionStub(p.functionName, params, returnType);
            sc.typescript = tsFunctionStub(p.functionName, params, returnType);
            if (!hasUnsupportedType(allTypes, false)) {
                try {
                    sc.cpp = cppFunctionStub(p.functionName, params, returnType);
                    sc.rust = rustFunctionStub(p.functionName, params, returnType);
                    sc.c = cFunctionStub(p.functionName, params, returnType);
                } catch (err: any) {
                    skipped.push(`${p.title} (cpp/rust/c — ${err.message})`);
                }
            } else {
                skipped.push(`${p.title} (cpp/rust/c — dynamic type)`);
            }
        }

        p.starterCode = sc;
        await p.save();
        updated++;
    }

    console.log(`Updated ${updated}/${targets.length} problems.`);
    if (skipped.length) console.log('Skipped cpp/rust/c for:', skipped);
    if (failures.length) console.log('Failed (no parsed signature):', failures);

    await mongoose.disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });

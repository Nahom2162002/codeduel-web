import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const DRIVERS: Record<string, Record<string, string>> = {
    'Guess Number Higher or Lower': {
        go: `func guess(num int) int {
	secret := __toInt(__data["secret"])
	if num == secret { return 0 }
	if num < secret { return 1 }
	return -1
}`,
        csharp: `class Judge2 {
    public static int Guess(int num) {
        int secret = __Conv.ToInt(Judge.data["secret"]);
        if (num == secret) return 0;
        return num < secret ? 1 : -1;
    }
}`,
        typescript: `function guess(num: number): number {
    const secret = data.secret;
    if (num === secret) return 0;
    return num < secret ? 1 : -1;
}`,
        cpp: `int guess(int num) {
    int secret = __data.at("secret").asInt();
    if (num == secret) return 0;
    return num < secret ? 1 : -1;
}`,
        rust: `fn guess(num: i32) -> i32 {
    unsafe {
        let secret = __DATA.as_ref().unwrap().get("secret").as_int();
        if num == secret { 0 } else if num < secret { 1 } else { -1 }
    }
}`,
        c: `int guess(int num) {
    int secret = (int)__jget(__data, "secret")->num;
    if (num == secret) return 0;
    return num < secret ? 1 : -1;
}`
    },
    'First Bad Version': {
        go: `func isBadVersion(version int) bool {
	bad := __toInt(__data["bad"])
	return version >= bad
}`,
        csharp: `class Judge2 {
    public static bool IsBadVersion(int version) {
        int bad = __Conv.ToInt(Judge.data["bad"]);
        return version >= bad;
    }
}`,
        typescript: `function isBadVersion(version: number): boolean {
    return version >= data.bad;
}`,
        cpp: `bool isBadVersion(int version) {
    int bad = __data.at("bad").asInt();
    return version >= bad;
}`,
        rust: `fn is_bad_version(version: i32) -> bool {
    unsafe { version >= __DATA.as_ref().unwrap().get("bad").as_int() }
}`,
        c: `int isBadVersion(int version) {
    int bad = (int)__jget(__data, "bad")->num;
    return version >= bad;
}`
    },
    'Find Positive Integer Solution for a Given Equation': {
        go: `func f(x int, y int) int { return x + y }`,
        csharp: `class Judge2 {
    public static int F(int x, int y) { return x + y; }
}`,
        typescript: `function f(x: number, y: number): number { return x + y; }`,
        cpp: `int f(int x, int y) { return x + y; }`,
        rust: `fn f(x: i32, y: i32) -> i32 { x + y }`,
        c: `int f(int x, int y) { return x + y; }`
    },
    'Leftmost Column with at Least a One': {
        go: `func get(row int, col int) int {
	mat := __data["mat"].([]interface{})
	rowArr := mat[row].([]interface{})
	return __toInt(rowArr[col])
}
func dimensions() []int {
	mat := __data["mat"].([]interface{})
	rows := len(mat)
	cols := 0
	if rows > 0 { cols = len(mat[0].([]interface{})) }
	return []int{rows, cols}
}`,
        csharp: `class Judge2 {
    public static int Get(int row, int col) {
        var mat = (System.Collections.Generic.List<object>)Judge.data["mat"];
        var rowArr = (System.Collections.Generic.List<object>)mat[row];
        return __Conv.ToInt(rowArr[col]);
    }
    public static int[] Dimensions() {
        var mat = (System.Collections.Generic.List<object>)Judge.data["mat"];
        int rows = mat.Count;
        int cols = rows > 0 ? ((System.Collections.Generic.List<object>)mat[0]).Count : 0;
        return new int[] { rows, cols };
    }
}`,
        typescript: `function get(row: number, col: number): number { return data.mat[row][col]; }
function dimensions(): number[] { return [data.mat.length, data.mat[0].length]; }`,
        cpp: `int get(int row, int col) { return __data.at("mat").arr[row].arr[col].asInt(); }
vector<int> dimensions() {
    auto& mat = __data.at("mat").arr;
    int rows = (int)mat.size();
    int cols = rows > 0 ? (int)mat[0].arr.size() : 0;
    return {rows, cols};
}`,
        rust: `fn get(row: i32, col: i32) -> i32 {
    unsafe { __DATA.as_ref().unwrap().get("mat").as_arr()[row as usize].as_arr()[col as usize].as_int() }
}
fn dimensions() -> Vec<i32> {
    unsafe {
        let mat = __DATA.as_ref().unwrap().get("mat").as_arr();
        let rows = mat.len() as i32;
        let cols = if rows > 0 { mat[0].as_arr().len() as i32 } else { 0 };
        vec![rows, cols]
    }
}`,
        c: `int get(int row, int col) {
    __JVal* mat = __jget(__data, "mat");
    return (int)mat->arr[row]->arr[col]->num;
}
int* dimensions() {
    __JVal* mat = __jget(__data, "mat");
    int rows = mat->arrLen;
    int cols = rows > 0 ? mat->arr[0]->arrLen : 0;
    int* r = malloc(sizeof(int)*2);
    r[0] = rows; r[1] = cols;
    return r;
}`
    }
};

async function main() {
    const mongoose = (await import('mongoose')).default;
    const { connectDB } = await import('../lib/mongodb');
    const Problem = (await import('../models/Problem')).default;

    await connectDB();

    for (const [title, drivers] of Object.entries(DRIVERS)) {
        const p = await Problem.findOne({ title });
        if (!p) { console.log(`NOT FOUND: ${title}`); continue; }
        const cd = p.customDriver.toObject ? p.customDriver.toObject() : p.customDriver;
        for (const [lang, code] of Object.entries(drivers)) {
            cd[lang] = code;
        }
        p.customDriver = cd;
        await p.save();
        console.log(`Updated: ${title}`);
    }

    await mongoose.disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });

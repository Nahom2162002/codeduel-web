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

// ===================== 2026 EXPANSION BATCH =====================
Object.assign(DRIVERS, {
    'Search in a Sorted Array of Unknown Size': {
        go: `func get(index int) int {
	arr := __data["arr"].([]interface{})
	if index < 0 || index >= len(arr) { return 2147483647 }
	return __toInt(arr[index])
}`,
        csharp: `class Judge2 {
    public static int Get(int index) {
        var arr = (System.Collections.Generic.List<object>)Judge.data["arr"];
        if (index < 0 || index >= arr.Count) return 2147483647;
        return __Conv.ToInt(arr[index]);
    }
}`,
        typescript: `function get(index: number): number {
    const arr = data.arr;
    if (index < 0 || index >= arr.length) return 2147483647;
    return arr[index];
}`,
        cpp: `int get(int index) {
    auto& arr = __data.at("arr").arr;
    if (index < 0 || index >= (int)arr.size()) return 2147483647;
    return arr[index].asInt();
}`,
        rust: `fn get(index: i32) -> i32 {
    unsafe {
        let arr = __DATA.as_ref().unwrap().get("arr").as_arr();
        if index < 0 || index as usize >= arr.len() { return 2147483647; }
        arr[index as usize].as_int()
    }
}`,
        c: `int get(int index) {
    __JVal* arr = __jget(__data, "arr");
    if (index < 0 || index >= arr->arrLen) return 2147483647;
    return (int)arr->arr[index]->num;
}`
    },
    'The Celebrity Problem': {
        go: `func knows(a int, b int) bool {
	know := __data["know"].([]interface{})
	row := know[a].([]interface{})
	return __toInt(row[b]) != 0
}`,
        csharp: `class Judge2 {
    public static bool Knows(int a, int b) {
        var know = (System.Collections.Generic.List<object>)Judge.data["know"];
        var row = (System.Collections.Generic.List<object>)know[a];
        return __Conv.ToInt(row[b]) != 0;
    }
}`,
        typescript: `function knows(a: number, b: number): boolean {
    return !!data.know[a][b];
}`,
        cpp: `bool knows(int a, int b) {
    return __data.at("know").arr[a].arr[b].asInt() != 0;
}`,
        rust: `fn knows(a: i32, b: i32) -> bool {
    unsafe {
        let know = __DATA.as_ref().unwrap().get("know").as_arr();
        know[a as usize].as_arr()[b as usize].as_int() != 0
    }
}`,
        c: `int knows(int a, int b) {
    __JVal* know = __jget(__data, "know");
    return (int)know->arr[a]->arr[b]->num != 0;
}`
    },
    'Find the Index of the Large Integer': {
        go: `func compareSub(l int, r int, x int, y int) int {
	nums := __data["nums"].([]interface{})
	sum1, sum2 := 0, 0
	for i := l; i <= r; i++ { sum1 += __toInt(nums[i]) }
	for i := x; i <= y; i++ { sum2 += __toInt(nums[i]) }
	if sum1 > sum2 { return 1 }
	if sum1 < sum2 { return -1 }
	return 0
}`,
        csharp: `class Judge2 {
    public static int CompareSub(int l, int r, int x, int y) {
        var nums = (System.Collections.Generic.List<object>)Judge.data["nums"];
        int sum1 = 0, sum2 = 0;
        for (int i = l; i <= r; i++) sum1 += __Conv.ToInt(nums[i]);
        for (int i = x; i <= y; i++) sum2 += __Conv.ToInt(nums[i]);
        if (sum1 > sum2) return 1;
        if (sum1 < sum2) return -1;
        return 0;
    }
}`,
        typescript: `function compareSub(l: number, r: number, x: number, y: number): number {
    const nums = data.nums;
    let sum1 = 0, sum2 = 0;
    for (let i = l; i <= r; i++) sum1 += nums[i];
    for (let i = x; i <= y; i++) sum2 += nums[i];
    if (sum1 > sum2) return 1;
    if (sum1 < sum2) return -1;
    return 0;
}`,
        cpp: `int compareSub(int l, int r, int x, int y) {
    auto& nums = __data.at("nums").arr;
    long long sum1 = 0, sum2 = 0;
    for (int i = l; i <= r; i++) sum1 += nums[i].asInt();
    for (int i = x; i <= y; i++) sum2 += nums[i].asInt();
    if (sum1 > sum2) return 1;
    if (sum1 < sum2) return -1;
    return 0;
}`,
        rust: `fn compare_sub(l: i32, r: i32, x: i32, y: i32) -> i32 {
    unsafe {
        let nums = __DATA.as_ref().unwrap().get("nums").as_arr();
        let mut sum1 = 0i64; let mut sum2 = 0i64;
        for i in l..=r { sum1 += nums[i as usize].as_int() as i64; }
        for i in x..=y { sum2 += nums[i as usize].as_int() as i64; }
        if sum1 > sum2 { 1 } else if sum1 < sum2 { -1 } else { 0 }
    }
}`,
        c: `int compareSub(int l, int r, int x, int y) {
    __JVal* nums = __jget(__data, "nums");
    long long sum1 = 0, sum2 = 0;
    for (int i = l; i <= r; i++) sum1 += (long long)nums->arr[i]->num;
    for (int i = x; i <= y; i++) sum2 += (long long)nums->arr[i]->num;
    if (sum1 > sum2) return 1;
    if (sum1 < sum2) return -1;
    return 0;
}`
    },
    'Guess the Word': {
        go: `func guess(word string) int {
	secret := __data["secret"].(string)
	count := 0
	for i := 0; i < len(word); i++ {
		if word[i] == secret[i] { count++ }
	}
	return count
}`,
        csharp: `class Judge2 {
    public static int Guess(string word) {
        string secret = (string)Judge.data["secret"];
        int count = 0;
        for (int i = 0; i < word.Length; i++) if (word[i] == secret[i]) count++;
        return count;
    }
}`,
        typescript: `function guess(word: string): number {
    const secret: string = data.secret;
    let count = 0;
    for (let i = 0; i < word.length; i++) if (word[i] === secret[i]) count++;
    return count;
}`,
        cpp: `int guess(string word) {
    string secret = __data.at("secret").str;
    int count = 0;
    for (size_t i = 0; i < word.size(); i++) if (word[i] == secret[i]) count++;
    return count;
}`,
        rust: `fn guess(word: String) -> i32 {
    unsafe {
        let secret = __DATA.as_ref().unwrap().get("secret").as_str();
        let wb = word.as_bytes(); let sb = secret.as_bytes();
        let mut count = 0;
        for i in 0..wb.len() { if wb[i] == sb[i] { count += 1; } }
        count
    }
}`,
        c: `int guess(char* word) {
    char* secret = __jget(__data, "secret")->str;
    int count = 0;
    for (int i = 0; word[i]; i++) if (word[i] == secret[i]) count++;
    return count;
}`
    },
    'Guess the Majority in a Hidden Array': {
        go: `func query(a int, b int, c int, d int) int {
	arr := __data["arr"].([]interface{})
	idxs := []int{a, b, c, d}
	count := 0
	for i := 0; i < 4; i++ {
		for j := i + 1; j < 4; j++ {
			if __toInt(arr[idxs[i]]) == __toInt(arr[idxs[j]]) { count++ }
		}
	}
	return count
}`,
        csharp: `class Judge2 {
    public static int Query(int a, int b, int c, int d) {
        var arr = (System.Collections.Generic.List<object>)Judge.data["arr"];
        int[] idxs = { a, b, c, d };
        int count = 0;
        for (int i = 0; i < 4; i++) {
            for (int j = i + 1; j < 4; j++) {
                if (__Conv.ToInt(arr[idxs[i]]) == __Conv.ToInt(arr[idxs[j]])) count++;
            }
        }
        return count;
    }
}`,
        typescript: `function query(a: number, b: number, c: number, d: number): number {
    const arr = data.arr;
    const idxs = [a, b, c, d];
    let count = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            if (arr[idxs[i]] === arr[idxs[j]]) count++;
        }
    }
    return count;
}`,
        cpp: `int query(int a, int b, int c, int d) {
    auto& arr = __data.at("arr").arr;
    int idxs[4] = {a, b, c, d};
    int count = 0;
    for (int i = 0; i < 4; i++)
        for (int j = i + 1; j < 4; j++)
            if (arr[idxs[i]].asInt() == arr[idxs[j]].asInt()) count++;
    return count;
}`,
        rust: `fn query(a: i32, b: i32, c: i32, d: i32) -> i32 {
    unsafe {
        let arr = __DATA.as_ref().unwrap().get("arr").as_arr();
        let idxs = [a, b, c, d];
        let mut count = 0;
        for i in 0..4 {
            for j in (i+1)..4 {
                if arr[idxs[i] as usize].as_int() == arr[idxs[j] as usize].as_int() { count += 1; }
            }
        }
        count
    }
}`,
        c: `int query(int a, int b, int c, int d) {
    __JVal* arr = __jget(__data, "arr");
    int idxs[4] = {a, b, c, d};
    int count = 0;
    for (int i = 0; i < 4; i++)
        for (int j = i + 1; j < 4; j++)
            if ((int)arr->arr[idxs[i]]->num == (int)arr->arr[idxs[j]]->num) count++;
    return count;
}`
    }
});

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

// The subset of Problem.category that represents a recognizable algorithmic
// approach/pattern (what Flashcard Mode actually quizzes on) rather than a
// structural or execution-type distinction. Deliberately excludes
// 'arrays'/'strings' (nearly every problem is one of these, so they'd be
// uselessly easy answers and uninformative distractors), 'system-design',
// 'simulation', 'game-theory', 'iterator', 'interactive', and 'concurrency'
// (not "select the technique" style patterns in the sense the mode tests).
// Used both to pick which problems are eligible for a flashcard session and
// as the distractor pool for the other 3 multiple-choice options.
export const PATTERN_CATEGORIES = [
    'trees', 'graphs', 'dynamic-programming', 'binary-search', 'stacks',
    'greedy', 'bit-manipulation', 'hash-table', 'two-pointers', 'heap',
    'sliding-window', 'matrix', 'sorting', 'union-find', 'topological-sort',
    'counting', 'shortest-path', 'number-theory', 'bitmask', 'recursion',
    'divide-and-conquer', 'linked-list', 'trie', 'queue', 'deque', 'backtracking', 'intervals'
] as const;

export type PatternCategory = typeof PATTERN_CATEGORIES[number];

export function isPatternCategory(value: unknown): value is PatternCategory {
    return typeof value === 'string' && (PATTERN_CATEGORIES as readonly string[]).includes(value);
}

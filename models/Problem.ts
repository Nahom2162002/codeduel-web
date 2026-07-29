import mongoose, { Schema } from 'mongoose';

const testCaseSchema = new Schema({
    input:          { type: Schema.Types.Mixed, required: true },
    expectedOutput: { type: Schema.Types.Mixed, required: true },
    isHidden:       { type: Boolean, default: false }
});

const exampleSchema = new Schema({
    input:       { type: String, required: true },
    output:      { type: String, required: true },
    explanation: { type: String }
});

const starterCodeSchema = new Schema({
    python:     { type: String, default: '' },
    javascript: { type: String, default: '' },
    java:       { type: String, default: '' },
    cpp:        { type: String, default: '' }
});

const customDriverSchema = new Schema({
    python:     { type: String },
    javascript: { type: String },
    java:       { type: String }
}, { _id: false });

const problemSchema = new Schema({
    title:        { type: String, required: true, unique: true },
    description:  { type: String, required: true },
    difficulty:   { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    category:     { type: String, enum: ['arrays', 'strings', 'trees', 'graphs', 'dynamic-programming', 'system-design', 'binary-search', 'stacks', 'greedy', 'bit-manipulation', 'hash-table', 'two-pointers', 'heap', 'sliding-window', 'matrix', 'sorting', 'union-find', 'topological-sort', 'simulation', 'counting', 'shortest-path', 'number-theory', 'bitmask', 'recursion', 'geometry', 'divide-and-conquer', 'game-theory', 'linked-list', 'trie', 'iterator', 'interactive', 'concurrency'], required: true },
    functionName: { type: String, required: true },
    testCases:   [testCaseSchema],
    examples:    [exampleSchema],
    starterCode: starterCodeSchema,
    constraints: [String],
    hints:       [String],
    isPremium:   { type: Boolean, default: false },
    createdAt:   { type: Date, default: Date.now },

    // How the driver should invoke the user's code — 'function' (default) calls
    // functionName once per test case; 'multi-call' instantiates a class (named
    // functionName) and calls a sequence of methods from testCase.input.operations
    // /.args; 'interactive' and 'concurrent' splice in a hand-written per-language
    // driver (customDriver) instead of generating one generically.
    executionType:    { type: String, enum: ['function', 'multi-call', 'interactive', 'concurrent'], default: 'function' },
    listNodeParams:   { type: [String], default: [] }, // input keys to convert array -> ListNode before calling
    returnsListNode:  { type: Boolean, default: false }, // convert the return value ListNode -> array
    treeNodeParams:   { type: [String], default: [] }, // input keys to convert level-order array -> TreeNode
    returnsTreeNode:  { type: Boolean, default: false }, // convert the return value TreeNode -> level-order array
    customDriver:     customDriverSchema, // full driver code per language, for 'interactive'/'concurrent'
    interactiveSecretKeys: { type: [String], default: [] } // input keys hidden from the user's function args, only visible to customDriver (e.g. the secret in Guess Number)
});

export default mongoose.models.Problem || mongoose.model('Problem', problemSchema);
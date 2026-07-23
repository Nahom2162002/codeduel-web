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

const problemSchema = new Schema({
    title:        { type: String, required: true },
    description:  { type: String, required: true },
    difficulty:   { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    category:     { type: String, enum: ['arrays', 'strings', 'trees', 'graphs', 'dynamic-programming', 'system-design'], required: true },
    functionName: { type: String, required: true },
    testCases:   [testCaseSchema],
    examples:    [exampleSchema],
    starterCode: starterCodeSchema,
    constraints: [String],
    hints:       [String],
    isPremium:   { type: Boolean, default: false },
    createdAt:   { type: Date, default: Date.now }
});

export default mongoose.models.Problem || mongoose.model('Problem', problemSchema);
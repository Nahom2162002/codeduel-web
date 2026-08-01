import mongoose, { Schema } from 'mongoose';

// One row per test case, capturing both sides' actual output (or error) next
// to the expected output — powers the results page's test case breakdown.
const testCaseResultSchema = new Schema({
    input:          { type: Schema.Types.Mixed },
    expectedOutput: { type: Schema.Types.Mixed },
    userOutput:     { type: Schema.Types.Mixed },
    userError:      { type: String },
    userPassed:     { type: Boolean, default: false },
    aiOutput:       { type: Schema.Types.Mixed },
    aiError:        { type: String },
    aiPassed:       { type: Boolean, default: false },
    isHidden:       { type: Boolean, default: false }
}, { _id: false });

const duelSchema = new Schema({
    userId:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId:        { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    language:         { type: String, required: true },
    userCode:         { type: String, required: true },
    aiCode:           { type: String, required: true },
    userTime:         { type: Number, required: true },
    aiTime:           { type: Number, required: true },
    userTestsPassed:  { type: Number, default: 0 },
    aiTestsPassed:    { type: Number, default: 0 },
    totalTests:       { type: Number, default: 0 },
    userScore:        { type: Number, default: 0 },
    aiScore:          { type: Number, default: 0 },
    // Score breakdown — the weighted points each side earned in each scoring
    // category (correctness max 50, speed max 30, quality max 20), plus the
    // raw 0-100 code-quality percentage the LLM assigned before weighting.
    userCorrectnessScore: { type: Number, default: 0 },
    aiCorrectnessScore:   { type: Number, default: 0 },
    userSpeedScore:       { type: Number, default: 0 },
    aiSpeedScore:         { type: Number, default: 0 },
    userQualityScore:     { type: Number, default: 0 },
    aiQualityScore:       { type: Number, default: 0 },
    userQualityRaw:       { type: Number, default: 0 },
    aiQualityRaw:         { type: Number, default: 0 },
    testCaseResults:  [testCaseResultSchema],
    result:           { type: String, enum: ['win', 'loss', 'draw'], required: true },
    aiExplanation:    { type: String },
    aiApproach:       { type: String },
    eloChange:        { type: Number, default: 0 },
    completedAt:      { type: Date, default: Date.now }
});

export default mongoose.models.Duel || mongoose.model('Duel', duelSchema);
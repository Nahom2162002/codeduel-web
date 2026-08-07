import mongoose, { Schema } from 'mongoose';

// One row per practice-mode submission. Unlike Duel, there's no opponent or
// ELO change — Claude tutors instead of racing, scoring on correctness +
// hint efficiency (fewer hints used = higher score). Also the record
// /api/practice/next reads from to skip problems already cleared when
// building the next weak-category queue entry.
const practiceAttemptSchema = new Schema({
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    language:    { type: String, required: true },
    userCode:    { type: String },
    testsPassed: { type: Number, default: 0 },
    totalTests:  { type: Number, default: 0 },
    passed:      { type: Boolean, default: false },
    hintsUsed:   { type: Number, default: 0 },
    // How many submit attempts it took to reach this terminal state (passed,
    // hit the 3-attempt cap, or the user asked to see the solution early).
    attempts:    { type: Number, default: 1 },
    correctnessScore:    { type: Number, default: 0 }, // out of 70
    hintScore:           { type: Number, default: 0 }, // out of 30
    totalScore:          { type: Number, default: 0 }, // out of 100
    solutionCode:        { type: String },
    solutionExplanation: { type: String },
    completedAt: { type: Date, default: Date.now }
});

practiceAttemptSchema.index({ userId: 1, problemId: 1 });

export default mongoose.models.PracticeAttempt || mongoose.model('PracticeAttempt', practiceAttemptSchema);

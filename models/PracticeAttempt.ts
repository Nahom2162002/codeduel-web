import mongoose, { Schema } from 'mongoose';

// One row per practice-mode submission. Unlike Duel, there's no opponent,
// score, or ELO change — this only exists so /api/practice/next can skip
// problems the user has already cleared when building the next queue entry.
const practiceAttemptSchema = new Schema({
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    language:    { type: String, required: true },
    testsPassed: { type: Number, default: 0 },
    totalTests:  { type: Number, default: 0 },
    passed:      { type: Boolean, default: false },
    hintsUsed:   { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now }
});

practiceAttemptSchema.index({ userId: 1, problemId: 1 });

export default mongoose.models.PracticeAttempt || mongoose.model('PracticeAttempt', practiceAttemptSchema);

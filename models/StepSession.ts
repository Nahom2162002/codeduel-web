import mongoose, { Schema } from 'mongoose';

// A completed Step by Step session — Claude tutors the user through a
// problem via escalating hints instead of racing them. Scored on
// correctness + hint efficiency (fewer hints used = higher score) but never
// touches ELO, unlike a real Duel.
const stepSessionSchema = new Schema({
    userId:            { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    language:          { type: String, required: true },
    userCode:          { type: String, required: true },
    hintsUsed:         { type: Number, default: 0 },
    testsPassed:       { type: Number, default: 0 },
    totalTests:        { type: Number, default: 0 },
    passed:            { type: Boolean, default: false },
    correctnessScore:  { type: Number, default: 0 }, // out of 70
    hintScore:         { type: Number, default: 0 }, // out of 30
    totalScore:        { type: Number, default: 0 }, // out of 100
    solutionCode:      { type: String },
    solutionExplanation: { type: String },
    completedAt:       { type: Date, default: Date.now }
});

export default mongoose.models.StepSession || mongoose.model('StepSession', stepSessionSchema);

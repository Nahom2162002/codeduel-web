import mongoose, { Schema } from 'mongoose';

// Claude's solution, generated live while the user's own duel timer runs (see
// /api/duels/live-solve). /api/duels looks this up at submission time and
// reuses it instead of generating a second solution, so the code the user
// races against matches what was actually streaming during the duel.
const liveSolveSessionSchema = new Schema({
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    language:  { type: String, required: true },
    aiCode:    { type: String, required: true },
    aiTime:    { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, expires: 7200 } // auto-expire after 2 hours
});

liveSolveSessionSchema.index({ userId: 1, problemId: 1, language: 1, createdAt: -1 });

export default mongoose.models.LiveSolveSession || mongoose.model('LiveSolveSession', liveSolveSessionSchema);

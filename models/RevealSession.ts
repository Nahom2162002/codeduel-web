import mongoose, { Schema } from 'mongoose';

// Proof that a user actually streamed Claude's solution via /api/duels/reveal —
// /api/duels looks this up server-side rather than trusting a client-supplied
// "isPractice" flag, since that would otherwise let anyone bypass the free
// tier's daily duel limit by just claiming practice mode with no real reveal.
const revealSessionSchema = new Schema({
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    language:  { type: String, required: true },
    aiCode:    { type: String, required: true },
    aiTime:    { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, expires: 7200 } // auto-expire after 2 hours
});

revealSessionSchema.index({ userId: 1, problemId: 1, language: 1, createdAt: -1 });

export default mongoose.models.RevealSession || mongoose.model('RevealSession', revealSessionSchema);

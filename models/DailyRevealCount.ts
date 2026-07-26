import mongoose, { Schema } from 'mongoose';

// Free-tier cap on how many times per day a user can reveal Claude's approach
// (1/day) — mirrors models/DailyDuelCount.ts's atomic reserve-then-release
// pattern, kept as a separate collection so it doesn't touch the existing
// duel counter's index/behavior.
const dailyRevealCountSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date:   { type: Date, required: true },
    count:  { type: Number, default: 0 }
});

dailyRevealCountSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.DailyRevealCount || mongoose.model('DailyRevealCount', dailyRevealCountSchema);

import mongoose, { Schema } from 'mongoose';

const dailyDuelCountSchema = new Schema({
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date:      { type: Date, required: true },
    count:     { type: Number, default: 0 },
    // Sub-count of `count` that were guided-Practice tutoring sessions rather
    // than real duels — free users get 3 total slots/day but only 1 may be
    // spent on Practice (see app/api/practice/submit). $inc treats a missing
    // field as 0, so pre-existing documents from before this field existed
    // still work.
    practiceCount: { type: Number, default: 0 }
});

// One counter document per user per day — the unique index is what makes the
// reservation in app/api/duels/route.ts race-safe under concurrent requests.
dailyDuelCountSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.DailyDuelCount || mongoose.model('DailyDuelCount', dailyDuelCountSchema);

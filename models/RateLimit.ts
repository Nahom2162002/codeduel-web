import mongoose, { Schema } from 'mongoose';

const rateLimitSchema = new Schema({
    key:         { type: String, required: true }, // e.g. "login:email:foo@example.com"
    windowStart: { type: Date, required: true },
    count:       { type: Number, default: 0 }
});

// One counter document per key per fixed window — same atomic-upsert
// reservation pattern DailyDuelCount uses for the free-tier duel cap.
rateLimitSchema.index({ key: 1, windowStart: 1 }, { unique: true });

// Counters are only ever read within their own window, so let Mongo garbage
// collect them a day after windowStart regardless of how short the window was.
rateLimitSchema.index({ windowStart: 1 }, { expireAfterSeconds: 24 * 3600 });

export default mongoose.models.RateLimit || mongoose.model('RateLimit', rateLimitSchema);

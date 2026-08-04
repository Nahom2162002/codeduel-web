import mongoose, { Schema } from 'mongoose';

// The 3 problems generated for one user on one calendar day, plus which of
// them they've solved so far. Generated lazily (see app/api/drills/today)
// and then fixed for the rest of the day — the unique index is what makes
// that lazy creation race-safe under concurrent requests.
const dailyDrillSetSchema = new Schema({
    userId:               { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date:                 { type: Date, required: true },
    problemIds:           { type: [mongoose.Schema.Types.ObjectId], required: true },
    completedProblemIds:  { type: [mongoose.Schema.Types.ObjectId], default: [] },
    completed:            { type: Boolean, default: false }
});

dailyDrillSetSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.DailyDrillSet || mongoose.model('DailyDrillSet', dailyDrillSetSchema);

import mongoose, { Schema } from 'mongoose';

// One counter document per user per day — free users get 1 flashcards round
// per day (see app/api/flashcards/session); Pro is unlimited. Separate from
// DailyDuelCount since flashcards don't share the duels/practice slot pool —
// it's its own free-tier allowance.
const dailyFlashcardCountSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date:   { type: Date, required: true },
    count:  { type: Number, default: 0 }
});

// The unique index is what makes the reservation in
// app/api/flashcards/session/route.ts race-safe under concurrent requests.
dailyFlashcardCountSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.DailyFlashcardCount || mongoose.model('DailyFlashcardCount', dailyFlashcardCountSchema);

import mongoose, { Schema } from 'mongoose';

// One row per answered flashcard — powers the "pattern recognition accuracy
// over time" stat, both overall and per-category (see app/api/flashcards/stats).
const flashcardAttemptSchema = new Schema({
    userId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    correctCategory: { type: String, required: true },
    selectedCategory: { type: String, required: true },
    correct:         { type: Boolean, required: true },
    answeredAt:      { type: Date, default: Date.now }
});

export default mongoose.models.FlashcardAttempt || mongoose.model('FlashcardAttempt', flashcardAttemptSchema);

import mongoose, { Schema } from 'mongoose';

const duelSchema = new Schema({
    userId:           { type: String, required: true },
    problemId:        { type: String, required: true },
    language:         { type: String, required: true },
    userCode:         { type: String, required: true },
    aiCode:           { type: String, required: true },
    userTime:         { type: Number, required: true },
    aiTime:           { type: Number, required: true },
    userTestsPassed:  { type: Number, default: 0 },
    aiTestsPassed:    { type: Number, default: 0 },
    totalTests:       { type: Number, default: 0 },
    userScore:        { type: Number, default: 0 },
    aiScore:          { type: Number, default: 0 },
    result:           { type: String, enum: ['win', 'loss', 'draw'], required: true },
    aiExplanation:    { type: String },
    eloChange:        { type: Number, default: 0 },
    completedAt:      { type: Date, default: Date.now }
});

export default mongoose.models.Duel || mongoose.model('Duel', duelSchema);
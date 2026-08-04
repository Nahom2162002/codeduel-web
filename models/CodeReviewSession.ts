import mongoose, { Schema } from 'mongoose';

// One round per "Get Review" submission — kept as a running log so a
// revision's review can reference what was flagged last time ("you fixed
// the O(n^2) issue, nice") instead of reviewing each round in isolation.
const reviewRoundSchema = new Schema({
    code:        { type: String, required: true },
    review:      { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
}, { _id: false });

// Purely educational — no test execution, no scoring, no ELO. problemId is
// set when the user picked one of our own problems for context; it's null
// when they described a problem from elsewhere (a LeetCode session, an
// interview, their day job), which is the feature's actual headline use case.
const codeReviewSessionSchema = new Schema({
    userId:             { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId:          { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', default: null },
    problemTitle:       { type: String, required: true },
    problemDescription: { type: String, required: true },
    language:           { type: String, required: true },
    rounds:             [reviewRoundSchema],
    createdAt:           { type: Date, default: Date.now },
    updatedAt:           { type: Date, default: Date.now }
});

export default mongoose.models.CodeReviewSession || mongoose.model('CodeReviewSession', codeReviewSessionSchema);

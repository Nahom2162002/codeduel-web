import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username:           { type: String, required: true, unique: true },
    email:              { type: String, required: true, unique: true },
    password:           { type: String, required: true },
    passwordHistory:    { type: [String], required: true },
    // Bumped whenever a password is reset — every JWT issued before that
    // carries the old value and getUserFromRequest rejects it, so changing
    // your password logs out any other session/device using a stolen token.
    tokenVersion:       { type: Number, default: 0 },
    resetToken:         { type: String },
    resetTokenExpiry:   { type: Date },
    // Defaults to true so existing accounts (created before this field existed)
    // are treated as verified on read; register explicitly sets it to false.
    isEmailVerified:        { type: Boolean, default: true },
    verificationToken:      { type: String },
    verificationTokenExpiry: { type: Date },
    createdAt:          { type: Date, default: Date.now },
    plan:               { type: String, enum: ['free', 'pro'], default: 'free' },
    stripeCustomerId:   { type: String },
    cancelAtPeriodEnd:  { type: Boolean, default: false },
    hasHadTrial:        { type: Boolean, default: false },
    trialEnd:           { type: Date, default: null },
    isTrialing:         { type: Boolean, default: false },
    stats: {
        wins:           { type: Number, default: 0 },
        losses:         { type: Number, default: 0 },
        draws:          { type: Number, default: 0 },
        currentStreak:  { type: Number, default: 0 },
        bestStreak:     { type: Number, default: 0 },
        totalDuels:     { type: Number, default: 0 },
        eloRating:      { type: Number, default: 1000 }
    },
    weakCategories:     { type: [String], default: [] },
    strongCategories:   { type: [String], default: [] },
    // Daily Drills streak — separate from stats.currentStreak (which tracks
    // consecutive duel wins). This tracks consecutive calendar days on which
    // all 3 drill problems were completed; see app/api/drills/submit.
    drillStats: {
        currentStreak:    { type: Number, default: 0 },
        bestStreak:       { type: Number, default: 0 },
        lastCompletedDate: { type: Date, default: null }
    }
});

// Defense-in-depth: every route today manually allowlists the fields it
// returns, but nothing stopped a future one from doing `NextResponse.json(user)`
// directly and leaking the password hash/tokens. Stripping them here means
// that mistake is safe by default instead of relying on every call site to
// remember not to make it.
const SENSITIVE_FIELDS = ['password', 'passwordHistory', 'resetToken', 'resetTokenExpiry', 'verificationToken', 'verificationTokenExpiry', 'stripeCustomerId'];
function stripSensitiveFields(_doc: unknown, ret: Record<string, unknown>) {
    for (const field of SENSITIVE_FIELDS) delete ret[field];
    return ret;
}
userSchema.set('toJSON', { transform: stripSensitiveFields });
userSchema.set('toObject', { transform: stripSensitiveFields });

export default mongoose.models.User || mongoose.model('User', userSchema);
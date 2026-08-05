// Incident response, 2026-08-05: password-reset/email-verification tokens
// were being leaked to PostHog via unredacted pageview URL capture (fixed in
// app/components/PostHogProvider.tsx). This clears every currently-pending
// resetToken/verificationToken so any copy already sitting in old PostHog
// events is dead on arrival. Does NOT touch tokenVersion/active sessions —
// JWTs were never exposed by this leak, so there's no reason to force a
// logout of every signed-in user.
import 'dotenv/config';
import { connectDB } from '../lib/mongodb';
import User from '../models/User';

(async () => {
    await connectDB();

    const result = await User.updateMany(
        {
            $or: [
                { resetToken: { $exists: true, $ne: null } },
                { verificationToken: { $exists: true, $ne: null } }
            ]
        },
        {
            $unset: {
                resetToken: '', resetTokenExpiry: '',
                verificationToken: '', verificationTokenExpiry: ''
            }
        }
    );

    console.log(`Matched ${result.matchedCount} user(s), cleared pending tokens on ${result.modifiedCount}.`);
    process.exit(0);
})();

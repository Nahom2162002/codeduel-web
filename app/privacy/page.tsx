import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <main style={{
            fontFamily: 'Inter, sans-serif',
            background: '#0a0a0f',
            minHeight: '100vh',
            color: 'white',
            padding: '60px 24px'
        }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
                <Link href="/" style={{ color: '#00ff87', fontSize: 14, textDecoration: 'none' }}>
                    ← Back to CodeDuel
                </Link>

                <h1 style={{ fontSize: 36, fontWeight: 700, margin: '32px 0 8px' }}>Privacy Policy</h1>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 48 }}>
                    Last updated: July 23, 2026
                </p>

                {[
                    {
                        title: '1. Who We Are',
                        content: 'CodeDuel is a web-based platform operated by Nahom Ashagrea that allows developers to practice coding by competing against Claude AI. You can contact us at nahomashagrea2002@gmail.com.'
                    },
                    {
                        title: '2. What Data We Collect',
                        content: `We collect the following information when you use CodeDuel:

- Account information: your username and email address when you create an account
- Coding submissions: the code you write and submit during duels
- Duel results: scores, times, languages used, and problem history
- Performance data: ELO rating, win/loss record, streak, and category statistics
- Subscription data: your plan status (free or pro) and Stripe customer ID for billing
- Technical data: standard server logs including IP address and browser type`
                    },
                    {
                        title: '3. How We Use Your Data',
                        content: `We use your data to:

- Provide and operate the CodeDuel platform
- Calculate your ELO rating and track your performance over time
- Show you your dashboard statistics and weak spot analysis
- Process payments via Stripe
- Send password reset emails when requested
- Improve the platform based on usage patterns

We do not sell your data to third parties. We do not use your data for advertising.`
                    },
                    {
                        title: '4. How Your Code Is Used',
                        content: 'When you submit a solution during a duel, your code is sent to Judge0 (a sandboxed code execution service) to run against test cases. Your code is also sent to Anthropic\'s Claude API for code quality evaluation and comparison. We store your submitted code in our database as part of your duel history. We do not use your code submissions to train AI models.'
                    },
                    {
                        title: '5. Data Storage',
                        content: 'Your data is stored securely in MongoDB Atlas hosted in the United States. Passwords are hashed using bcrypt and are never stored in plain text. Payment information is handled entirely by Stripe and never stored on our servers.'
                    },
                    {
                        title: '6. Third Party Services',
                        content: `We use the following third party services:

- Stripe — payment processing (stripe.com/privacy)
- MongoDB Atlas — database hosting (mongodb.com/legal/privacy-policy)
- Vercel — hosting and infrastructure (vercel.com/legal/privacy-policy)
- Anthropic — Claude AI for solution generation and evaluation (anthropic.com/privacy)
- Judge0 — sandboxed code execution (judge0.com)
- Resend — transactional email (resend.com/legal/privacy-policy)

Each of these services has their own privacy policy governing how they handle data.`
                    },
                    {
                        title: '7. Data Retention',
                        content: 'We retain your account and duel history for as long as your account is active. If you delete your account, your personal data will be removed within 30 days. Anonymized aggregate statistics may be retained indefinitely.'
                    },
                    {
                        title: '8. Your Rights',
                        content: `You have the right to:

- Access the personal data we hold about you
- Request correction of inaccurate data
- Request deletion of your account and associated data
- Export your duel history

To exercise any of these rights, contact us at nahomashagrea2002@gmail.com.`
                    },
                    {
                        title: '9. Children\'s Privacy',
                        content: 'CodeDuel is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.'
                    },
                    {
                        title: '10. Changes to This Policy',
                        content: 'We may update this privacy policy from time to time. We will notify users of significant changes via email. Continued use of CodeDuel after changes constitutes acceptance of the updated policy.'
                    },
                    {
                        title: '11. Contact',
                        content: 'If you have any questions about this privacy policy, contact us at nahomashagrea2002@gmail.com.'
                    }
                ].map((section, i) => (
                    <div key={i} style={{ marginBottom: 40 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: 'white' }}>
                            {section.title}
                        </h2>
                        <p style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 15,
                            lineHeight: 1.8,
                            whiteSpace: 'pre-line',
                            margin: 0
                        }}>
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
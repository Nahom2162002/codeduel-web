import Link from 'next/link';

export default function TermsOfService() {
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

                <h1 style={{ fontSize: 36, fontWeight: 700, margin: '32px 0 8px' }}>Terms of Service</h1>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 48 }}>
                    Last updated: July 23, 2026
                </p>

                {[
                    {
                        title: '1. Acceptance of Terms',
                        content: 'By creating an account or using CodeDuel, you agree to these Terms of Service. If you do not agree, do not use the service. These terms apply to all users of the CodeDuel platform.'
                    },
                    {
                        title: '2. Description of Service',
                        content: 'CodeDuel is a web platform where developers compete against Claude AI on coding problems to practice and maintain their programming skills. CodeDuel offers a free tier and a paid Pro tier with additional features. We reserve the right to modify, suspend, or discontinue any part of the service at any time.'
                    },
                    {
                        title: '3. Account Registration',
                        content: `To use CodeDuel you must create an account with a valid email address and password. You are responsible for:

- Maintaining the confidentiality of your account credentials
- All activity that occurs under your account
- Notifying us immediately of any unauthorized use of your account

You must be at least 13 years old to create an account.`
                    },
                    {
                        title: '4. Free and Pro Plans',
                        content: `CodeDuel offers two plans:

Free Plan: 3 duels per day, Arrays and Strings categories only. Available at no cost.

Pro Plan: $9 per month, billed monthly. Includes unlimited duels, all 6 problem categories, ELO rating system, progress dashboard, weak spot detection, and performance analytics.

We reserve the right to change pricing with 30 days notice to existing subscribers.`
                    },
                    {
                        title: '5. Payments and Billing',
                        content: `Pro subscriptions are billed monthly through Stripe. By subscribing to Pro you authorize us to charge your payment method on a recurring monthly basis.

Subscriptions automatically renew unless cancelled. You may cancel at any time through the subscription management portal. Cancellation takes effect at the end of the current billing period.

We do not offer refunds for partial months. If you cancel mid-cycle you will retain Pro access until the end of the paid period.

New subscribers receive a 7-day free trial with no credit card required. The trial automatically ends after 7 days if no payment method is added.`
                    },
                    {
                        title: '6. Code Submissions',
                        content: `By submitting code on CodeDuel you grant us a limited license to:

- Execute your code against test cases via our sandboxed execution environment
- Send your code to Claude AI for quality evaluation and comparison
- Store your submissions as part of your duel history

You retain ownership of all code you write. We do not claim any rights to your solutions and do not use them to train AI models.`
                    },
                    {
                        title: '7. Acceptable Use',
                        content: `You agree not to:

- Submit malicious code intended to compromise our execution environment
- Attempt to reverse engineer or hack the platform
- Share your account credentials with others
- Use automated tools or bots to submit solutions
- Attempt to manipulate ELO ratings or leaderboards artificially
- Interfere with the security or integrity of the service

We reserve the right to suspend or terminate accounts that violate these terms.`
                    },
                    {
                        title: '8. AI-Generated Content',
                        content: 'CodeDuel uses Anthropic\'s Claude AI to generate competing solutions and evaluate code quality. Claude\'s solutions are generated in real time and may vary between duels. We do not guarantee the accuracy or optimality of AI-generated solutions. The educational explanations provided by Claude are for learning purposes only and should not be taken as definitive best practices.'
                    },
                    {
                        title: '9. Disclaimer of Warranties',
                        content: 'CodeDuel is provided "as is" without warranties of any kind. We do not guarantee uninterrupted service, accurate ELO calculations, or that our test cases cover all edge cases for every problem. Code execution results depend on third party services including Judge0 and may occasionally be inaccurate.'
                    },
                    {
                        title: '10. Limitation of Liability',
                        content: 'To the maximum extent permitted by law, Nahom Ashagrea shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of CodeDuel. Our total liability for any claim shall not exceed the amount you paid us in the 3 months prior to the claim.'
                    },
                    {
                        title: '11. Intellectual Property',
                        content: 'CodeDuel, its branding, problem descriptions, and platform code are the property of Nahom Ashagrea. You may not reproduce or distribute platform content without explicit written permission. Problem descriptions are original works created for CodeDuel and may not be republished elsewhere.'
                    },
                    {
                        title: '12. Termination',
                        content: 'We may terminate or suspend your account at any time for violation of these terms. You may delete your account at any time by contacting us at nahomashagrea2002@gmail.com. Upon termination your right to use the service ceases immediately.'
                    },
                    {
                        title: '13. Changes to Terms',
                        content: 'We may update these terms from time to time. We will notify you of significant changes via email. Continued use of CodeDuel after changes constitutes acceptance of the updated terms.'
                    },
                    {
                        title: '14. Governing Law',
                        content: 'These terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of the United States.'
                    },
                    {
                        title: '15. Contact',
                        content: 'For questions about these terms, contact us at nahomashagrea2002@gmail.com.'
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
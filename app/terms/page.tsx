'use client';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const ORANGE_BG = 'oklch(24% 0.03 55 / 0.4)';
const ORANGE_BORDER = 'oklch(75% 0.15 55 / 0.35)';

const P: React.CSSProperties = { fontSize: 16, lineHeight: 1.7, color: 'oklch(80% 0.02 260)', margin: 0 };
const P_MB: React.CSSProperties = { ...P, marginBottom: 12 };
const UL: React.CSSProperties = { fontSize: 16, lineHeight: 1.8, color: 'oklch(80% 0.02 260)', margin: '0 0 12px', paddingLeft: 22 };
const H2 = (children: React.ReactNode) => (
    <h2 style={{ fontSize: 22, margin: '0 0 12px', color: ORANGE }}>{children}</h2>
);

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function TermsOfService() {
    return (
        <div className={spaceGrotesk.className} style={{ background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', minHeight: '100vh' }}>
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: 1280, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>
                    <DuelIcon />
                    CodeDuel
                </div>
                <Link href="/" className={jetbrainsMono.className} style={{ color: 'oklch(78% 0.02 260)', textDecoration: 'none', fontSize: 14.5 }}>
                    ← Back to CodeDuel
                </Link>
            </nav>

            <main style={{ maxWidth: 760, margin: '0 auto', padding: '24px 48px 100px' }}>
                <div className={pressStart2P.className} style={{
                    display: 'inline-block', fontSize: 9, letterSpacing: '0.04em', color: ORANGE,
                    background: ORANGE_BG, border: `1px solid ${ORANGE_BORDER}`, padding: '8px 14px', borderRadius: 4, marginBottom: 24
                }}>
                    [ LEGAL ]
                </div>

                <h1 style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 10px' }}>Terms of Service</h1>
                <div className={jetbrainsMono.className} style={{ fontSize: 13, color: 'oklch(55% 0.02 260)', marginBottom: 48 }}>
                    Last updated: July 23, 2026
                </div>

                <section style={{ marginBottom: 36 }}>
                    {H2('1. Acceptance of Terms')}
                    <p style={P}>By creating an account or using CodeDuel, you agree to these Terms of Service. If you do not agree, do not use the service. These terms apply to all users of the CodeDuel platform.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('2. Description of Service')}
                    <p style={P}>CodeDuel is a web platform where developers compete against Claude AI on coding problems to practice and maintain their programming skills. CodeDuel offers a free tier and a paid Pro tier with additional features. We reserve the right to modify, suspend, or discontinue any part of the service at any time.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('3. Account Registration')}
                    <p style={P_MB}>To use CodeDuel you must create an account with a valid email address and password. You are responsible for:</p>
                    <ul style={UL}>
                        <li>Maintaining the confidentiality of your account credentials</li>
                        <li>All activity that occurs under your account</li>
                        <li>Notifying us immediately of any unauthorized use of your account</li>
                    </ul>
                    <p style={P}>You must be at least 13 years old to create an account.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('4. Free and Pro Plans')}
                    <p style={P_MB}>CodeDuel offers two plans:</p>
                    <p style={{ ...P, marginBottom: 8 }}><strong>Free Plan:</strong> 3 duels per day, Arrays and Strings categories only. Available at no cost.</p>
                    <p style={P_MB}><strong>Pro Plan:</strong> $9 per month, billed monthly. Includes unlimited duels, all 6 problem categories, ELO rating system, progress dashboard, weak spot detection, and performance analytics.</p>
                    <p style={P}>We reserve the right to change pricing with 30 days notice to existing subscribers.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('5. Payments and Billing')}
                    <p style={P_MB}>Pro subscriptions are billed monthly through Stripe. By subscribing to Pro you authorize us to charge your payment method on a recurring monthly basis.</p>
                    <p style={P_MB}>Subscriptions automatically renew unless cancelled. You may cancel at any time through the subscription management portal. Cancellation takes effect at the end of the current billing period.</p>
                    <p style={P_MB}>We do not offer refunds for partial months. If you cancel mid-cycle you will retain Pro access until the end of the paid period.</p>
                    <p style={P}>New subscribers receive a 7-day free trial with no credit card required. The trial automatically ends after 7 days if no payment method is added.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('6. Code Submissions')}
                    <p style={P_MB}>By submitting code on CodeDuel you grant us a limited license to:</p>
                    <ul style={UL}>
                        <li>Execute your code against test cases via our sandboxed execution environment</li>
                        <li>Send your code to Claude AI for quality evaluation and comparison</li>
                        <li>Store your submissions as part of your duel history</li>
                    </ul>
                    <p style={P}>You retain ownership of all code you write. We do not claim any rights to your solutions and do not use them to train AI models.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('7. Acceptable Use')}
                    <p style={P_MB}>You agree not to:</p>
                    <ul style={UL}>
                        <li>Submit malicious code intended to compromise our execution environment</li>
                        <li>Attempt to reverse engineer or hack the platform</li>
                        <li>Share your account credentials with others</li>
                        <li>Use automated tools or bots to submit solutions</li>
                        <li>Attempt to manipulate ELO ratings or leaderboards artificially</li>
                        <li>Interfere with the security or integrity of the service</li>
                    </ul>
                    <p style={P}>We reserve the right to suspend or terminate accounts that violate these terms.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('8. AI-Generated Content')}
                    <p style={P}>CodeDuel uses Anthropic's Claude AI to generate competing solutions and evaluate code quality. Claude's solutions are generated in real time and may vary between duels. We do not guarantee the accuracy or optimality of AI-generated solutions. The educational explanations provided by Claude are for learning purposes only and should not be taken as definitive best practices.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('9. Disclaimer of Warranties')}
                    <p style={P}>CodeDuel is provided "as is" without warranties of any kind. We do not guarantee uninterrupted service, accurate ELO calculations, or that our test cases cover all edge cases for every problem. Code execution results depend on third party services including Judge0 and may occasionally be inaccurate.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('10. Limitation of Liability')}
                    <p style={P}>To the maximum extent permitted by law, Nahom Ashagrea shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of CodeDuel. Our total liability for any claim shall not exceed the amount you paid us in the 3 months prior to the claim.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('11. Intellectual Property')}
                    <p style={P}>CodeDuel, its branding, problem descriptions, and platform code are the property of Nahom Ashagrea. You may not reproduce or distribute platform content without explicit written permission. Problem descriptions are original works created for CodeDuel and may not be republished elsewhere.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('12. Termination')}
                    <p style={P}>We may terminate or suspend your account at any time for violation of these terms. You may delete your account at any time by contacting us at <a href="mailto:nahomashagrea2002@gmail.com" style={{ color: BLUE }}>nahomashagrea2002@gmail.com</a>. Upon termination your right to use the service ceases immediately.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('13. Changes to Terms')}
                    <p style={P}>We may update these terms from time to time. We will notify you of significant changes via email. Continued use of CodeDuel after changes constitutes acceptance of the updated terms.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('14. Governing Law')}
                    <p style={P}>These terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of the United States.</p>
                </section>

                <section>
                    {H2('15. Contact')}
                    <p style={P}>For questions about these terms, contact us at <a href="mailto:nahomashagrea2002@gmail.com" style={{ color: BLUE }}>nahomashagrea2002@gmail.com</a>.</p>
                </section>
            </main>

            <footer style={{
                borderTop: '1px solid oklch(28% 0.02 260)', padding: '32px 48px', maxWidth: 1280, margin: '0 auto',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15 }}>
                    <DuelIcon size={19} />
                    CodeDuel
                </div>
                <div style={{ fontSize: 13.5, color: 'oklch(55% 0.02 260)' }}>
                    © {new Date().getFullYear()} CodeDuel. All rights reserved.
                </div>
                <div style={{ display: 'flex', gap: 24, fontSize: 13.5 }}>
                    <Link href="/privacy" style={{ color: 'oklch(65% 0.02 260)', textDecoration: 'none' }}>Privacy Policy</Link>
                    <Link href="/terms" style={{ color: 'oklch(65% 0.02 260)', textDecoration: 'none' }}>Terms of Service</Link>
                </div>
            </footer>
        </div>
    );
}

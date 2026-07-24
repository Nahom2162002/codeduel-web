'use client';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(24% 0.03 220 / 0.4)';
const BLUE_BORDER = 'oklch(75% 0.15 220 / 0.35)';

const P: React.CSSProperties = { fontSize: 16, lineHeight: 1.7, color: 'oklch(80% 0.02 260)', margin: 0 };
const P_MB: React.CSSProperties = { ...P, marginBottom: 12 };
const UL: React.CSSProperties = { fontSize: 16, lineHeight: 1.8, color: 'oklch(80% 0.02 260)', margin: '0 0 12px', paddingLeft: 22 };
const UL_LAST: React.CSSProperties = { fontSize: 16, lineHeight: 1.8, color: 'oklch(80% 0.02 260)', margin: '0', paddingLeft: 22 };
const H2 = (children: React.ReactNode) => (
    <h2 style={{ fontSize: 22, margin: '0 0 12px', color: BLUE }}>{children}</h2>
);

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function PrivacyPolicy() {
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
                    display: 'inline-block', fontSize: 9, letterSpacing: '0.04em', color: BLUE,
                    background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`, padding: '8px 14px', borderRadius: 4, marginBottom: 24
                }}>
                    [ LEGAL ]
                </div>

                <h1 style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 10px' }}>Privacy Policy</h1>
                <div className={jetbrainsMono.className} style={{ fontSize: 13, color: 'oklch(55% 0.02 260)', marginBottom: 48 }}>
                    Last updated: July 23, 2026
                </div>

                <section style={{ marginBottom: 36 }}>
                    {H2('1. Who We Are')}
                    <p style={P}>CodeDuel is a web-based platform operated by Nahom Ashagrea that allows developers to practice coding by competing against Claude AI. You can contact us at <a href="mailto:nahomashagrea2002@gmail.com" style={{ color: BLUE }}>nahomashagrea2002@gmail.com</a>.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('2. What Data We Collect')}
                    <p style={P_MB}>We collect the following information when you use CodeDuel:</p>
                    <ul style={UL_LAST}>
                        <li>Account information: your username and email address when you create an account</li>
                        <li>Coding submissions: the code you write and submit during duels</li>
                        <li>Duel results: scores, times, languages used, and problem history</li>
                        <li>Performance data: ELO rating, win/loss record, streak, and category statistics</li>
                        <li>Subscription data: your plan status (free or pro) and Stripe customer ID for billing</li>
                        <li>Technical data: standard server logs including IP address and browser type</li>
                    </ul>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('3. How We Use Your Data')}
                    <p style={P_MB}>We use your data to:</p>
                    <ul style={UL}>
                        <li>Provide and operate the CodeDuel platform</li>
                        <li>Calculate your ELO rating and track your performance over time</li>
                        <li>Show you your dashboard statistics and weak spot analysis</li>
                        <li>Process payments via Stripe</li>
                        <li>Send password reset emails when requested</li>
                        <li>Improve the platform based on usage patterns</li>
                    </ul>
                    <p style={P}>We do not sell your data to third parties. We do not use your data for advertising.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('4. How Your Code Is Used')}
                    <p style={P}>When you submit a solution during a duel, your code is sent to Judge0 (a sandboxed code execution service) to run against test cases. Your code is also sent to Anthropic's Claude API for code quality evaluation and comparison. We store your submitted code in our database as part of your duel history. We do not use your code submissions to train AI models.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('5. Data Storage')}
                    <p style={P}>Your data is stored securely in MongoDB Atlas hosted in the United States. Passwords are hashed using bcrypt and are never stored in plain text. Payment information is handled entirely by Stripe and never stored on our servers.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('6. Third Party Services')}
                    <p style={P_MB}>We use the following third party services:</p>
                    <ul style={UL}>
                        <li>Stripe — payment processing (stripe.com/privacy)</li>
                        <li>MongoDB Atlas — database hosting (mongodb.com/legal/privacy-policy)</li>
                        <li>Vercel — hosting and infrastructure (vercel.com/legal/privacy-policy)</li>
                        <li>Anthropic — Claude AI for solution generation and evaluation (anthropic.com/privacy)</li>
                        <li>Judge0 — sandboxed code execution (judge0.com)</li>
                        <li>Google / Gmail — transactional email (policies.google.com/privacy)</li>
                    </ul>
                    <p style={P}>Each of these services has their own privacy policy governing how they handle data.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('7. Data Retention')}
                    <p style={P}>We retain your account and duel history for as long as your account is active. If you delete your account, your personal data will be removed within 30 days. Anonymized aggregate statistics may be retained indefinitely.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('8. Your Rights')}
                    <p style={P_MB}>You have the right to:</p>
                    <ul style={UL}>
                        <li>Access the personal data we hold about you</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of your account and associated data</li>
                        <li>Export your duel history</li>
                    </ul>
                    <p style={P}>To exercise any of these rights, contact us at <a href="mailto:nahomashagrea2002@gmail.com" style={{ color: BLUE }}>nahomashagrea2002@gmail.com</a>.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2("9. Children's Privacy")}
                    <p style={P}>CodeDuel is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.</p>
                </section>

                <section style={{ marginBottom: 36 }}>
                    {H2('10. Changes to This Policy')}
                    <p style={P}>We may update this privacy policy from time to time. We will notify users of significant changes via email. Continued use of CodeDuel after changes constitutes acceptance of the updated policy.</p>
                </section>

                <section>
                    {H2('11. Contact')}
                    <p style={P}>If you have any questions about this privacy policy, contact us at <a href="mailto:nahomashagrea2002@gmail.com" style={{ color: BLUE }}>nahomashagrea2002@gmail.com</a>.</p>
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

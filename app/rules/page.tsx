'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';
import UserMenu from '../components/UserMenu';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';

interface Me {
    username: string;
    plan: string;
    hasHadTrial?: boolean;
    isTrialing?: boolean;
}

const P: React.CSSProperties = { fontSize: 15.5, lineHeight: 1.7, color: 'oklch(80% 0.02 260)', margin: 0 };
const P_MB: React.CSSProperties = { ...P, marginBottom: 12 };
const UL: React.CSSProperties = { fontSize: 15.5, lineHeight: 1.8, color: 'oklch(80% 0.02 260)', margin: '0 0 12px', paddingLeft: 22 };
const UL_LAST: React.CSSProperties = { fontSize: 15.5, lineHeight: 1.8, color: 'oklch(80% 0.02 260)', margin: 0, paddingLeft: 22 };
const H2 = (children: React.ReactNode) => (
    <h2 style={{ fontSize: 20, margin: '0 0 12px', color: BLUE }}>{children}</h2>
);

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ScoreBar({ label, points, color }: { label: string; points: string; color: string }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)',
            borderRadius: 8, padding: '12px 16px'
        }}>
            <span style={{ fontSize: 14.5 }}>{label}</span>
            <span className={pressStart2P.className} style={{ fontSize: 11, color }}>{points}</span>
        </div>
    );
}

export default function RulesPage() {
    const [me, setMe] = useState<Me | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        fetch('/api/user/me', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => { if (data.username) setMe(data); })
            .catch(() => {});
    }, []);

    return (
        <div className={spaceGrotesk.className} style={{ background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', minHeight: '100vh' }}>
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: 1280, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
                    <Link href="/problems" style={{
                        display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20,
                        letterSpacing: '-0.02em', textDecoration: 'none', color: 'oklch(96% 0.01 260)'
                    }}>
                        <DuelIcon />
                        DuelAI
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 15, fontWeight: 500 }}>
                        <Link href="/problems" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Problems</Link>
                        <Link href="/dashboard" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Dashboard</Link>
                        <Link href="/rules" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none', borderBottom: `2px solid ${BLUE}`, paddingBottom: 4 }}>Rules</Link>
                    </div>
                </div>
                {me && <UserMenu username={me.username} plan={me.plan} hasHadTrial={me.hasHadTrial} isTrialing={me.isTrialing} />}
            </nav>

            <main style={{ maxWidth: 760, margin: '0 auto', padding: '24px 48px 100px' }}>
                <div className={pressStart2P.className} style={{
                    display: 'inline-block', fontSize: 9, letterSpacing: '0.04em', color: BLUE,
                    background: 'oklch(24% 0.03 220 / 0.4)', border: `1px solid oklch(75% 0.15 220 / 0.35)`,
                    padding: '8px 14px', borderRadius: 4, marginBottom: 24
                }}>
                    [ RULES ]
                </div>

                <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Rules & Scoring</h1>
                <p style={{ fontSize: 17, color: 'oklch(70% 0.02 260)', margin: '0 0 48px', lineHeight: 1.6 }}>
                    How a duel works, how you're scored against Claude, and what's expected of you as a player.
                </p>

                <section style={{ marginBottom: 40 }}>
                    {H2('How a duel works')}
                    <p style={P}>
                        You and Claude are given the exact same problem at the same time. You write your solution in the browser editor,
                        hit Submit, and Claude writes its own solution to the same problem. Both solutions run against the same hidden test
                        cases, and the results are scored side by side.
                    </p>
                </section>

                <section style={{ marginBottom: 40 }}>
                    {H2('How scoring works')}
                    <p style={P_MB}>Each duel score is out of 100 points, split across three factors:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                        <ScoreBar label="Correctness — tests passed" points="UP TO 50" color={BLUE} />
                        <ScoreBar label="Speed — relative to your opponent" points="UP TO 30" color={ORANGE} />
                        <ScoreBar label="Code quality — judged by Claude" points="UP TO 20" color={BLUE} />
                    </div>
                    <ul style={UL}>
                        <li><strong>Correctness (50 pts):</strong> the percentage of test cases your code passes, out of 50.</li>
                        <li><strong>Speed (30 pts):</strong> not just your raw time — it's scored relative to how long your opponent took, so beating a slow solution is worth more than beating a fast one.</li>
                        <li><strong>Code quality (20 pts):</strong> Claude reviews both solutions and scores them on time complexity, space complexity, readability, edge-case handling, and overall elegance.</li>
                    </ul>
                    <p style={P_MB}>
                        Whoever ends up with the higher total wins the duel — but it's not a hair-trigger comparison. Your score has to beat
                        your opponent's by more than 5 points to count as a win or loss; anything closer than that is a <strong>draw</strong>.
                    </p>
                    <p style={P}>
                        Your ELO rating then moves based on the result and the problem's difficulty — bigger swings on Hard problems,
                        smaller ones on Easy. Draws always give a small +5 regardless of difficulty.
                    </p>
                </section>

                <section style={{ marginBottom: 40 }}>
                    {H2('Daily limits')}
                    <p style={P_MB}><strong>Free plan:</strong> 3 duels per day, resetting at midnight. Premium problems are visible but locked.</p>
                    <p style={P}><strong>Pro plan:</strong> unlimited duels per day and full access to every problem.</p>
                </section>

                <section style={{ marginBottom: 40 }}>
                    {H2('Fair play')}
                    <p style={P_MB}>
                        DuelAI only works as a way to measure your own skills if the code you submit is actually yours. Pasting in a
                        solution from another AI tool or copying one from the internet defeats the point — there's no way for us to
                        detect that, so this one's on the honor system.
                    </p>
                    <p style={P_MB}>Beyond that, you agree not to:</p>
                    <ul style={UL_LAST}>
                        <li>Submit malicious code intended to compromise the execution sandbox</li>
                        <li>Attempt to reverse engineer or hack the platform</li>
                        <li>Share your account credentials with others</li>
                        <li>Use automated tools or bots to submit solutions</li>
                        <li>Attempt to artificially manipulate ELO ratings</li>
                    </ul>
                </section>

                <section style={{ marginBottom: 8 }}>
                    {H2('Good to know')}
                    <ul style={UL_LAST}>
                        <li>Python, JavaScript, and Java are supported.</li>
                        <li>Code runs in a sandbox with a 5-second CPU time limit and 128MB memory limit per test case.</li>
                        <li>Claude writes a fresh solution every duel — it's not cached or the same each time, even for the same problem.</li>
                    </ul>
                </section>

                <p className={jetbrainsMono.className} style={{ fontSize: 13, color: 'oklch(55% 0.02 260)', marginTop: 32 }}>
                    For the full legal terms, see the <Link href="/terms" style={{ color: BLUE }}>Terms of Service</Link>.
                </p>
            </main>

            <footer style={{
                borderTop: '1px solid oklch(28% 0.02 260)', padding: '32px 48px', maxWidth: 1280, margin: '0 auto',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15 }}>
                    <DuelIcon size={19} />
                    DuelAI
                </div>
                <div style={{ fontSize: 13.5, color: 'oklch(55% 0.02 260)' }}>
                    © {new Date().getFullYear()} DuelAI. All rights reserved.
                </div>
                <div style={{ display: 'flex', gap: 24, fontSize: 13.5 }}>
                    <Link href="/privacy" style={{ color: 'oklch(65% 0.02 260)', textDecoration: 'none' }}>Privacy Policy</Link>
                    <Link href="/terms" style={{ color: 'oklch(65% 0.02 260)', textDecoration: 'none' }}>Terms of Service</Link>
                </div>
            </footer>
        </div>
    );
}

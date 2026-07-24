'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(75% 0.15 220 / 0.18)';
const ORANGE_BG = 'oklch(75% 0.15 55 / 0.18)';

const YOU_CODE = `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        need = target - n
        if need in seen:
            return [seen[need], i]
        seen[n] = i
    return []`;

const CLAUDE_CODE = `def two_sum(nums, target):
    idx = {}
    for i, val in enumerate(nums):
        rem = target - val
        if rem in idx:
            return [idx[rem], i]
        idx[val] = i
    return []`;

const LEVELS = [
    { title: 'Pick a problem', desc: 'Choose from 20+ problems across 6 categories and 3 difficulty levels. New problems added regularly.' },
    { title: 'Write your solution', desc: 'Code in the browser with a full VS Code-style editor. Python, JavaScript, and Java supported at launch.' },
    { title: 'Submit and duel', desc: 'Hit submit and Claude races to solve the same problem. Both solutions run against the same test cases.' },
    { title: 'See who won', desc: 'Results show scores side by side. Claude explains its approach so you actually learn something every time.' },
];

const FEATURES = [
    { icon: '⚔️', title: 'Real Competition', desc: 'You and Claude receive the same problem simultaneously. Both start coding. One wins.', pro: false },
    { icon: '📊', title: 'Scored on 3 Dimensions', desc: 'Correctness, speed, and code quality — the same way a real code review works.', pro: false },
    { icon: '📚', title: 'Learn From Claude', desc: 'After every duel Claude explains its approach and where your solution could improve.', pro: false },
    { icon: '🎯', title: 'ELO Rating System', desc: 'Your rating goes up when you win and down when you lose — just like chess.', pro: true },
    { icon: '🔍', title: 'Weak Spot Detection', desc: 'Your dashboard identifies which categories you consistently lose in and surfaces practice problems.', pro: true },
    { icon: '📈', title: 'Progress Dashboard', desc: 'Track your win rate, streak, ELO over time, and performance by difficulty and category.', pro: true },
    { icon: '🗂', title: 'All Problem Categories', desc: 'Arrays, Strings, Trees, Graphs, Dynamic Programming, and System Design.', pro: true },
    { icon: '⚡', title: 'Unlimited Duels', desc: 'Free tier is limited to 3 duels per day. Pro unlocks unlimited.', pro: true },
];

const FREE_FEATURES = ['3 duels per day', 'Arrays and Strings problems', 'Full Monaco editor', 'Claude solution comparison', 'Learn from every duel'];
const PRO_FEATURES = ['Everything in Free', 'Unlimited duels', 'All 6 problem categories', 'ELO rating system', 'Progress dashboard', 'Weak spot detection', 'Performance analytics', 'New problems added weekly'];

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function LandingPage() {
    const [youIdx, setYouIdx] = useState(0);
    const [claudeIdx, setClaudeIdx] = useState(0);
    const [cursorOn, setCursorOn] = useState(true);
    const [scoreYou, setScoreYou] = useState(0);
    const [scoreClaude, setScoreClaude] = useState(0);
    const [showWinner, setShowWinner] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(0);

    // Blinking cursor
    useEffect(() => {
        const t = setInterval(() => setCursorOn(c => !c), 500);
        return () => clearInterval(t);
    }, []);

    // Rotate the active "level" row
    useEffect(() => {
        const t = setInterval(() => setCurrentLevel(l => (l + 1) % LEVELS.length), 1800);
        return () => clearInterval(t);
    }, []);

    // Type-out / score / winner-banner demo loop
    useEffect(() => {
        let cancelled = false;
        let yIdx = 0, cIdx = 0, sYou = 0, sClaude = 0;

        function tick() {
            if (cancelled) return;
            const yDone = yIdx >= YOU_CODE.length;
            const cDone = cIdx >= CLAUDE_CODE.length;

            if (!yDone || !cDone) {
                yIdx = Math.min(YOU_CODE.length, yIdx + (yDone ? 0 : 2));
                cIdx = Math.min(CLAUDE_CODE.length, cIdx + (cDone ? 0 : 2));
                setYouIdx(yIdx);
                setClaudeIdx(cIdx);
                setTimeout(tick, 45);
                return;
            }

            if (sYou < 87 || sClaude < 82) {
                sYou = Math.min(87, sYou + 3);
                sClaude = Math.min(82, sClaude + 3);
                setScoreYou(sYou);
                setScoreClaude(sClaude);
                setTimeout(tick, 45);
                return;
            }

            setShowWinner(true);
            setTimeout(() => {
                if (cancelled) return;
                yIdx = 0; cIdx = 0; sYou = 0; sClaude = 0;
                setYouIdx(0); setClaudeIdx(0); setScoreYou(0); setScoreClaude(0); setShowWinner(false);
                setTimeout(tick, 45);
            }, 2500);
        }

        const start = setTimeout(tick, 45);
        return () => { cancelled = true; clearTimeout(start); };
    }, []);

    const youCodeShown = YOU_CODE.slice(0, youIdx);
    const claudeCodeShown = CLAUDE_CODE.slice(0, claudeIdx);
    const youCursorOpacity = youIdx < YOU_CODE.length ? (cursorOn ? 1 : 0) : 0;
    const claudeCursorOpacity = claudeIdx < CLAUDE_CODE.length ? (cursorOn ? 1 : 0) : 0;
    const winnerText = scoreYou >= scoreClaude ? '🏆 YOU WIN — 87 to 82' : '🏆 CLAUDE WINS — 82 to 87';

    return (
        <div className={spaceGrotesk.className} style={{ background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
            <style>{`
                @keyframes pulseVs { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.08); } }
                @keyframes floatBadge { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
                @keyframes scanroll { 0% { background-position: 0 0; } 100% { background-position: 0 8px; } }
            `}</style>

            <div style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999, opacity: 0.05,
                backgroundImage: 'repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 3px)',
                animation: 'scanroll 0.3s linear infinite'
            }} />

            <nav style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px',
                maxWidth: 1280, margin: '0 auto', position: 'sticky', top: 0, zIndex: 50,
                background: 'oklch(16% 0.02 260 / 0.85)', backdropFilter: 'blur(8px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>
                    <DuelIcon />
                    CodeDuel
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 15, fontWeight: 500 }}>
                    <a href="#how-it-works" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>How it works</a>
                    <a href="#features" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Features</a>
                    <a href="#pricing" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Pricing</a>
                    <Link href="/login" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none' }}>Log in</Link>
                    <Link href="/register" style={{ background: BLUE, color: 'oklch(16% 0.02 260)', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 700 }}>
                        Start Dueling
                    </Link>
                </div>
            </nav>

            <header style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 48px 40px', textAlign: 'center' }}>
                <div className={pressStart2P.className} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, letterSpacing: '0.04em',
                    color: ORANGE, background: 'oklch(24% 0.03 55 / 0.4)', border: `1px solid oklch(75% 0.15 55 / 0.35)`,
                    padding: '10px 16px', borderRadius: 4, marginBottom: 28
                }}>
                    [ THE CODING PRACTICE PLATFORM BUILT FOR THE AI ERA ]
                </div>
                <h1 style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.03em', margin: '0 0 22px' }}>
                    Think you can out-code<br />
                    <span style={{ color: ORANGE }}>Claude?</span> Give it your best shot.
                </h1>
                <p style={{ fontSize: 20, color: 'oklch(78% 0.02 260)', maxWidth: 620, margin: '0 auto 12px', lineHeight: 1.5 }}>
                    CodeDuel puts you head-to-head against Claude on real coding problems. Same problem. Same time. One winner.
                </p>
                <p style={{ fontSize: 16, color: 'oklch(60% 0.02 260)', margin: '0 0 36px' }}>
                    Because the best way to stay sharp in the age of AI is to compete with it.
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
                    <Link href="/register" style={{ background: BLUE, color: 'oklch(16% 0.02 260)', padding: '16px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 17 }}>
                        Start Dueling
                    </Link>
                    <a href="#how-it-works" style={{ border: '1px solid oklch(40% 0.02 260)', color: 'oklch(96% 0.01 260)', padding: '16px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 17 }}>
                        See how it works
                    </a>
                </div>
                <div className={jetbrainsMono.className} style={{ fontSize: 13, color: 'oklch(55% 0.02 260)' }}>
                    Free to start · No credit card required · 3 duels per day on the free tier
                </div>
            </header>

            <section style={{ maxWidth: 1120, margin: '40px auto 100px', padding: '0 48px', position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, position: 'relative' }}>
                    <div style={{ background: 'oklch(21% 0.02 260)', border: `1px solid oklch(75% 0.15 220 / 0.35)`, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 2, left: 2, width: 14, height: 14, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}`, zIndex: 2 }} />
                        <div style={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}`, zIndex: 2 }} />
                        <div className={pressStart2P.className} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid oklch(30% 0.02 260)', fontSize: 10, color: BLUE }}>
                            <span style={{ fontSize: 16 }}>🧑‍💻</span> YOU
                            <span className={jetbrainsMono.className} style={{ marginLeft: 'auto', color: 'oklch(55% 0.02 260)', fontSize: 12 }}>solution.py</span>
                        </div>
                        <pre className={jetbrainsMono.className} style={{ margin: 0, padding: 20, fontSize: 13.5, lineHeight: 1.7, color: 'oklch(90% 0.01 260)', minHeight: 210, whiteSpace: 'pre-wrap' }}>
                            {youCodeShown}<span style={{ opacity: youCursorOpacity }}>▍</span>
                        </pre>
                        <div className={jetbrainsMono.className} style={{ padding: '14px 16px', borderTop: '1px solid oklch(30% 0.02 260)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                            <span style={{ color: 'oklch(60% 0.02 260)' }}>Score</span>
                            <span className={pressStart2P.className} style={{ color: BLUE, fontWeight: 700, fontSize: 17 }}>{scoreYou}</span>
                        </div>
                    </div>

                    <div style={{ background: 'oklch(21% 0.02 260)', border: `1px solid oklch(75% 0.15 55 / 0.35)`, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 2, left: 2, width: 14, height: 14, borderTop: `2px solid ${ORANGE}`, borderLeft: `2px solid ${ORANGE}`, zIndex: 2 }} />
                        <div style={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderBottom: `2px solid ${ORANGE}`, borderRight: `2px solid ${ORANGE}`, zIndex: 2 }} />
                        <div className={pressStart2P.className} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid oklch(30% 0.02 260)', fontSize: 10, color: ORANGE }}>
                            <span style={{ fontSize: 16 }}>🤖</span> CLAUDE
                            <span className={jetbrainsMono.className} style={{ marginLeft: 'auto', color: 'oklch(55% 0.02 260)', fontSize: 12 }}>solution.py</span>
                        </div>
                        <pre className={jetbrainsMono.className} style={{ margin: 0, padding: 20, fontSize: 13.5, lineHeight: 1.7, color: 'oklch(90% 0.01 260)', minHeight: 210, whiteSpace: 'pre-wrap' }}>
                            {claudeCodeShown}<span style={{ opacity: claudeCursorOpacity }}>▍</span>
                        </pre>
                        <div className={jetbrainsMono.className} style={{ padding: '14px 16px', borderTop: '1px solid oklch(30% 0.02 260)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                            <span style={{ color: 'oklch(60% 0.02 260)' }}>Score</span>
                            <span className={pressStart2P.className} style={{ color: ORANGE, fontWeight: 700, fontSize: 17 }}>{scoreClaude}</span>
                        </div>
                    </div>

                    <div className={pressStart2P.className} style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: 68, height: 68, borderRadius: '50%', background: 'oklch(16% 0.02 260)',
                        border: '2px solid oklch(50% 0.02 260)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 12, letterSpacing: '-0.02em', animation: 'pulseVs 2.4s ease-in-out infinite', zIndex: 5
                    }}>
                        VS
                    </div>
                </div>
                {showWinner && (
                    <div className={pressStart2P.className} style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: BLUE, animation: 'floatBadge 2s ease-in-out infinite' }}>
                        {winnerText}
                    </div>
                )}
            </section>

            <section id="how-it-works" style={{ maxWidth: 880, margin: '0 auto', padding: '80px 48px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h2 className={pressStart2P.className} style={{ fontSize: 22, letterSpacing: '0.02em', margin: '0 0 16px', color: BLUE }}>
                        SELECT YOUR LEVEL<span style={{ opacity: cursorOn ? 1 : 0 }}>_</span>
                    </h2>
                    <p style={{ fontSize: 18, color: 'oklch(70% 0.02 260)', margin: 0 }}>A duel takes about 30 minutes. Results are instant.</p>
                </div>
                <div style={{ border: '2px solid oklch(30% 0.02 260)', borderRadius: 8, background: 'oklch(19% 0.015 260)', padding: 8, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 6, left: 6, width: 16, height: 16, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` }} />
                    <div style={{ position: 'absolute', bottom: 6, right: 6, width: 16, height: 16, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` }} />
                    {LEVELS.map((lv, i) => {
                        const active = i === currentLevel;
                        return (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 20, padding: '20px 24px', borderRadius: 6,
                                background: active ? BLUE_BG : 'transparent', borderLeft: `3px solid ${active ? BLUE : 'transparent'}`,
                                transition: 'background 0.3s'
                            }}>
                                <span className={pressStart2P.className} style={{ fontSize: 14, color: active ? BLUE : 'oklch(50% 0.02 260)', width: 16 }}>
                                    {active ? '▸' : ''}
                                </span>
                                <span className={pressStart2P.className} style={{ fontSize: 16, color: active ? BLUE : 'oklch(50% 0.02 260)', minWidth: 60 }}>
                                    LV{String(i + 1).padStart(2, '0')}
                                </span>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: 17, margin: '0 0 6px', color: 'oklch(95% 0.01 260)' }}>{lv.title}</h3>
                                    <p style={{ fontSize: 14, color: 'oklch(65% 0.02 260)', lineHeight: 1.5, margin: 0 }}>{lv.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section id="features" style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 48px 90px' }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Everything you need to stay sharp</h2>
                    <p style={{ fontSize: 18, color: 'oklch(70% 0.02 260)', margin: 0 }}>Free to start. Upgrade when you want the full competitive experience.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                    {FEATURES.map((f, i) => (
                        <div key={i} style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 24, position: 'relative' }}>
                            <div className={pressStart2P.className} style={{
                                position: 'absolute', top: 18, right: 18, fontSize: 8, letterSpacing: '0.02em', padding: '5px 9px',
                                borderRadius: 999, background: f.pro ? BLUE_BG : 'oklch(30% 0.02 260)', color: f.pro ? BLUE : 'oklch(80% 0.02 260)'
                            }}>
                                {f.pro ? 'PRO' : 'FREE'}
                            </div>
                            <div style={{ fontSize: 26, marginBottom: 14 }}>{f.icon}</div>
                            <h3 style={{ fontSize: 16.5, margin: '0 0 8px', paddingRight: 50 }}>{f.title}</h3>
                            <p style={{ fontSize: 14, color: 'oklch(65% 0.02 260)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 48px 100px' }}>
                <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 48px' }}>Why CodeDuel?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>
                    <div style={{ background: 'oklch(19% 0.015 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 32 }}>
                        <h3 style={{ fontSize: 20, margin: '0 0 10px', color: 'oklch(65% 0.02 260)' }}>LeetCode</h3>
                        <p style={{ fontSize: 15, color: 'oklch(60% 0.02 260)', lineHeight: 1.6, margin: 0 }}>You vs. a timer. Designed for interview prep. No AI opponent. No learning from comparison.</p>
                    </div>
                    <div style={{ background: 'oklch(24% 0.04 55 / 0.25)', border: `1px solid oklch(75% 0.15 55 / 0.45)`, borderRadius: 12, padding: 32 }}>
                        <h3 style={{ fontSize: 20, margin: '0 0 10px', color: ORANGE, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                                <path d="M4 4L20 20M20 4L4 20" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                            CodeDuel
                        </h3>
                        <p style={{ fontSize: 15, color: 'oklch(85% 0.02 260)', lineHeight: 1.6, margin: 0 }}>You vs. Claude. Designed for staying sharp. Real competition. Learn from every duel.</p>
                    </div>
                </div>
                <p style={{ textAlign: 'center', fontSize: 18, color: 'oklch(80% 0.02 260)', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
                    The best way to not be replaced by AI is to be better than it. CodeDuel gives you a way to measure that — and close the gap.
                </p>
            </section>

            <section id="pricing" style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 48px 100px' }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Simple pricing</h2>
                    <p style={{ fontSize: 18, color: 'oklch(70% 0.02 260)', margin: 0 }}>Start free. Upgrade when you want the full experience.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'start' }}>
                    <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 14, padding: 36, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 4, left: 4, width: 14, height: 14, borderTop: '2px solid oklch(45% 0.02 260)', borderLeft: '2px solid oklch(45% 0.02 260)' }} />
                        <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderBottom: '2px solid oklch(45% 0.02 260)', borderRight: '2px solid oklch(45% 0.02 260)' }} />
                        <div className={pressStart2P.className} style={{ fontSize: 9, color: 'oklch(55% 0.02 260)', marginBottom: 14 }}>PLAYER 1</div>
                        <h3 style={{ fontSize: 20, margin: '0 0 6px' }}>Free</h3>
                        <div style={{ fontSize: 42, fontWeight: 700, marginBottom: 4 }}>$0</div>
                        <div style={{ fontSize: 14, color: 'oklch(60% 0.02 260)', marginBottom: 28 }}>Forever free</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                            {FREE_FEATURES.map((f, i) => (
                                <div key={i} style={{ fontSize: 14.5, color: 'oklch(85% 0.02 260)' }}>✓ {f}</div>
                            ))}
                        </div>
                        <Link href="/register" style={{ display: 'block', textAlign: 'center', border: '1px solid oklch(45% 0.02 260)', color: 'oklch(96% 0.01 260)', padding: 13, borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                            Get started free
                        </Link>
                    </div>

                    <div style={{ background: 'oklch(24% 0.04 220 / 0.2)', border: `1.5px solid ${BLUE}`, borderRadius: 14, padding: 36, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 4, left: 4, width: 14, height: 14, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` }} />
                        <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` }} />
                        <div className={pressStart2P.className} style={{
                            position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: BLUE,
                            color: 'oklch(16% 0.02 260)', fontSize: 9, letterSpacing: '0.03em', padding: '6px 14px', borderRadius: 4
                        }}>
                            MOST POPULAR
                        </div>
                        <div className={pressStart2P.className} style={{ fontSize: 9, color: BLUE, marginBottom: 14 }}>PLAYER 2</div>
                        <h3 style={{ fontSize: 20, margin: '0 0 6px' }}>Pro</h3>
                        <div style={{ fontSize: 42, fontWeight: 700, marginBottom: 4 }}>
                            $9<span style={{ fontSize: 16, color: 'oklch(65% 0.02 260)', fontWeight: 500 }}>/month</span>
                        </div>
                        <div style={{ fontSize: 14, color: 'oklch(70% 0.05 220)', marginBottom: 28 }}>7-day free trial — no credit card required</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                            {PRO_FEATURES.map((f, i) => (
                                <div key={i} style={{ fontSize: 14.5, color: 'oklch(90% 0.02 260)' }}>✓ {f}</div>
                            ))}
                        </div>
                        <Link href="/register" style={{ display: 'block', textAlign: 'center', background: BLUE, color: 'oklch(16% 0.02 260)', padding: 13, borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ maxWidth: 900, margin: '0 auto', padding: '20px 48px 110px', textAlign: 'center' }}>
                <h2 style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 18px' }}>Ready to find out?</h2>
                <p style={{ fontSize: 18, color: 'oklch(72% 0.02 260)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.6 }}>
                    Every developer using AI tools wonders if their raw skills are slipping. CodeDuel gives you an honest answer — and a way to improve.
                </p>
                <Link href="/register" style={{ display: 'inline-block', background: BLUE, color: 'oklch(16% 0.02 260)', padding: '17px 36px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 17, marginBottom: 16 }}>
                    Start Dueling
                </Link>
                <div className={jetbrainsMono.className} style={{ fontSize: 13, color: 'oklch(55% 0.02 260)' }}>
                    7-day free trial · No credit card required · 3 free duels per day
                </div>
            </section>

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

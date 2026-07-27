import type { Metadata } from 'next';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(24% 0.03 220 / 0.4)';
const BLUE_BORDER = 'oklch(75% 0.15 220 / 0.35)';

export const metadata: Metadata = {
    title: 'Are AI Coding Tools Making Developers Worse at Coding? — CodeDuel Blog',
    description: 'GitHub Copilot and Claude are making developers faster. But are they making developers better? An honest look at what AI tools are doing to raw coding skills.',
};

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function BlogPost() {
    return (
        <div className={spaceGrotesk.className} style={{ background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', minHeight: '100vh' }}>
            <style>{`
                @media (max-width: 768px) {
                    .blog-page nav { padding: 16px 20px !important; flex-wrap: wrap !important; row-gap: 12px !important; }
                    .blog-page .nav-links { gap: 14px !important; }
                    .blog-page .nav-anchor { display: none !important; }
                    .blog-page main { padding-left: 20px !important; padding-right: 20px !important; }
                    .blog-page h1 { font-size: 28px !important; }
                    .blog-page footer { padding-left: 20px !important; padding-right: 20px !important; justify-content: center !important; text-align: center !important; }
                }
            `}</style>
            <div className="blog-page">
                <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: 1280, margin: '0 auto' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', textDecoration: 'none', color: 'oklch(96% 0.01 260)' }}>
                        <DuelIcon />
                        CodeDuel
                    </Link>
                    <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 15, fontWeight: 500 }}>
                        <a href="/#how-it-works" className="nav-anchor" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>How it works</a>
                        <a href="/#features" className="nav-anchor" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Features</a>
                        <a href="/#pricing" className="nav-anchor" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Pricing</a>
                        <Link href="/blog" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Blog</Link>
                        <Link href="/login" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none' }}>Log in</Link>
                        <Link href="/register" style={{ background: BLUE, color: 'oklch(16% 0.02 260)', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 700 }}>
                            Start Dueling
                        </Link>
                    </div>
                </nav>

                <main style={{ maxWidth: 700, margin: '0 auto', padding: '24px 48px 100px' }}>
                    <Link href="/blog" className={jetbrainsMono.className} style={{ color: BLUE, fontSize: 13.5, textDecoration: 'none' }}>
                        ← Back to Blog
                    </Link>

                    <div style={{ margin: '32px 0 44px' }}>
                        <div className={pressStart2P.className} style={{
                            display: 'inline-block', fontSize: 9, letterSpacing: '0.04em', color: BLUE,
                            background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`, padding: '8px 14px', borderRadius: 4, marginBottom: 20
                        }}>
                            [ OPINION · JULY 2026 ]
                        </div>
                        <h1 style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 16px' }}>
                            Are AI Coding Tools Making Developers Worse at Coding?
                        </h1>
                        <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                            GitHub Copilot and Claude are making developers faster. But are they making developers better?
                            An honest look at what AI tools might be doing to raw coding skills.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                        <p style={prose}>
                            I noticed something uncomfortable a few months ago. I was shipping faster than ever.
                            Copilot was autocompleting my functions. Claude was helping me debug in minutes what used to take hours.
                            By any productivity metric I was performing at my best.
                        </p>

                        <p style={prose}>
                            Then I sat down to do a LeetCode problem without any AI assistance. Something felt off.
                            The muscle memory was slower. The instinct to reach for the answer before working through
                            the problem had gotten stronger. I wasn't sure if I was imagining it or if something real
                            was happening to my raw coding ability.
                        </p>

                        <p style={prose}>
                            I started asking other developers if they felt the same thing. Most of them did.
                            Nobody had a good answer for what to do about it.
                        </p>

                        <h2 style={h2}>The Productivity Trap</h2>

                        <p style={prose}>
                            AI coding tools are genuinely remarkable. GitHub Copilot has tens of millions of users.
                            Claude Code launched in 2026 and became one of the most discussed developer tools of the year
                            almost immediately. Every major IDE now has AI integration. The productivity gains are real
                            and well documented.
                        </p>

                        <p style={prose}>
                            But productivity and skill are not the same thing. You can be more productive with a calculator
                            without becoming better at mental arithmetic. You can navigate more efficiently with GPS without
                            becoming better at reading maps. The tool does the work so your brain doesn't have to —
                            and over time your brain gets out of practice.
                        </p>

                        <p style={prose}>
                            The question is whether the same thing is happening with AI coding tools. Are developers
                            becoming more productive while their underlying skills quietly atrophy?
                        </p>

                        <h2 style={h2}>What the Research Suggests</h2>

                        <p style={prose}>
                            A 2023 study from Stanford found that GitHub Copilot users wrote code 55% faster than those
                            without it. That number gets cited constantly. What gets cited less often is the follow-up
                            question nobody studied rigorously: what happens to the skills of those developers over time?
                        </p>

                        <p style={prose}>
                            We have some indirect evidence from adjacent fields. Research on GPS navigation has found
                            that heavy GPS users show reduced spatial memory and reduced ability to navigate without assistance.
                            Research on calculator use in education found that students who relied heavily on calculators
                            performed worse on mental arithmetic assessments than those who practiced without them.
                        </p>

                        <p style={prose}>
                            None of this proves that AI coding tools are degrading developer skills. But it suggests
                            the mechanism is plausible — when a tool removes the need to exercise a cognitive skill,
                            that skill may weaken over time without deliberate practice to maintain it.
                        </p>

                        <h2 style={h2}>The Interview Problem</h2>

                        <p style={prose}>
                            The most concrete place where this tension surfaces is technical interviews.
                            Most technical interviews still require whiteboard coding or live coding without AI assistance.
                            A developer who has spent two years coding primarily with Copilot may find themselves
                            less prepared for that environment than they would have been before AI tools existed —
                            even if their day-to-day productivity has significantly improved.
                        </p>

                        <p style={prose}>
                            This creates a strange situation where the tools that make you better at your job
                            might make you worse at getting your next job. Developers who want to stay hireable
                            need to maintain raw coding skills that their daily workflow no longer requires them to exercise.
                        </p>

                        <h2 style={h2}>The Honest Answer</h2>

                        <p style={prose}>
                            The honest answer is that we don't know yet. AI coding tools at scale have only existed
                            for a few years. The longitudinal research needed to definitively answer whether they
                            degrade underlying developer skills doesn't exist yet.
                        </p>

                        <p style={prose}>
                            What we do know is that the anxiety is real and widespread. Developers who use AI tools
                            daily report feeling less confident in their raw coding ability even as their productivity
                            improves. That gap between feeling productive and feeling skilled is worth paying attention to.
                        </p>

                        <p style={prose}>
                            The solution isn't to stop using AI tools — that ship has sailed and the productivity
                            gains are too real to ignore. The solution is deliberate practice that maintains raw skills
                            independently of AI assistance. The same way musicians who use music software still practice
                            scales. The same way athletes who use data analytics still do fundamentals drills.
                        </p>

                        <h2 style={h2}>How to Stay Sharp</h2>

                        <p style={prose}>
                            A few approaches that developers are using to maintain raw skills in the age of AI:
                        </p>

                        <p style={prose}>
                            <strong style={{ color: 'oklch(96% 0.01 260)' }}>Regular no-AI coding sessions.</strong> Set aside time
                            each week to write code without any AI assistance. Even 30 minutes of deliberate
                            no-AI practice maintains the muscle memory that daily AI-assisted work doesn't exercise.
                        </p>

                        <p style={prose}>
                            <strong style={{ color: 'oklch(96% 0.01 260)' }}>Competitive coding practice.</strong> Platforms like
                            LeetCode, HackerRank, and Codeforces provide problems that require raw problem-solving
                            ability. Regular practice keeps the underlying skills sharp regardless of what tools
                            you use in your day job.
                        </p>

                        <p style={prose}>
                            <strong style={{ color: 'oklch(96% 0.01 260)' }}>Competing against AI directly.</strong> This is the
                            approach we built CodeDuel around. If you want to know honestly how your raw coding skills
                            compare to the AI you use every day, compete against it directly. Same problem,
                            same time, scored on correctness, speed, and code quality. Your ELO rating gives you
                            an honest picture of where you stand and your dashboard shows you exactly which
                            categories need the most work.
                        </p>

                        <p style={prose}>
                            <strong style={{ color: 'oklch(96% 0.01 260)' }}>Code review without AI.</strong> When reviewing
                            other developers' code, resist the urge to run it through an AI first.
                            Form your own opinion about correctness, performance, and style before using AI
                            as a second opinion. This keeps the analytical skills that AI tends to replace
                            most directly.
                        </p>

                        <h2 style={h2}>The Bottom Line</h2>

                        <p style={prose}>
                            AI coding tools are not going away and they shouldn't. The productivity gains are
                            real and valuable. But developers who want to stay sharp — for interviews, for
                            situations where AI isn't available, and for their own confidence — need to
                            deliberately maintain the raw skills that AI tools no longer require them to exercise daily.
                        </p>

                        <p style={prose}>
                            The best developers of the next decade will be those who can use AI tools fluently
                            AND code effectively without them. Maintaining that second capability requires intentional practice.
                        </p>

                        <div style={{
                            background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`, borderRadius: 14,
                            padding: 32, textAlign: 'center', marginTop: 16, position: 'relative'
                        }}>
                            <div style={{ position: 'absolute', top: 6, left: 6, width: 16, height: 16, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` }} />
                            <div style={{ position: 'absolute', bottom: 6, right: 6, width: 16, height: 16, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` }} />

                            <p style={{ fontSize: 24, margin: '0 0 12px' }}>⚔️</p>
                            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                                Find out where you stand
                            </h3>
                            <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>
                                CodeDuel puts you head-to-head against Claude AI on real coding problems.
                                Your ELO rating gives you an honest answer to the question this article asks.
                            </p>
                            <Link
                                href="/register"
                                style={{
                                    display: 'inline-block', padding: '13px 28px', borderRadius: 8, border: 'none',
                                    background: BLUE, color: 'oklch(16% 0.02 260)', fontSize: 14, fontWeight: 700, textDecoration: 'none'
                                }}
                            >
                                Start for free — 3 duels per day
                            </Link>
                        </div>

                        <div style={{
                            borderTop: '1px solid oklch(28% 0.02 260)', paddingTop: 24,
                            display: 'flex', alignItems: 'center', gap: 16
                        }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: '50%', background: BLUE,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, color: 'oklch(16% 0.02 260)', fontSize: 16, flexShrink: 0
                            }}>
                                NA
                            </div>
                            <div>
                                <p style={{ color: 'oklch(96% 0.01 260)', fontWeight: 700, fontSize: 14, margin: '0 0 2px' }}>
                                    Nahom Ashagrea
                                </p>
                                <p className={jetbrainsMono.className} style={{ color: 'oklch(55% 0.02 260)', fontSize: 12, margin: 0 }}>
                                    Founder of CodeDuel · Full Stack Developer · B.S. Computational AI, RIT
                                </p>
                            </div>
                        </div>
                    </div>
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
        </div>
    );
}

const prose: React.CSSProperties = {
    color: 'oklch(78% 0.02 260)',
    fontSize: 16,
    lineHeight: 1.8,
    margin: 0
};

const h2: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    margin: '8px 0 0',
    color: BLUE
};

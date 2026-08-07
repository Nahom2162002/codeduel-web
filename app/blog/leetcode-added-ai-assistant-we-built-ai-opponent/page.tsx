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
    title: 'LeetCode Added an AI Assistant. We Built an AI Opponent. Here\'s Why That Matters. — CodeDuel Blog',
    description: 'LeetCode\'s Ask Leet helps you solve coding problems. CodeDuel makes you compete against AI instead. The difference is more important than it sounds.',
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
                            [ OPINION · AUGUST 2026 ]
                        </div>
                        <h1 style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 16px' }}>
                            LeetCode Added an AI Assistant. We Built an AI Opponent. Here's Why That Matters.
                        </h1>
                        <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                            Ask Leet helps you solve coding problems. CodeDuel makes you compete against AI instead.
                            The difference is more important than it sounds.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                        <p style={prose}>
                            LeetCode just launched Ask Leet — an AI assistant deeply integrated into their platform
                            that helps you brainstorm solutions, optimize code, generate test cases, and debug errors.
                            It supports GPT-5.2, Gemini, Claude, and other models. It's genuinely impressive and
                            LeetCode's largest product update in years.
                        </p>

                        <p style={prose}>
                            I think it's moving in the wrong direction.
                        </p>

                        <p style={prose}>
                            Not because AI assistance is bad. It isn't. But because the problem most developers
                            actually need to solve right now isn't "how do I get help solving coding problems faster."
                            It's "how do I make sure my raw problem-solving ability isn't quietly disappearing
                            while I use AI tools every day."
                        </p>

                        <p style={prose}>
                            Those are opposite problems. And they require opposite solutions.
                        </p>

                        <h2 style={h2}>What Ask Leet Does</h2>

                        <p style={prose}>
                            Ask Leet is an AI that sits alongside you while you practice on LeetCode. Stuck on
                            a problem? Ask Leet for a hint. Not sure why your solution is slow? Ask Leet to
                            analyze it. Want to understand a different approach? Ask Leet to explain it.
                        </p>

                        <p style={prose}>
                            It's essentially GitHub Copilot for LeetCode. The AI reduces friction, fills in gaps,
                            and helps you get unstuck faster. For someone learning to code for the first time
                            that's genuinely valuable. For someone preparing for interviews with AI assistance
                            that might be acceptable depending on whether their target companies allow AI in interviews.
                        </p>

                        <p style={prose}>
                            But for working developers who want to know honestly where their skills stand —
                            Ask Leet doesn't answer that question. It makes the question harder to answer
                            because every session has AI assistance baked in.
                        </p>

                        <h2 style={h2}>The Problem With AI Assistance During Practice</h2>

                        <p style={prose}>
                            There's an important distinction between AI that helps you learn and AI that 
                            does the thinking for you.      
                        </p>

                        <p style={prose}>
                            A tutor who gives you a hint when you're completely stuck is different from 
                            one who just hands you the answer. The first develops your ability to solve 
                            problems — the second develops your ability to recognize correct solutions 
                            when you see them. Both have value but they produce different skills.
                        </p>

                        <p style={prose}>
                            CodeDuel actually offers both modes. In a competitive duel there's no AI 
                            assistance — just you and Claude racing to solve the same problem. But in 
                            practice modes like Step by Step, Claude acts as a tutor — giving you hints 
                            one at a time without revealing the full solution, helping you develop the 
                            approach yourself rather than copying it.
                        </p>

                        <p style={prose}>
                            The difference between CodeDuel's practice modes and Ask Leet isn't that 
                            one uses AI and the other doesn't. It's that CodeDuel's AI assistance is 
                            structured around developing your independent problem-solving ability — 
                            hints that guide you toward the answer rather than tools that generate the 
                            answer for you. And when you're ready to test what you've built you switch 
                            to duel mode and find out honestly where you stand.
                        </p>

                        <p style={prose}>
                            Ask Leet sits at the other end of that spectrum. It's a full AI assistant 
                            integrated directly into your practice session — capable of generating 
                            solutions, optimizing your code, and explaining approaches on demand. 
                            For learning new concepts that's genuinely useful. But for measuring 
                            whether your unassisted skills are where you want them to be it makes 
                            the answer harder to find, not easier.
                        </p>

                        <h2 style={h2}>What We Built Instead</h2>

                        <p style={prose}>
                            CodeDuel starts from a different premise. Instead of asking "how can AI help you
                            solve problems faster?" we asked "what happens when AI is your opponent instead
                            of your assistant?"
                        </p>

                        <p style={prose}>
                            Here's how a duel works. You and Claude receive the same coding problem simultaneously.
                            Both start working. You write your solution in a Monaco editor — the same editor
                            that powers VS Code — while Claude generates its solution via the Anthropic API
                            in real time. Both solutions run against the same hidden test cases in a sandboxed
                            execution environment. You're scored on three dimensions: correctness, code quality,
                            and speed. Claude explains its approach and gives you specific feedback on where
                            your solution differed.
                        </p>

                        <p style={prose}>
                            No AI assistance during the duel. Just you, the problem, and an extremely capable
                            opponent waiting to see what you come up with.
                        </p>

                        <p style={prose}>
                            Your ELO rating adjusts after every duel — up when you win, down when you lose,
                            with harder problems carrying more ELO stakes. After twenty duels you have an
                            honest number that tells you where your raw coding skills actually stand relative
                            to AI. Not where they stand with AI help. Where they stand on their own.
                        </p>

                        <h2 style={h2}>Why the Distinction Matters</h2>

                        <p style={prose}>
                            I'm not arguing that AI assistance is bad or that Ask Leet is a bad product.
                            It serves a real use case and LeetCode's team built it well.
                        </p>

                        <p style={prose}>
                            I'm arguing that there are two distinct developer needs right now and they require
                            different tools:
                        </p>

                        <p style={prose}>
                            The first need is learning to code faster and more productively with AI tools.
                            Ask Leet serves this. GitHub Copilot serves this. Claude Code serves this.
                            The entire industry is building for this need and doing it well.
                        </p>

                        <p style={prose}>
                            The second need is maintaining and measuring raw coding ability independently
                            of AI assistance. Almost nobody is building for this. CodeDuel is one of the
                            very few products that takes this need seriously.
                        </p>

                        <p style={prose}>
                            Why does the second need matter? Because technical interviews still largely
                            test unassisted problem-solving ability. Because there are situations where AI
                            tools aren't available — network outages, company restrictions, security
                            environments. Because the developers who understand what they're doing
                            at a fundamental level are better at directing AI tools than those who don't.
                            And because raw problem-solving ability is a skill that atrophies without practice,
                            regardless of how productive you are with AI assistance.
                        </p>

                        <h2 style={h2}>Two Tools for Two Different Goals</h2>

                        <p style={prose}>
                            The honest answer is that Ask Leet and CodeDuel aren't really competing.
                            They serve different goals and different moments in a developer's journey.
                        </p>

                        <p style={prose}>
                            Use Ask Leet when you're learning something new and want AI to help you
                            understand it. Use CodeDuel when you want to know honestly where your
                            unassisted skills stand and push yourself to improve them.
                        </p>

                        <p style={prose}>
                            Both are valuable. But in a world where every tool is adding AI assistance,
                            the tools that measure and develop what you can do without AI are
                            becoming more important, not less.
                        </p>

                        <p style={prose}>
                            The best developers of the next decade will be fluent with AI tools AND
                            capable without them. The first skill is being served by a wave of excellent
                            products. The second skill needs more attention.
                        </p>

                        <p style={prose}>
                            That's what CodeDuel is for.
                        </p>

                        <div style={{
                            background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`, borderRadius: 14,
                            padding: 32, textAlign: 'center', marginTop: 16, position: 'relative'
                        }}>
                            <div style={{ position: 'absolute', top: 6, left: 6, width: 16, height: 16, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` }} />
                            <div style={{ position: 'absolute', bottom: 6, right: 6, width: 16, height: 16, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` }} />

                            <p style={{ fontSize: 24, margin: '0 0 12px' }}>⚔️</p>
                            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                                Find out where your unassisted skills stand
                            </h3>
                            <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>
                                CodeDuel puts you head-to-head against Claude AI on real coding problems.
                                No hints. No assistance. Just your ELO rating at the end.
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

import Link from 'next/link';

const FEATURES = [
    {
        emoji: '⚔️',
        title: 'Real Competition',
        desc: 'You and Claude receive the same problem simultaneously. Both start coding. One wins.',
        free: true
    },
    {
        emoji: '📊',
        title: 'Scored on 3 Dimensions',
        desc: 'Correctness, speed, and code quality — the same way a real code review works.',
        free: true
    },
    {
        emoji: '📚',
        title: 'Learn From Claude',
        desc: 'After every duel Claude explains its approach and where your solution could improve.',
        free: true
    },
    {
        emoji: '🎯',
        title: 'ELO Rating System',
        desc: 'Your rating goes up when you win and down when you lose — just like chess.',
        free: false
    },
    {
        emoji: '🔍',
        title: 'Weak Spot Detection',
        desc: 'Your dashboard identifies which categories you consistently lose in and surfaces practice problems.',
        free: false
    },
    {
        emoji: '📈',
        title: 'Progress Dashboard',
        desc: 'Track your win rate, streak, ELO over time, and performance by difficulty and category.',
        free: false
    },
    {
        emoji: '🗂',
        title: 'All Problem Categories',
        desc: 'Arrays, Strings, Trees, Graphs, Dynamic Programming, and System Design.',
        free: false
    },
    {
        emoji: '⚡',
        title: 'Unlimited Duels',
        desc: 'Free tier is limited to 3 duels per day. Pro unlocks unlimited.',
        free: false
    }
];

const STEPS = [
    {
        step: '1',
        title: 'Pick a problem',
        desc: 'Choose from 20+ problems across 6 categories and 3 difficulty levels. New problems added regularly.'
    },
    {
        step: '2',
        title: 'Write your solution',
        desc: 'Code in the browser with a full VS Code-style editor. Python, JavaScript, and Java supported at launch.'
    },
    {
        step: '3',
        title: 'Submit and duel',
        desc: 'Hit submit and Claude races to solve the same problem. Both solutions run against the same test cases.'
    },
    {
        step: '4',
        title: 'See who won',
        desc: 'Results show scores side by side. Claude explains its approach so you actually learn something every time.'
    }
];

export default function LandingPage() {
    return (
        <main style={{
            fontFamily: 'Inter, sans-serif',
            background: 'radial-gradient(circle at 50% 0%, #0a1a0f, #0a0a0f)',
            minHeight: '100vh',
            color: 'white'
        }}>

            {/* Nav */}
            <nav style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 40px',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 22 }}>⚔️</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#00ff87' }}>CodeDuel</span>
                </div>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <a href="#features" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, textDecoration: 'none' }}>
                        Features
                    </a>
                    <a href="#how-it-works" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, textDecoration: 'none' }}>
                        How it works
                    </a>
                    <a href="#pricing" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, textDecoration: 'none' }}>
                        Pricing
                    </a>
                    <Link
                        href="/login"
                        style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, textDecoration: 'none' }}
                    >
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        style={{
                            background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                            color: '#000',
                            padding: '8px 18px',
                            borderRadius: 8,
                            fontSize: 14,
                            fontWeight: 700,
                            textDecoration: 'none'
                        }}
                    >
                        Start for free
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section style={{
                textAlign: 'center',
                padding: '100px 24px 80px',
                maxWidth: 780,
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'inline-block',
                    background: 'rgba(0,255,135,0.1)',
                    border: '1px solid rgba(0,255,135,0.25)',
                    borderRadius: 20,
                    padding: '6px 16px',
                    fontSize: 13,
                    color: '#00ff87',
                    marginBottom: 28
                }}>
                    The coding practice platform built for the AI era
                </div>

                <h1 style={{
                    fontSize: 56,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    margin: '0 0 24px',
                    background: 'linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.6))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Can you out-code<br />Claude AI?
                </h1>

                <p style={{
                    fontSize: 19,
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.7,
                    margin: '0 0 16px',
                    maxWidth: 560,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    CodeDuel puts you head-to-head against Claude on real coding problems.
                    Same problem. Same time. One winner.
                </p>

                <p style={{
                    fontSize: 15,
                    color: 'rgba(255,255,255,0.35)',
                    margin: '0 0 48px'
                }}>
                    Because the best way to stay sharp in the age of AI is to compete with it.
                </p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        href="/register"
                        style={{
                            background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                            color: '#000',
                            padding: '15px 36px',
                            borderRadius: 10,
                            fontSize: 16,
                            fontWeight: 800,
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}
                    >
                        Start Dueling — It's Free
                    </Link>
                      <a
                        href="#how-it-works"
                        style={{
                            background: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'white',
                            padding: '15px 36px',
                            borderRadius: 10,
                            fontSize: 16,
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}
                    >
                        See how it works
                    </a>
                </div>
            </section>

            {/* Social proof */}
            <section style={{
                textAlign: 'center',
                padding: '0 24px 80px',
                color: 'rgba(255,255,255,0.25)',
                fontSize: 13
            }}>
                Free to start · No credit card required · 3 duels per day on the free tier
            </section>

            {/* VS Banner */}
            <section style={{
                maxWidth: 700,
                margin: '0 auto 80px',
                padding: '0 24px'
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20,
                    padding: '40px',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: 24,
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <div>
                        <p style={{ fontSize: 40, margin: '0 0 12px' }}>👨‍💻</p>
                        <p style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px' }}>You</p>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: 0 }}>
                            Writing your solution in the browser
                        </p>
                    </div>

                    <div style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: '#00ff87',
                        padding: '0 16px'
                    }}>
                        VS
                    </div>

                    <div>
                        <p style={{ fontSize: 40, margin: '0 0 12px' }}>🤖</p>
                        <p style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px' }}>Claude AI</p>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: 0 }}>
                            Generating a solution in real time
                        </p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" style={{
                maxWidth: 720,
                margin: '0 auto',
                padding: '80px 24px',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: 38, fontWeight: 800, marginBottom: 16 }}>
                    How it works
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 60 }}>
                    A duel takes about 30 minutes. Results are instant.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 28, textAlign: 'left' }}>
                    {STEPS.map((s, i) => (
                        <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                            <div style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: 17,
                                color: '#000',
                                flexShrink: 0
                            }}>
                                {s.step}
                            </div>
                            <div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px' }}>{s.title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                                    {s.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" style={{
                maxWidth: 1000,
                margin: '0 auto',
                padding: '80px 24px'
            }}>
                <h2 style={{ textAlign: 'center', fontSize: 38, fontWeight: 800, marginBottom: 16 }}>
                    Everything you need to stay sharp
                </h2>
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 56, maxWidth: 500, margin: '0 auto 56px' }}>
                    Free to start. Upgrade when you want the full competitive experience.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: 16
                }}>
                    {FEATURES.map((f, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 14,
                            padding: '24px'
                        }}>
                            <p style={{ fontSize: 28, margin: '0 0 10px' }}>{f.emoji}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{f.title}</h3>
                                <span style={{
                                    fontSize: 9,
                                    fontWeight: 700,
                                    padding: '2px 7px',
                                    borderRadius: 20,
                                    background: f.free
                                        ? 'rgba(255,255,255,0.08)'
                                        : 'rgba(0,255,135,0.12)',
                                    color: f.free
                                        ? 'rgba(255,255,255,0.4)'
                                        : '#00ff87',
                                    border: f.free
                                        ? '1px solid rgba(255,255,255,0.08)'
                                        : '1px solid rgba(0,255,135,0.25)'
                                }}>
                                    {f.free ? 'FREE' : 'PRO'}
                                </span>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why CodeDuel */}
            <section style={{
                maxWidth: 800,
                margin: '0 auto',
                padding: '80px 24px'
            }}>
                <h2 style={{ textAlign: 'center', fontSize: 38, fontWeight: 800, marginBottom: 56 }}>
                    Why CodeDuel?
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {[
                        {
                            title: 'LeetCode',
                            desc: 'You vs. a timer. Designed for interview prep. No AI opponent. No learning from comparison.',
                            color: 'rgba(255,255,255,0.08)',
                            textColor: 'rgba(255,255,255,0.5)'
                        },
                        {
                            title: 'CodeDuel',
                            desc: 'You vs. Claude. Designed for staying sharp. Real competition. Learn from every duel.',
                            color: 'rgba(0,255,135,0.08)',
                            textColor: 'rgba(255,255,255,0.7)',
                            border: 'rgba(0,255,135,0.2)',
                            highlight: true
                        }
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: item.color,
                            border: `1px solid ${item.border || 'rgba(255,255,255,0.08)'}`,
                            borderRadius: 14,
                            padding: '24px'
                        }}>
                            <h3 style={{
                                fontSize: 17,
                                fontWeight: 800,
                                margin: '0 0 12px',
                                color: item.highlight ? '#00ff87' : 'rgba(255,255,255,0.6)'
                            }}>
                                {item.highlight ? '⚔️ ' : ''}{item.title}
                            </h3>
                            <p style={{ color: item.textColor, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 14,
                    padding: '24px',
                    marginTop: 16,
                    textAlign: 'center'
                }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        The best way to not be replaced by AI is to be better than it.
                        CodeDuel gives you a way to measure that — and close the gap.
                    </p>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" style={{
                maxWidth: 720,
                margin: '0 auto',
                padding: '80px 24px'
            }}>
                <h2 style={{ textAlign: 'center', fontSize: 38, fontWeight: 800, marginBottom: 16 }}>
                    Simple pricing
                </h2>
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 56 }}>
                    Start free. Upgrade when you want the full experience.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {/* Free */}
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 16,
                        padding: '32px 28px'
                    }}>
                        <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>Free</h3>
                        <p style={{ fontSize: 38, fontWeight: 900, margin: '0 0 4px' }}>$0</p>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: '0 0 28px' }}>Forever free</p>
                        {[
                            '3 duels per day',
                            'Arrays and Strings problems',
                            'Full Monaco editor',
                            'Claude solution comparison',
                            'Learn from every duel'
                        ].map((f, i) => (
                            <p key={i} style={{
                                color: 'rgba(255,255,255,0.65)',
                                fontSize: 13,
                                margin: '0 0 10px',
                                display: 'flex',
                                gap: 8,
                                alignItems: 'flex-start'
                            }}>
                                <span style={{ color: '#00ff87', flexShrink: 0 }}>✓</span> {f}
                            </p>
                        ))}
                        <Link
                            href="/register"
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                marginTop: 28,
                                padding: '12px',
                                borderRadius: 8,
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: 14,
                                fontWeight: 600
                            }}
                        >
                            Get started free
                        </Link>
                    </div>

                    {/* Pro */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(0,255,135,0.08), rgba(0,204,106,0.04))',
                        border: '1px solid rgba(0,255,135,0.25)',
                        borderRadius: 16,
                        padding: '32px 28px',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: -12,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                            color: '#000',
                            fontSize: 11,
                            fontWeight: 800,
                            padding: '4px 14px',
                            borderRadius: 20,
                            whiteSpace: 'nowrap'
                        }}>
                            MOST POPULAR
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>Pro</h3>
                        <p style={{ fontSize: 38, fontWeight: 900, margin: '0 0 4px' }}>
                            $9<span style={{ fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>/month</span>
                        </p>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: '0 0 28px' }}>
                            7-day free trial — no credit card required
                        </p>
                        {[
                            'Everything in Free',
                            'Unlimited duels',
                            'All 6 problem categories',
                            'ELO rating system',
                            'Progress dashboard',
                            'Weak spot detection',
                            'Performance analytics',
                            'New problems added weekly'
                        ].map((f, i) => (
                            <p key={i} style={{
                                color: 'rgba(255,255,255,0.65)',
                                fontSize: 13,
                                margin: '0 0 10px',
                                display: 'flex',
                                gap: 8,
                                alignItems: 'flex-start'
                            }}>
                                <span style={{ color: '#00ff87', flexShrink: 0 }}>✓</span> {f}
                            </p>
                        ))}
                        <Link
                            href="/register"
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                marginTop: 28,
                                padding: '12px',
                                borderRadius: 8,
                                border: 'none',
                                background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                                color: '#000',
                                textDecoration: 'none',
                                fontSize: 14,
                                fontWeight: 800
                            }}
                        >
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{
                textAlign: 'center',
                padding: '80px 24px 100px',
                maxWidth: 600,
                margin: '0 auto'
            }}>
                <h2 style={{ fontSize: 38, fontWeight: 800, marginBottom: 16 }}>
                    Ready to find out?
                </h2>
                <p style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 16,
                    marginBottom: 40,
                    lineHeight: 1.7
                }}>
                    Every developer using AI tools wonders if their raw skills are slipping.
                    CodeDuel gives you an honest answer — and a way to improve.
                </p>
                <Link
                    href="/register"
                    style={{
                        background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                        color: '#000',
                        padding: '16px 44px',
                        borderRadius: 10,
                        fontSize: 16,
                        fontWeight: 800,
                        textDecoration: 'none',
                        display: 'inline-block'
                    }}
                >
                    Start Dueling — It's Free
                </Link>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, marginTop: 16 }}>
                    No credit card required · 3 free duels per day
                </p>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '32px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>⚔️</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
                        © {new Date().getFullYear()} CodeDuel. All rights reserved.
                    </span>
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                    <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'none' }}>
                        Privacy Policy
                    </Link>
                    <Link href="/terms" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'none' }}>
                        Terms of Service
                    </Link>
                </div>
            </footer>
        </main>
    );
}
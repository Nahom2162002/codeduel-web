'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(75% 0.15 220 / 0.18)';
const BLUE_BORDER = 'oklch(75% 0.15 220 / 0.5)';
const ORANGE_BG = 'oklch(75% 0.15 55 / 0.18)';
const NEUTRAL_BG = 'oklch(40% 0.02 260 / 0.4)';
const NEUTRAL = 'oklch(85% 0.02 260)';

interface DuelResult {
    result: 'win' | 'loss' | 'draw';
    userScore: number;
    aiScore: number;
    userTestsPassed: number;
    aiTestsPassed: number;
    totalTests: number;
    userTime: number;
    aiTime: number;
    userCode: string;
    aiCode: string;
    aiExplanation: string;
    aiApproach: string;
    eloChange: number;
    newElo: number;
    problemId: {
        _id: string,
        title: string;
        difficulty: string;
        category: string;
    };
    language: string;
}

const RESULT_CONFIG = {
    win: { emoji: '🏆', label: 'You Won!', color: BLUE, bg: BLUE_BG, border: BLUE_BORDER },
    loss: { emoji: '🤖', label: 'Claude Won', color: ORANGE, bg: ORANGE_BG, border: 'oklch(75% 0.15 55 / 0.5)' },
    draw: { emoji: '🤝', label: "It's a Draw!", color: NEUTRAL, bg: NEUTRAL_BG, border: 'oklch(50% 0.02 260 / 0.5)' }
};

function DuelIcon({ size = 22 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function ResultsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [duel, setDuel] = useState<DuelResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'learn'>('overview');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        fetch(`/api/duels/${id}`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(async res => {
                if (res.status === 401) {
                    localStorage.removeItem('token');
                    router.push('/login');
                    return null;
                }
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data?.error || 'Failed to load results');
                }
                return data;
            })
            .then(data => {
                if (data) setDuel(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message);
                setLoading(false);
            });

        fetch('/api/user/me', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => { if (data.username) setUsername(data.username); })
            .catch(() => {});
    }, [id]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    const initials = username.slice(0, 2).toUpperCase() || '?';

    const nav = (
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
                <Link href="/problems" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', textDecoration: 'none', color: 'oklch(96% 0.01 260)' }}>
                    <DuelIcon />
                    CodeDuel
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 15, fontWeight: 500 }}>
                    <Link href="/problems" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Problems</Link>
                    <Link href="/dashboard" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Dashboard</Link>
                </div>
            </div>
            {username && (
                <button
                    onClick={handleLogout}
                    title="Log out"
                    className={jetbrainsMono.className}
                    style={{
                        width: 36, height: 36, borderRadius: '50%', background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: BLUE, cursor: 'pointer'
                    }}
                >
                    {initials}
                </button>
            )}
        </nav>
    );

    if (loading) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading results...
        </div>
    );

    if (error || !duel) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
            <div style={{ color: 'oklch(65% 0.02 260)' }}>{error || 'Results not found.'}</div>
            <Link href="/problems" style={{ color: BLUE, textDecoration: 'none' }}>← Back to Problems</Link>
        </div>
    );

    const config = RESULT_CONFIG[duel.result];
    const formatTime = (s: number) => s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;

    return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
            {nav}

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px 100px' }}>

                <div style={{ background: config.bg, border: `1px solid ${config.border}`, borderRadius: 12, padding: 32, textAlign: 'center', marginBottom: 32, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 6, left: 6, width: 16, height: 16, borderTop: `2px solid ${config.color}`, borderLeft: `2px solid ${config.color}` }} />
                    <div style={{ position: 'absolute', bottom: 6, right: 6, width: 16, height: 16, borderBottom: `2px solid ${config.color}`, borderRight: `2px solid ${config.color}` }} />
                    <p style={{ fontSize: 56, margin: '0 0 8px' }}>{config.emoji}</p>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: config.color, margin: '0 0 8px' }}>
                        {config.label}
                    </h1>
                    <p style={{ color: 'oklch(65% 0.02 260)', fontSize: 15, margin: '0 0 16px' }}>
                        {duel.problemId?.title} — <span style={{ textTransform: 'capitalize' }}>{duel.problemId?.difficulty}</span>
                    </p>
                    <div className={jetbrainsMono.className} style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: duel.eloChange >= 0 ? BLUE : ORANGE, fontWeight: 700 }}>
                            {duel.eloChange >= 0 ? '+' : ''}{duel.eloChange} ELO
                        </span>
                        <span style={{ color: 'oklch(55% 0.02 260)', fontSize: 13 }}>
                            → {duel.newElo} ELO
                        </span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, marginBottom: 32, alignItems: 'center' }}>
                    <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                        <p className={jetbrainsMono.className} style={{ color: 'oklch(60% 0.02 260)', fontSize: 12, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>You</p>
                        <p className={pressStart2P.className} style={{ fontSize: 32, color: BLUE, margin: '0 0 12px' }}>{duel.userScore}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                <span style={{ color: 'oklch(60% 0.02 260)' }}>Tests passed</span>
                                <span>{duel.userTestsPassed}/{duel.totalTests}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                <span style={{ color: 'oklch(60% 0.02 260)' }}>Time</span>
                                <span>{formatTime(duel.userTime)}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ fontSize: 20, fontWeight: 700, color: 'oklch(55% 0.02 260)', textAlign: 'center' }}>VS</div>

                    <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                        <p className={jetbrainsMono.className} style={{ color: 'oklch(60% 0.02 260)', fontSize: 12, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Claude</p>
                        <p className={pressStart2P.className} style={{ fontSize: 32, color: ORANGE, margin: '0 0 12px' }}>{duel.aiScore}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                <span style={{ color: 'oklch(60% 0.02 260)' }}>Tests passed</span>
                                <span>{duel.aiTestsPassed}/{duel.totalTests}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                <span style={{ color: 'oklch(60% 0.02 260)' }}>Time</span>
                                <span>{formatTime(Math.round(duel.aiTime))}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'oklch(21% 0.02 260)', padding: 4, borderRadius: 10 }}>
                    {(['overview', 'code', 'learn'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={spaceGrotesk.className}
                            style={{
                                flex: 1, padding: 8, borderRadius: 8, border: 'none',
                                background: activeTab === tab ? BLUE : 'transparent',
                                color: activeTab === tab ? 'oklch(16% 0.02 260)' : 'oklch(65% 0.02 260)',
                                fontSize: 13, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize'
                            }}
                        >
                            {tab === 'overview' ? '📊 Overview' : tab === 'code' ? '💻 Code' : '📚 Learn'}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 24 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Claude's Assessment</h3>
                        <p style={{ color: 'oklch(80% 0.02 260)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{duel.aiExplanation}</p>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid oklch(30% 0.02 260)', fontSize: 13, fontWeight: 600 }}>
                                👤 Your Solution
                            </div>
                            <pre className={jetbrainsMono.className} style={{ padding: 16, margin: 0, fontSize: 13, color: 'oklch(80% 0.02 260)', overflowX: 'auto', lineHeight: 1.6 }}>
                                {duel.userCode}
                            </pre>
                        </div>

                        <div style={{ background: 'oklch(21% 0.02 260)', border: `1px solid ${ORANGE_BG}`, borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid oklch(30% 0.02 260)', fontSize: 13, fontWeight: 600, color: ORANGE }}>
                                🤖 Claude's Solution
                            </div>
                            <pre className={jetbrainsMono.className} style={{ padding: 16, margin: 0, fontSize: 13, color: 'oklch(80% 0.02 260)', overflowX: 'auto', lineHeight: 1.6 }}>
                                {duel.aiCode}
                            </pre>
                        </div>
                    </div>
                )}

                {activeTab === 'learn' && (
                    <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 24 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Claude's Approach</h3>
                        <p style={{ color: 'oklch(80% 0.02 260)', fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{duel.aiApproach}</p>
                    </div>
                )}

                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <Link
                        href="/problems"
                        style={{
                            flex: 1, padding: 12, borderRadius: 8, border: '1px solid oklch(32% 0.02 260)',
                            background: 'transparent', color: 'oklch(80% 0.02 260)', fontSize: 14, fontWeight: 600,
                            textAlign: 'center', textDecoration: 'none'
                        }}
                    >
                        ← Back to Problems
                    </Link>
                    <Link
                        href={`/duel/${duel.problemId?._id}`}
                        style={{
                            flex: 1, padding: 12, borderRadius: 8, border: 'none', background: BLUE,
                            color: 'oklch(16% 0.02 260)', fontSize: 14, fontWeight: 700, textAlign: 'center', textDecoration: 'none'
                        }}
                    >
                        🔄 Rematch
                    </Link>
                </div>
            </div>
        </div>
    );
}

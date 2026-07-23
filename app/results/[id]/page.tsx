'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

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
    win: { emoji: '🏆', label: 'You Won!', color: '#00ff87', bg: 'rgba(0,255,135,0.08)', border: 'rgba(0,255,135,0.2)' },
    loss: { emoji: '🤖', label: 'Claude Won', color: '#ff4d4d', bg: 'rgba(255,77,77,0.08)', border: 'rgba(255,77,77,0.2)' },
    draw: { emoji: '🤝', label: 'It\'s a Draw!', color: '#ffd93d', bg: 'rgba(255,217,61,0.08)', border: 'rgba(255,217,61,0.2)' }
};

export default function ResultsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [duel, setDuel] = useState<DuelResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'learn'>('overview');

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
    }, [id]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'var(--text-muted)' }}>Loading results...</div>
        </div>
    );

    if (error || !duel) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
            <div style={{ color: 'var(--text-muted)' }}>{error || 'Results not found.'}</div>
            <Link href="/problems" style={{ color: 'var(--green)' }}>← Back to Problems</Link>
        </div>
    );

    const config = RESULT_CONFIG[duel.result];
    const formatTime = (s: number) => s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <Navbar />

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

                {/* Result banner */}
                <div style={{
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                    borderRadius: 16,
                    padding: '32px',
                    textAlign: 'center',
                    marginBottom: 32,
                    animation: 'fadeInUp 0.5s ease-out'
                }}>
                    <p style={{ fontSize: 56, margin: '0 0 8px' }}>{config.emoji}</p>
                    <h1 style={{ fontSize: 32, fontWeight: 800, color: config.color, margin: '0 0 8px' }}>
                        {config.label}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: '0 0 16px' }}>
                        {duel.problemId?.title} — <span style={{ textTransform: 'capitalize' }}>{duel.problemId?.difficulty}</span>
                    </p>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <span style={{
                            fontSize: 13,
                            color: duel.eloChange >= 0 ? 'var(--win)' : 'var(--loss)',
                            fontWeight: 700
                        }}>
                            {duel.eloChange >= 0 ? '+' : ''}{duel.eloChange} ELO
                        </span>
                        <span style={{ color: 'var(--text-subtle)', fontSize: 13 }}>
                            → {duel.newElo} ELO
                        </span>
                    </div>
                </div>

                {/* Score comparison */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: 16,
                    marginBottom: 32,
                    alignItems: 'center'
                }}>
                    {/* User score */}
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 12,
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            You
                        </p>
                        <p style={{ fontSize: 40, fontWeight: 800, color: 'white', margin: '0 0 12px' }}>
                            {duel.userScore}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                <span style={{ color: 'var(--text-subtle)' }}>Tests passed</span>
                                <span style={{ color: 'white' }}>{duel.userTestsPassed}/{duel.totalTests}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                <span style={{ color: 'var(--text-subtle)' }}>Time</span>
                                <span style={{ color: 'white' }}>{formatTime(duel.userTime)}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-subtle)', textAlign: 'center' }}>
                        VS
                    </div>

                    {/* AI score */}
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 12,
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Claude
                        </p>
                        <p style={{ fontSize: 40, fontWeight: 800, color: 'white', margin: '0 0 12px' }}>
                            {duel.aiScore}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                <span style={{ color: 'var(--text-subtle)' }}>Tests passed</span>
                                <span style={{ color: 'white' }}>{duel.aiTestsPassed}/{duel.totalTests}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                <span style={{ color: 'var(--text-subtle)' }}>Time</span>
                                <span style={{ color: 'white' }}>{formatTime(Math.round(duel.aiTime))}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--surface)', padding: 4, borderRadius: 10 }}>
                    {(['overview', 'code', 'learn'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: 8,
                                border: 'none',
                                background: activeTab === tab
                                    ? 'linear-gradient(135deg, #00ff87, #00cc6a)'
                                    : 'transparent',
                                color: activeTab === tab ? '#000' : 'var(--text-muted)',
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: 'pointer',
                                textTransform: 'capitalize'
                            }}
                        >
                            {tab === 'overview' ? '📊 Overview' : tab === 'code' ? '💻 Code' : '📚 Learn'}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                {activeTab === 'overview' && (
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 12,
                        padding: '24px'
                    }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>
                            Claude's Assessment
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                            {duel.aiExplanation}
                        </p>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 12,
                            overflow: 'hidden'
                        }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 600 }}>
                                👤 Your Solution
                            </div>
                            <pre style={{
                                padding: '16px',
                                margin: 0,
                                fontSize: 13,
                                color: 'var(--text-muted)',
                                overflowX: 'auto',
                                fontFamily: 'JetBrains Mono, monospace',
                                lineHeight: 1.6
                            }}>
                                {duel.userCode}
                            </pre>
                        </div>

                        <div style={{
                            background: 'var(--surface)',
                            border: '1px solid rgba(0,255,135,0.2)',
                            borderRadius: 12,
                            overflow: 'hidden'
                        }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>
                                🤖 Claude's Solution
                            </div>
                            <pre style={{
                                padding: '16px',
                                margin: 0,
                                fontSize: 13,
                                color: 'var(--text-muted)',
                                overflowX: 'auto',
                                fontFamily: 'JetBrains Mono, monospace',
                                lineHeight: 1.6
                            }}>
                                {duel.aiCode}
                            </pre>
                        </div>
                    </div>
                )}

                {activeTab === 'learn' && (
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 12,
                        padding: '24px'
                    }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>
                            Claude's Approach
                        </h3>
                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: 14,
                            lineHeight: 1.7,
                            margin: 0,
                            whiteSpace: 'pre-wrap'
                        }}>
                            {duel.aiApproach}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <Link
                        href="/problems"
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            fontSize: 14,
                            fontWeight: 600,
                            textAlign: 'center'
                        }}
                    >
                        ← Back to Problems
                    </Link>
                    <Link
                        href={`/duel/${duel.problemId?._id}`}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: 8,
                            border: 'none',
                            background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                            color: '#000',
                            fontSize: 14,
                            fontWeight: 700,
                            textAlign: 'center'
                        }}
                    >
                        🔄 Rematch
                    </Link>
                </div>
            </div>
        </div>
    );
}
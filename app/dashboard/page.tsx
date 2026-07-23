'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, LineChart, Line,
    RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import Navbar from '../components/Navbar';

interface Stats {
    stats: {
        wins: number;
        losses: number;
        draws: number;
        currentStreak: number;
        bestStreak: number;
        totalDuels: number;
        eloRating: number;
    };
    categoryStats: Record<string, { wins: number; losses: number; draws: number }>;
    difficultyStats: Record<string, { wins: number; total: number }>;
    last7Days: { date: string; duels: number; wins: number }[];
    weakCategories: string[];
    strongCategories: string[];
    recentDuels: {
        _id: string;
        result: 'win' | 'loss' | 'draw';
        userScore: number;
        aiScore: number;
        eloChange: number;
        completedAt: string;
        language: string;
        problemId: { title: string; difficulty: string; category: string };
    }[];
}

const RESULT_COLORS = { win: '#00ff87', loss: '#ff4d4d', draw: '#ffd93d' };
const RESULT_EMOJI = { win: '🏆', loss: '🤖', draw: '🤝' };

const CATEGORY_LABELS: Record<string, string> = {
    arrays: 'Arrays',
    strings: 'Strings',
    trees: 'Trees',
    graphs: 'Graphs',
    'dynamic-programming': 'Dynamic Programming',
    'system-design': 'System Design'
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: '#1a1a26',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: 12
            }}>
                <p style={{ color: 'white', margin: '0 0 4px', fontWeight: 600 }}>{label}</p>
                {payload.map((p: any, i: number) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0' }}>
                        {p.name}: {p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        Promise.all([
            fetch('/api/user/stats', {
                headers: { authorization: `Bearer ${token}` }
            }).then(res => res.json()),
            fetch('/api/user/me', {
                headers: { authorization: `Bearer ${token}` }
            }).then(res => res.json())
        ]).then(([statsData, userData]) => {
            if (statsData.error) { setError(statsData.error); }
            else { setStats(statsData); }
            if (userData.username) setUsername(userData.username);
            setLoading(false);
        }).catch(() => {
            setError('Failed to load dashboard');
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'var(--text-muted)' }}>Loading dashboard...</div>
        </div>
    );

    if (error) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'var(--loss)' }}>{error}</div>
        </div>
    );

    if (!stats) return null;

    const { wins, losses, draws, currentStreak, bestStreak, totalDuels, eloRating } = stats.stats;
    const winRate = totalDuels > 0 ? Math.round((wins / totalDuels) * 100) : 0;

    // Radar chart data for categories
    const radarData = Object.entries(stats.categoryStats).map(([cat, s]) => {
        const total = s.wins + s.losses + s.draws;
        return {
            category: CATEGORY_LABELS[cat] || cat,
            winRate: total > 0 ? Math.round((s.wins / total) * 100) : 0
        };
    });

    // Difficulty win rates
    const difficultyData = Object.entries(stats.difficultyStats).map(([diff, s]) => ({
        difficulty: diff.charAt(0).toUpperCase() + diff.slice(1),
        winRate: s.total > 0 ? Math.round((s.wins / s.total) * 100) : 0,
        total: s.total
    }));

    const DIFF_COLORS: Record<string, string> = {
        Easy: '#00ff87',
        Medium: '#ffd93d',
        Hard: '#ff4d4d'
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <Navbar />

            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>

                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 4px' }}>
                        {username}'s Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                        Your CodeDuel performance at a glance
                    </p>
                </div>

                {/* ELO and key stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: 16,
                    marginBottom: 32
                }}>
                    {/* ELO */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(0,255,135,0.1), rgba(0,204,106,0.05))',
                        border: '1px solid rgba(0,255,135,0.2)',
                        borderRadius: 16,
                        padding: '20px',
                        textAlign: 'center',
                        gridColumn: 'span 2'
                    }}>
                        <p style={{ color: 'var(--green)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                            ELO Rating
                        </p>
                        <p style={{ fontSize: 48, fontWeight: 900, color: 'var(--green)', margin: '0 0 4px', lineHeight: 1 }}>
                            {eloRating}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: 0 }}>
                            {eloRating >= 1200 ? '🔥 Expert' : eloRating >= 1100 ? '⚡ Advanced' : eloRating >= 1000 ? '💪 Intermediate' : '🌱 Beginner'}
                        </p>
                    </div>

                    {[
                        { label: 'Win Rate', value: `${winRate}%`, sub: `${wins}W ${losses}L ${draws}D` },
                        { label: 'Total Duels', value: totalDuels, sub: 'vs Claude' },
                        { label: 'Current Streak', value: `${currentStreak}🔥`, sub: `Best: ${bestStreak}` },
                        { label: 'Wins', value: wins, color: 'var(--win)' },
                        { label: 'Losses', value: losses, color: 'var(--loss)' },
                        { label: 'Draws', value: draws, color: 'var(--draw)' },
                    ].map((stat, i) => (
                        <div key={i} style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 12,
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                                {stat.label}
                            </p>
                            <p style={{ fontSize: 28, fontWeight: 800, color: stat.color || 'white', margin: '0 0 4px', lineHeight: 1 }}>
                                {stat.value}
                            </p>
                            {stat.sub && (
                                <p style={{ color: 'var(--text-subtle)', fontSize: 11, margin: 0 }}>
                                    {stat.sub}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Weak and strong categories */}
                {(stats.weakCategories.length > 0 || stats.strongCategories.length > 0) && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                        {stats.weakCategories.length > 0 && (
                            <div style={{
                                background: 'rgba(255,77,77,0.06)',
                                border: '1px solid rgba(255,77,77,0.2)',
                                borderRadius: 12,
                                padding: '16px 20px'
                            }}>
                                <p style={{ color: 'var(--loss)', fontSize: 12, fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    ⚠️ Needs Work
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {stats.weakCategories.map(cat => (
                                        <Link
                                            key={cat}
                                            href={`/problems?category=${cat}`}
                                            style={{
                                                padding: '4px 10px',
                                                borderRadius: 20,
                                                background: 'rgba(255,77,77,0.15)',
                                                color: 'var(--loss)',
                                                fontSize: 12,
                                                fontWeight: 600
                                            }}
                                        >
                                            {CATEGORY_LABELS[cat] || cat}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {stats.strongCategories.length > 0 && (
                            <div style={{
                                background: 'rgba(0,255,135,0.06)',
                                border: '1px solid rgba(0,255,135,0.2)',
                                borderRadius: 12,
                                padding: '16px 20px'
                            }}>
                                <p style={{ color: 'var(--green)', fontSize: 12, fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    ✅ Strong Areas
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {stats.strongCategories.map(cat => (
                                        <span
                                            key={cat}
                                            style={{
                                                padding: '4px 10px',
                                                borderRadius: 20,
                                                background: 'rgba(0,255,135,0.15)',
                                                color: 'var(--green)',
                                                fontSize: 12,
                                                fontWeight: 600
                                            }}
                                        >
                                            {CATEGORY_LABELS[cat] || cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Charts row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>

                    {/* Last 7 days activity */}
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 16,
                        padding: '20px'
                    }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 20px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Last 7 Days
                        </h3>
                        {stats.last7Days.every(d => d.duels === 0) ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-subtle)', fontSize: 13 }}>
                                No duels yet — start competing!
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={180}>
                                <BarChart data={stats.last7Days}>
                                    <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                                    <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} allowDecimals={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="wins" name="Wins" fill="#00ff87" radius={[4, 4, 0, 0]} stackId="a" />
                                    <Bar dataKey="duels" name="Total" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} stackId="b" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Win rate by difficulty */}
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 16,
                        padding: '20px'
                    }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 20px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Win Rate by Difficulty
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
                            {difficultyData.map(d => (
                                <div key={d.difficulty}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ color: DIFF_COLORS[d.difficulty] || 'white', fontSize: 13, fontWeight: 600 }}>
                                            {d.difficulty}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                                            {d.winRate}% ({d.total} duels)
                                        </span>
                                    </div>
                                    <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4 }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${d.winRate}%`,
                                            background: DIFF_COLORS[d.difficulty] || '#fff',
                                            borderRadius: 4,
                                            transition: 'width 0.5s ease'
                                        }} />
                                    </div>
                                </div>
                            ))}
                            {difficultyData.every(d => d.total === 0) && (
                                <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-subtle)', fontSize: 13 }}>
                                    Complete some duels to see your stats
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category radar */}
                {radarData.length > 0 && radarData.some(d => d.winRate > 0) && (
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 16,
                        padding: '20px',
                        marginBottom: 32
                    }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Category Win Rates
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                                <PolarAngleAxis
                                    dataKey="category"
                                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                                />
                                <Radar
                                    name="Win Rate"
                                    dataKey="winRate"
                                    stroke="#00ff87"
                                    fill="#00ff87"
                                    fillOpacity={0.15}
                                />
                                <Tooltip content={<CustomTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Recent duels */}
                <div style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '20px',
                    marginBottom: 32
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Recent Duels
                        </h3>
                        <Link href="/problems" style={{ color: 'var(--green)', fontSize: 13 }}>
                            New duel →
                        </Link>
                    </div>

                    {stats.recentDuels.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-subtle)', fontSize: 13 }}>
                            No duels yet — <Link href="/problems" style={{ color: 'var(--green)' }}>start your first duel</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {stats.recentDuels.map(duel => (
                                <Link
                                    key={duel._id}
                                    href={`/results/${duel._id}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        background: 'var(--surface2)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 10,
                                        textDecoration: 'none',
                                        transition: 'border-color 0.15s'
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,255,135,0.2)')}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 18 }}>
                                            {RESULT_EMOJI[duel.result]}
                                        </span>
                                        <div>
                                            <p style={{ color: 'white', fontSize: 13, fontWeight: 600, margin: '0 0 2px' }}>
                                                {duel.problemId?.title || 'Unknown Problem'}
                                            </p>
                                            <p style={{ color: 'var(--text-subtle)', fontSize: 11, margin: 0, textTransform: 'capitalize' }}>
                                                {duel.language} · {duel.problemId?.difficulty} · {duel.problemId?.category?.replace('-', ' ')}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, textAlign: 'right' }}>
                                        <div>
                                            <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>
                                                {duel.userScore} vs {duel.aiScore}
                                            </p>
                                            <p style={{
                                                fontSize: 11,
                                                margin: 0,
                                                color: duel.eloChange >= 0 ? 'var(--win)' : 'var(--loss)',
                                                fontWeight: 600
                                            }}>
                                                {duel.eloChange >= 0 ? '+' : ''}{duel.eloChange} ELO
                                            </p>
                                        </div>
                                        <span style={{
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: RESULT_COLORS[duel.result],
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.06em'
                                        }}>
                                            {duel.result}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick actions */}
                <div style={{ display: 'flex', gap: 12 }}>
                    <Link
                        href="/problems"
                        style={{
                            flex: 1,
                            padding: '14px',
                            borderRadius: 10,
                            border: 'none',
                            background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                            color: '#000',
                            fontSize: 14,
                            fontWeight: 700,
                            textAlign: 'center'
                        }}
                    >
                        ⚔️ Start New Duel
                    </Link>
                    {stats.weakCategories.length > 0 && (
                        <Link
                            href={`/problems?category=${stats.weakCategories[0]}`}
                            style={{
                                flex: 1,
                                padding: '14px',
                                borderRadius: 10,
                                border: '1px solid rgba(255,77,77,0.3)',
                                background: 'rgba(255,77,77,0.08)',
                                color: 'var(--loss)',
                                fontSize: 14,
                                fontWeight: 700,
                                textAlign: 'center'
                            }}
                        >
                            🎯 Practice Weak Spots
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
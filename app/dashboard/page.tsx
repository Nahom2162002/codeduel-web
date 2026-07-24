'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(75% 0.15 220 / 0.18)';
const ORANGE_BG = 'oklch(75% 0.15 55 / 0.18)';
const NEUTRAL_BG = 'oklch(40% 0.02 260 / 0.4)';
const NEUTRAL = 'oklch(85% 0.02 260)';

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

const CATEGORY_LABELS: Record<string, string> = {
    arrays: 'Arrays',
    strings: 'Strings',
    trees: 'Trees',
    graphs: 'Graphs',
    'dynamic-programming': 'Dynamic Programming',
    'system-design': 'System Design'
};

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (loading) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading dashboard...
        </div>
    );

    if (error) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {error}
        </div>
    );

    if (!stats) return null;

    const { wins, losses, draws, currentStreak, totalDuels, eloRating } = stats.stats;
    const winRate = totalDuels > 0 ? Math.round((wins / totalDuels) * 100) : 0;

    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const eloThisWeek = stats.recentDuels
        .filter(d => new Date(d.completedAt).getTime() >= oneWeekAgo)
        .reduce((sum, d) => sum + d.eloChange, 0);

    // Reconstruct recent ELO history from current rating + each duel's eloChange
    const recentForChart = stats.recentDuels.slice(0, 8);
    const eloAfterEachDuel: number[] = [];
    let running = eloRating;
    for (let i = 0; i < recentForChart.length; i++) {
        eloAfterEachDuel.push(running);
        running -= recentForChart[i].eloChange;
    }
    const chartPoints = eloAfterEachDuel.slice().reverse(); // oldest -> newest
    const maxElo = Math.max(...chartPoints, 0);
    const minElo = Math.min(...chartPoints, 0);
    const chartBars = chartPoints.map((v, i) => ({
        height: `${10 + ((v - minElo) / (maxElo - minElo || 1)) * 90}%`,
        label: `D${i + 1}`
    }));

    const weakSpots = stats.weakCategories
        .map(cat => {
            const s = stats.categoryStats[cat] || { wins: 0, losses: 0, draws: 0 };
            const total = s.wins + s.losses + s.draws;
            const lossRate = total > 0 ? Math.round((s.losses / total) * 100) : 0;
            return { category: CATEGORY_LABELS[cat] || cat, lossRate };
        })
        .sort((a, b) => b.lossRate - a.lossRate)
        .slice(0, 4);

    const stat = (label: string, value: string | number, sub: string, accent: string) => ({ label, value, sub, accent });
    const statCards = [
        stat('ELO Rating', eloRating.toLocaleString(), `${eloThisWeek >= 0 ? '+' : ''}${eloThisWeek} this week`, BLUE),
        stat('Win Rate', `${winRate}%`, `${wins}W – ${losses}L${draws > 0 ? ` – ${draws}D` : ''}`, ORANGE),
        stat('Current Streak', String(currentStreak), currentStreak > 0 ? 'Wins in a row' : 'No active streak', BLUE),
        stat('Duels Played', String(totalDuels), 'All time', ORANGE),
    ];

    const initials = username.slice(0, 2).toUpperCase() || '?';

    return (
        <div className={spaceGrotesk.className} style={{ background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', minHeight: '100vh' }}>
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: 1280, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
                    <Link href="/problems" style={{
                        display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20,
                        letterSpacing: '-0.02em', textDecoration: 'none', color: 'oklch(96% 0.01 260)'
                    }}>
                        <DuelIcon />
                        CodeDuel
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 15, fontWeight: 500 }}>
                        <Link href="/problems" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Problems</Link>
                        <Link href="/dashboard" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none', borderBottom: `2px solid ${BLUE}`, paddingBottom: 4 }}>Dashboard</Link>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    title="Log out"
                    className={jetbrainsMono.className}
                    style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: BLUE_BG, border: `1px solid oklch(75% 0.15 220 / 0.5)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700, color: BLUE, cursor: 'pointer'
                    }}
                >
                    {initials}
                </button>
            </nav>

            <main style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 48px 100px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
                    <div>
                        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                            Welcome back, {username}
                        </h1>
                        <p style={{ fontSize: 15, color: 'oklch(65% 0.02 260)', margin: 0 }}>
                            Here's how you've been stacking up against Claude.
                        </p>
                    </div>
                    <Link href="/problems" style={{
                        background: BLUE, color: 'oklch(16% 0.02 260)', padding: '12px 22px', borderRadius: 8,
                        textDecoration: 'none', fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap'
                    }}>
                        Start a Duel
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
                    {statCards.map((s, i) => (
                        <div key={i} style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 24, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 4, left: 4, width: 12, height: 12, borderTop: `2px solid ${s.accent}`, borderLeft: `2px solid ${s.accent}` }} />
                            <div style={{ position: 'absolute', bottom: 4, right: 4, width: 12, height: 12, borderBottom: `2px solid ${s.accent}`, borderRight: `2px solid ${s.accent}` }} />
                            <div className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(60% 0.02 260)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {s.label}
                            </div>
                            <div className={pressStart2P.className} style={{ fontSize: 24, color: s.accent }}>
                                {s.value}
                            </div>
                            <div style={{ fontSize: 13, color: 'oklch(60% 0.02 260)', marginTop: 8 }}>
                                {s.sub}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, marginBottom: 40 }}>
                    <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 28 }}>
                        <h2 style={{ fontSize: 17, margin: '0 0 20px', fontWeight: 600 }}>ELO Progress</h2>
                        {chartBars.length === 0 ? (
                            <div className={jetbrainsMono.className} style={{ textAlign: 'center', padding: '40px 0', color: 'oklch(55% 0.02 260)', fontSize: 13 }}>
                                No duels yet — start competing!
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
                                {chartBars.map((b, i) => (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                                        <div style={{ width: '100%', height: b.height, background: BLUE_BG, borderTop: `2px solid ${BLUE}`, borderRadius: '3px 3px 0 0' }} />
                                        <div className={jetbrainsMono.className} style={{ fontSize: 10, color: 'oklch(55% 0.02 260)' }}>{b.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 28 }}>
                        <h2 style={{ fontSize: 17, margin: '0 0 4px', fontWeight: 600 }}>Weak Spot Detection</h2>
                        <p style={{ fontSize: 13, color: 'oklch(60% 0.02 260)', margin: '0 0 20px' }}>
                            Categories you lose in most often
                        </p>
                        {weakSpots.length === 0 ? (
                            <div className={jetbrainsMono.className} style={{ textAlign: 'center', padding: '20px 0', color: 'oklch(55% 0.02 260)', fontSize: 13 }}>
                                No weak spots detected yet — keep dueling!
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {weakSpots.map((w, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 6 }}>
                                            <span>{w.category}</span>
                                            <span className={jetbrainsMono.className} style={{ color: ORANGE }}>{w.lossRate}%</span>
                                        </div>
                                        <div style={{ height: 6, background: 'oklch(30% 0.02 260)', borderRadius: 999, overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${w.lossRate}%`, background: ORANGE }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h2 style={{ fontSize: 17, margin: 0, fontWeight: 600 }}>Recent Duels</h2>
                        <Link href="/problems" style={{ color: BLUE, fontSize: 13, textDecoration: 'none' }}>New duel →</Link>
                    </div>

                    {stats.recentDuels.length === 0 ? (
                        <div className={jetbrainsMono.className} style={{ textAlign: 'center', padding: '32px 0', color: 'oklch(55% 0.02 260)', fontSize: 13 }}>
                            No duels yet — <Link href="/problems" style={{ color: BLUE }}>start your first duel</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {stats.recentDuels.map(duel => {
                                const resultBg = duel.result === 'win' ? BLUE_BG : duel.result === 'loss' ? ORANGE_BG : NEUTRAL_BG;
                                const resultColor = duel.result === 'win' ? BLUE : duel.result === 'loss' ? ORANGE : NEUTRAL;
                                return (
                                    <Link
                                        key={duel._id}
                                        href={`/results/${duel._id}`}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '14px 0', borderBottom: '1px solid oklch(28% 0.02 260)',
                                            gap: 16, flexWrap: 'wrap', textDecoration: 'none', color: 'inherit'
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontSize: 15, marginBottom: 4 }}>
                                                {duel.problemId?.title || 'Unknown Problem'}
                                            </div>
                                            <div className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(55% 0.02 260)' }}>
                                                {CATEGORY_LABELS[duel.problemId?.category] || duel.problemId?.category} · {new Date(duel.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                                            <span className={jetbrainsMono.className} style={{ fontSize: 13, color: 'oklch(65% 0.02 260)' }}>
                                                {duel.userScore} – {duel.aiScore}
                                            </span>
                                            <span className={pressStart2P.className} style={{ fontSize: 9, padding: '6px 10px', borderRadius: 4, background: resultBg, color: resultColor }}>
                                                {duel.result.toUpperCase()}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

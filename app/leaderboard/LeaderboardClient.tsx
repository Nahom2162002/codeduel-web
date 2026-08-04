'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';
import UserMenu from '../components/UserMenu';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(75% 0.15 220 / 0.18)';
const BLUE_BORDER = 'oklch(75% 0.15 220 / 0.5)';
const ORANGE_BG = 'oklch(75% 0.15 55 / 0.18)';

interface Entry {
    rank: number;
    username: string;
    plan: string;
    eloRating: number;
    wins: number;
    losses: number;
    draws: number;
    totalDuels: number;
}

interface You {
    rank: number;
    username: string;
    eloRating: number;
    totalDuels: number;
}

interface Me {
    username: string;
    plan: string;
    hasHadTrial?: boolean;
    isTrialing?: boolean;
}

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function rankBadge(rank: number) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
}

export default function LeaderboardClient() {
    const [leaderboard, setLeaderboard] = useState<Entry[]>([]);
    const [you, setYou] = useState<You | null>(null);
    const [totalRanked, setTotalRanked] = useState(0);
    const [me, setMe] = useState<Me | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('/api/leaderboard', {
            headers: token ? { authorization: `Bearer ${token}` } : {}
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setLeaderboard(data.leaderboard || []);
                    setYou(data.you || null);
                    setTotalRanked(data.totalRanked || 0);
                }
                setLoading(false);
            })
            .catch(() => { setError('Failed to load leaderboard'); setLoading(false); });

        if (token) {
            fetch('/api/user/me', { headers: { authorization: `Bearer ${token}` } })
                .then(res => res.json())
                .then(data => { if (data.username) setMe(data); })
                .catch(() => {});
        }
    }, []);

    const inTop100 = you && leaderboard.some(e => e.username === you.username);

    return (
        <div className={`${spaceGrotesk.className} app-page`} style={{ background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', minHeight: '100vh' }}>
            <style>{`
                @media (max-width: 768px) {
                    .app-page nav { padding: 16px 20px !important; flex-wrap: wrap !important; row-gap: 12px !important; }
                    .app-page .app-nav-left { gap: 20px !important; row-gap: 10px !important; flex-wrap: wrap !important; }
                    .app-page .app-nav-links { gap: 16px !important; font-size: 13.5px !important; }
                    .app-page main { padding-left: 20px !important; padding-right: 20px !important; }
                    .app-page h1 { font-size: 30px !important; }
                    .app-page .lb-row { grid-template-columns: 40px 1fr 70px !important; }
                    .app-page .lb-hide-mobile { display: none !important; }
                }
            `}</style>
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: 1280, margin: '0 auto' }}>
                <div className="app-nav-left" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
                    <Link href={me ? '/problems' : '/'} style={{
                        display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20,
                        letterSpacing: '-0.02em', textDecoration: 'none', color: 'oklch(96% 0.01 260)'
                    }}>
                        <DuelIcon />
                        CodeDuel
                    </Link>
                    {me && (
                        <div className="app-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 15, fontWeight: 500 }}>
                            <Link href="/problems" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Problems</Link>
                            <Link href="/dashboard" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Dashboard</Link>
                            <Link href="/practice" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Practice</Link>
                            <Link href="/rules" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Rules</Link>
                            <Link href="/leaderboard" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none', borderBottom: `2px solid ${BLUE}`, paddingBottom: 4 }}>Leaderboard</Link>
                        </div>
                    )}
                </div>
                {me ? (
                    <UserMenu username={me.username} plan={me.plan} hasHadTrial={me.hasHadTrial} isTrialing={me.isTrialing} />
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 15, fontWeight: 500 }}>
                        <Link href="/login" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none' }}>Log in</Link>
                        <Link href="/register" style={{ background: BLUE, color: 'oklch(16% 0.02 260)', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 700 }}>
                            Start Dueling
                        </Link>
                    </div>
                )}
            </nav>

            <main style={{ maxWidth: 860, margin: '0 auto', padding: '24px 48px 100px' }}>
                <div className={pressStart2P.className} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, letterSpacing: '0.04em',
                    color: ORANGE, background: 'oklch(24% 0.03 55 / 0.4)', border: `1px solid oklch(75% 0.15 55 / 0.35)`,
                    padding: '10px 16px', borderRadius: 4, marginBottom: 20
                }}>
                    [ GLOBAL RANKINGS ]
                </div>

                <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Leaderboard</h1>
                <p style={{ fontSize: 17, color: 'oklch(70% 0.02 260)', margin: '0 0 32px' }}>
                    Ranked by ELO — the coders currently outperforming Claude.
                </p>

                {you ? (
                    <div style={{
                        background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`, borderRadius: 12,
                        padding: '18px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12
                    }}>
                        <div>
                            <p className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(70% 0.05 220)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Your rank
                            </p>
                            <p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
                                #{you.rank} <span style={{ fontWeight: 500, fontSize: 16, color: 'oklch(80% 0.02 260)' }}>of {totalRanked}</span>
                            </p>
                        </div>
                        <div className={jetbrainsMono.className} style={{ fontSize: 18, color: BLUE, fontWeight: 700 }}>
                            {you.eloRating} ELO
                        </div>
                    </div>
                ) : me ? (
                    <div style={{
                        background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12,
                        padding: '18px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12
                    }}>
                        <p style={{ fontSize: 14.5, color: 'oklch(80% 0.02 260)', margin: 0 }}>
                            You haven't been ranked yet — play a duel to enter the leaderboard.
                        </p>
                        <Link href="/problems" style={{ background: BLUE, color: 'oklch(16% 0.02 260)', padding: '9px 16px', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13.5, whiteSpace: 'nowrap' }}>
                            Start a duel →
                        </Link>
                    </div>
                ) : (
                    <div style={{
                        background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12,
                        padding: '18px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12
                    }}>
                        <p style={{ fontSize: 14.5, color: 'oklch(80% 0.02 260)', margin: 0 }}>
                            Sign up free and see where you'd rank.
                        </p>
                        <Link href="/register" style={{ background: BLUE, color: 'oklch(16% 0.02 260)', padding: '9px 16px', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13.5, whiteSpace: 'nowrap' }}>
                            Start Dueling →
                        </Link>
                    </div>
                )}

                {loading && (
                    <div className={jetbrainsMono.className} style={{ textAlign: 'center', padding: '60px 0', color: 'oklch(55% 0.02 260)', fontSize: 14 }}>
                        Loading leaderboard...
                    </div>
                )}

                {error && !loading && (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: ORANGE, fontSize: 14 }}>
                        {error}
                    </div>
                )}

                {!loading && !error && leaderboard.length === 0 && (
                    <div className={jetbrainsMono.className} style={{ textAlign: 'center', padding: '60px 0', color: 'oklch(55% 0.02 260)', fontSize: 14 }}>
                        No duels completed yet — be the first to get ranked.
                    </div>
                )}

                {!loading && !error && leaderboard.length > 0 && (
                    <div style={{
                        background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12,
                        overflow: 'hidden', position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', top: 6, left: 6, width: 16, height: 16, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}`, zIndex: 1 }} />
                        <div style={{ position: 'absolute', bottom: 6, right: 6, width: 16, height: 16, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}`, zIndex: 1 }} />

                        <div className={`${jetbrainsMono.className} lb-row`} style={{
                            display: 'grid', gridTemplateColumns: '56px 1fr 100px 140px 90px', gap: 8,
                            padding: '12px 20px', fontSize: 11.5, color: 'oklch(55% 0.02 260)',
                            textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid oklch(30% 0.02 260)'
                        }}>
                            <span>Rank</span>
                            <span>Player</span>
                            <span style={{ textAlign: 'right' }}>ELO</span>
                            <span className="lb-hide-mobile" style={{ textAlign: 'right' }}>Record</span>
                            <span className="lb-hide-mobile" style={{ textAlign: 'right' }}>Win %</span>
                        </div>

                        {leaderboard.map(entry => {
                            const isYou = you?.username === entry.username;
                            const winRate = entry.totalDuels > 0 ? Math.round((entry.wins / entry.totalDuels) * 100) : 0;
                            const medal = rankBadge(entry.rank);

                            return (
                                <div
                                    key={entry.username}
                                    className="lb-row"
                                    style={{
                                        display: 'grid', gridTemplateColumns: '56px 1fr 100px 140px 90px', gap: 8,
                                        padding: '13px 20px', alignItems: 'center', fontSize: 14.5,
                                        background: isYou ? BLUE_BG : 'transparent',
                                        borderBottom: entry.rank === leaderboard.length ? 'none' : '1px solid oklch(26% 0.02 260)'
                                    }}
                                >
                                    <span className={pressStart2P.className} style={{ fontSize: medal ? 15 : 11, color: medal ? undefined : 'oklch(60% 0.02 260)' }}>
                                        {medal || `#${entry.rank}`}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: isYou ? 700 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {entry.username}
                                        {isYou && <span style={{ color: BLUE, fontSize: 12.5, fontWeight: 500 }}>(you)</span>}
                                        {entry.plan === 'pro' && (
                                            <span className={jetbrainsMono.className} style={{ fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: BLUE, color: 'oklch(16% 0.02 260)' }}>
                                                PRO
                                            </span>
                                        )}
                                    </span>
                                    <span className={jetbrainsMono.className} style={{ textAlign: 'right', fontWeight: 700, color: BLUE }}>
                                        {entry.eloRating}
                                    </span>
                                    <span className={`${jetbrainsMono.className} lb-hide-mobile`} style={{ textAlign: 'right', fontSize: 13, color: 'oklch(70% 0.02 260)' }}>
                                        {entry.wins}-{entry.losses}-{entry.draws}
                                    </span>
                                    <span className={`${jetbrainsMono.className} lb-hide-mobile`} style={{ textAlign: 'right', fontSize: 13, color: 'oklch(70% 0.02 260)' }}>
                                        {winRate}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {!loading && !error && leaderboard.length > 0 && (
                    <p className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(50% 0.02 260)', textAlign: 'center', margin: '20px 0 0' }}>
                        Showing top {leaderboard.length} of {totalRanked} ranked players · updates after every duel
                    </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 48, fontSize: 13 }}>
                    <Link href="/privacy" style={{ color: 'oklch(55% 0.02 260)', textDecoration: 'none' }}>Privacy Policy</Link>
                    <Link href="/terms" style={{ color: 'oklch(55% 0.02 260)', textDecoration: 'none' }}>Terms of Service</Link>
                </div>
            </main>
        </div>
    );
}

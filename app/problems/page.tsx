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
const BLUE_BORDER = 'oklch(75% 0.15 220 / 0.5)';
const ORANGE_BG = 'oklch(75% 0.15 55 / 0.18)';
const ORANGE_BORDER = 'oklch(75% 0.15 55 / 0.5)';

interface Problem {
    _id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    isPremium: boolean;
}

interface Me {
    username: string;
    plan: string;
    hasHadTrial?: boolean;
}

const CATEGORIES = [
    'all', 'arrays', 'strings', 'trees', 'graphs', 'dynamic-programming', 'system-design'
];

const DIFFICULTIES = ['all', 'easy', 'medium', 'hard'];

function categoryLabel(cat: string) {
    return cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ');
}

function diffColors(d: string) {
    if (d === 'easy') return { bg: BLUE_BG, color: BLUE };
    if (d === 'hard') return { bg: ORANGE_BG, color: ORANGE };
    return { bg: 'oklch(40% 0.02 260 / 0.4)', color: 'oklch(85% 0.02 260)' };
}

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function ProblemsPage() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [filtered, setFiltered] = useState<Problem[]>([]);
    const [category, setCategory] = useState('all');
    const [difficulty, setDifficulty] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [me, setMe] = useState<Me | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        fetch('/api/problems', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProblems(data);
                    setFiltered(data);
                } else {
                    setError(data.error);
                }
                setLoading(false);
            })
            .catch(() => { setError('Failed to load problems'); setLoading(false); });

        fetch('/api/user/me', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => { if (data.username) setMe(data); })
            .catch(() => {});
    }, []);

    useEffect(() => {
        let result = problems;
        if (category !== 'all') result = result.filter(p => p.category === category);
        if (difficulty !== 'all') result = result.filter(p => p.difficulty === difficulty);
        setFiltered(result);
    }, [category, difficulty, problems]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className={spaceGrotesk.className} style={{
            background: 'oklch(16% 0.02 260)',
            color: 'oklch(96% 0.01 260)',
            minHeight: '100vh'
        }}>
            <nav style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 48px',
                maxWidth: 1280,
                margin: '0 auto'
            }}>
                <Link href="/problems" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    textDecoration: 'none',
                    color: 'oklch(96% 0.01 260)'
                }}>
                    <DuelIcon />
                    CodeDuel
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <Link href="/dashboard" style={{ color: 'oklch(85% 0.02 260)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>
                        Dashboard
                    </Link>
                    <Link href="/" style={{ color: 'oklch(85% 0.02 260)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>
                        About
                    </Link>
                    {me && (
                        <>
                            {me.plan === 'pro' && (
                                <span className={jetbrainsMono.className} style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: '3px 9px',
                                    borderRadius: 20,
                                    background: BLUE,
                                    color: 'oklch(16% 0.02 260)'
                                }}>
                                    PRO
                                </span>
                            )}
                            <span style={{ color: 'oklch(70% 0.02 260)', fontSize: 15 }}>{me.username}</span>
                            <button
                                onClick={handleLogout}
                                className={spaceGrotesk.className}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 6,
                                    border: '1px solid oklch(32% 0.02 260)',
                                    background: 'transparent',
                                    color: 'oklch(85% 0.02 260)',
                                    fontSize: 14,
                                    cursor: 'pointer'
                                }}
                            >
                                Log out
                            </button>
                        </>
                    )}
                </div>
            </nav>

            <main style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 48px 100px' }}>
                <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Problems</h1>
                <p style={{ fontSize: 17, color: 'oklch(70% 0.02 260)', margin: '0 0 36px' }}>
                    Choose a problem and compete against Claude to keep your skills sharp.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                    {CATEGORIES.map(cat => {
                        const active = cat === category;
                        return (
                            <div
                                key={cat}
                                onClick={() => setCategory(cat)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '9px 16px',
                                    borderRadius: 999,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    background: active ? BLUE_BG : 'oklch(21% 0.02 260)',
                                    color: active ? BLUE : 'oklch(75% 0.02 260)',
                                    border: `1px solid ${active ? BLUE_BORDER : 'oklch(32% 0.02 260)'}`
                                }}
                            >
                                {categoryLabel(cat)}
                            </div>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
                    {DIFFICULTIES.map(diff => {
                        const active = diff === difficulty;
                        return (
                            <div
                                key={diff}
                                onClick={() => setDifficulty(diff)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '9px 16px',
                                    borderRadius: 999,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    background: active ? ORANGE_BG : 'oklch(21% 0.02 260)',
                                    color: active ? ORANGE : 'oklch(75% 0.02 260)',
                                    border: `1px solid ${active ? ORANGE_BORDER : 'oklch(32% 0.02 260)'}`
                                }}
                            >
                                {diff === 'all' ? 'All' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </div>
                        );
                    })}
                </div>

                {loading && (
                    <div className={jetbrainsMono.className} style={{ textAlign: 'center', padding: '60px 0', color: 'oklch(55% 0.02 260)', fontSize: 14 }}>
                        Loading problems...
                    </div>
                )}

                {error && (
                    <div className={jetbrainsMono.className} style={{ textAlign: 'center', padding: '60px 0', color: ORANGE, fontSize: 14 }}>
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {filtered.map(problem => {
                            const c = diffColors(problem.difficulty);
                            return (
                                <Link
                                    key={problem._id}
                                    href={`/duel/${problem._id}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        background: 'oklch(21% 0.02 260)',
                                        border: '1px solid oklch(30% 0.02 260)',
                                        borderRadius: 10,
                                        padding: '20px 24px',
                                        gap: 20,
                                        flexWrap: 'wrap',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                            <h3 style={{ fontSize: 17, color: 'oklch(96% 0.01 260)', margin: 0 }}>{problem.title}</h3>
                                            {problem.isPremium && (
                                                <span className={jetbrainsMono.className} style={{
                                                    fontSize: 9,
                                                    fontWeight: 700,
                                                    padding: '2px 6px',
                                                    borderRadius: 4,
                                                    background: BLUE_BG,
                                                    color: BLUE
                                                }}>
                                                    PRO
                                                </span>
                                            )}
                                        </div>
                                        <div className={jetbrainsMono.className} style={{ fontSize: 12.5, color: 'oklch(60% 0.02 260)' }}>
                                            {categoryLabel(problem.category)}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <span className={pressStart2P.className} style={{
                                            fontSize: 8,
                                            letterSpacing: '0.03em',
                                            padding: '6px 10px',
                                            borderRadius: 4,
                                            background: c.bg,
                                            color: c.color
                                        }}>
                                            {problem.difficulty.toUpperCase()}
                                        </span>
                                        <span style={{
                                            background: BLUE,
                                            color: 'oklch(16% 0.02 260)',
                                            padding: '10px 18px',
                                            borderRadius: 6,
                                            fontWeight: 700,
                                            fontSize: 14,
                                            whiteSpace: 'nowrap'
                                        }}>
                                            Duel ▸
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}

                        {filtered.length === 0 && (
                            <div className={jetbrainsMono.className} style={{ textAlign: 'center', padding: '60px 0', color: 'oklch(55% 0.02 260)', fontSize: 14 }}>
                                No problems match these filters.
                            </div>
                        )}
                    </div>
                )}
            </main>

            <footer style={{
                borderTop: '1px solid oklch(28% 0.02 260)',
                padding: '32px 48px',
                maxWidth: 1280,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16
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

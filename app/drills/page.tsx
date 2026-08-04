'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import UserMenu from '../components/UserMenu';
import UpgradeBanner from '../components/UpgradeBanner';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(75% 0.15 220 / 0.18)';
const ORANGE_BG = 'oklch(75% 0.15 55 / 0.18)';
const NEUTRAL_BG = 'oklch(40% 0.02 260 / 0.4)';
const NEUTRAL = 'oklch(85% 0.02 260)';

const CATEGORY_LABELS: Record<string, string> = {
    arrays: 'Arrays', strings: 'Strings', trees: 'Trees', graphs: 'Graphs',
    'dynamic-programming': 'Dynamic Programming', 'system-design': 'System Design',
    'binary-search': 'Binary Search', stacks: 'Stacks & Queues', greedy: 'Greedy',
    'bit-manipulation': 'Bit Manipulation', 'hash-table': 'Hash Table', 'two-pointers': 'Two Pointers',
    heap: 'Heap (Priority Queue)', 'sliding-window': 'Sliding Window', matrix: 'Matrix', sorting: 'Sorting',
    'union-find': 'Union-Find', 'topological-sort': 'Topological Sort', simulation: 'Simulation',
    counting: 'Counting', 'shortest-path': 'Shortest Path', 'number-theory': 'Number Theory',
    bitmask: 'Bitmask', recursion: 'Recursion', geometry: 'Geometry',
    'divide-and-conquer': 'Divide and Conquer', 'game-theory': 'Game Theory', 'linked-list': 'Linked List',
    trie: 'Trie', iterator: 'Iterator', interactive: 'Interactive', concurrency: 'Concurrency'
};

interface Me { username: string; plan: string; hasHadTrial?: boolean; isTrialing?: boolean; }

interface DrillProblem { _id: string; title: string; difficulty: 'easy' | 'medium' | 'hard'; category: string; completed: boolean; }

interface TodayResponse {
    requiresPro?: boolean;
    error?: string;
    problems?: DrillProblem[];
    allCompleted?: boolean;
    streak?: { current: number; best: number };
}

function diffColors(d: string) {
    if (d === 'easy') return { bg: BLUE_BG, color: BLUE };
    if (d === 'hard') return { bg: ORANGE_BG, color: ORANGE };
    return { bg: NEUTRAL_BG, color: NEUTRAL };
}

function DuelIcon({ size = 22 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function DrillsPage() {
    const router = useRouter();
    const [me, setMe] = useState<Me | null>(null);
    const [data, setData] = useState<TodayResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        Promise.all([
            fetch('/api/drills/today', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json()),
            fetch('/api/user/me', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json())
        ]).then(([todayData, userData]) => {
            setData(todayData);
            if (userData.username) setMe(userData);
            setLoading(false);
        }).catch(() => {
            setData({ error: 'Failed to load today\'s drills' });
            setLoading(false);
        });
    }, []);

    const nav = (
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
                    <Link href="/dashboard" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Dashboard</Link>
                    <Link href="/practice" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Practice</Link>
                    <Link href="/drills" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none', borderBottom: `2px solid ${BLUE}`, paddingBottom: 4 }}>Drills</Link>
                    <Link href="/flashcards" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Flashcards</Link>
                    <Link href="/rules" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Rules</Link>
                    <Link href="/leaderboard" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Leaderboard</Link>
                </div>
            </div>
            {me && <UserMenu username={me.username} plan={me.plan} hasHadTrial={me.hasHadTrial} isTrialing={me.isTrialing} />}
        </nav>
    );

    if (loading) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading today's drills...
        </div>
    );

    if (data?.requiresPro) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
            {nav}
            <main style={{ maxWidth: 1120, margin: '0 auto', padding: '80px 24px' }}>
                <UpgradeBanner hasHadTrial={me?.hasHadTrial} reason="drills" />
            </main>
        </div>
    );

    if (data?.error) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {data.error}
        </div>
    );

    const problems = data?.problems || [];
    const streak = data?.streak || { current: 0, best: 0 };
    const doneCount = problems.filter(p => p.completed).length;

    return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
            {nav}
            <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px' }}>
                <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>Daily Drills</h1>
                <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 15.5, marginBottom: 32, lineHeight: 1.6 }}>
                    3 short, focused problems picked from your weak spots. No ELO on the line — just a daily habit.
                </p>

                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: streak.current > 0 ? BLUE_BG : NEUTRAL_BG, border: `1px solid ${streak.current > 0 ? BLUE + '66' : 'oklch(38% 0.02 260)'}`,
                    borderRadius: 12, padding: '20px 24px', marginBottom: 28
                }}>
                    <div>
                        <div className={jetbrainsMono.className} style={{ fontSize: 28, fontWeight: 700, color: streak.current > 0 ? BLUE : NEUTRAL }}>
                            🔥 {streak.current}
                        </div>
                        <div style={{ fontSize: 12.5, color: 'oklch(65% 0.02 260)' }}>day streak</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div className={jetbrainsMono.className} style={{ fontSize: 15, fontWeight: 600 }}>{doneCount}/3 today</div>
                        <div style={{ fontSize: 12.5, color: 'oklch(65% 0.02 260)' }}>Best streak: {streak.best}</div>
                    </div>
                </div>

                {data?.allCompleted && (
                    <div style={{ background: BLUE_BG, border: `1px solid ${BLUE}66`, borderRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
                        <span style={{ color: BLUE, fontWeight: 600, fontSize: 14.5 }}>Today's drill is complete — come back tomorrow to keep the streak alive.</span>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {problems.map(p => {
                        const c = diffColors(p.difficulty);
                        return (
                            <div
                                key={p._id}
                                onClick={() => router.push(`/drills/${p._id}`)}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                                    background: 'oklch(21% 0.02 260)', border: `1px solid ${p.completed ? BLUE + '66' : 'oklch(30% 0.02 260)'}`,
                                    borderRadius: 10, padding: '18px 20px'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <span style={{ fontSize: 18 }}>{p.completed ? '✅' : '⬜'}</span>
                                    <div>
                                        <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
                                        <div className={jetbrainsMono.className} style={{ fontSize: 11.5, color: 'oklch(60% 0.02 260)' }}>{CATEGORY_LABELS[p.category] || p.category}</div>
                                    </div>
                                </div>
                                <span className={jetbrainsMono.className} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, background: c.bg, color: c.color, textTransform: 'capitalize' }}>
                                    {p.difficulty}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

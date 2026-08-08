'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';
import UserMenu from '../components/UserMenu';
import UpgradeBanner from '../components/UpgradeBanner';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

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
    trie: 'Trie', iterator: 'Iterator', interactive: 'Interactive', concurrency: 'Concurrency',
    queue: 'Queue', deque: 'Deque', backtracking: 'Backtracking', intervals: 'Intervals'
};

interface Me { username: string; plan: string; hasHadTrial?: boolean; isTrialing?: boolean; }

interface NextResponse {
    requiresPro?: boolean;
    noWeakCategories?: boolean;
    queueComplete?: boolean;
    message?: string;
    weakCategories?: string[];
    remaining?: number;
    problem?: { _id: string; title: string; difficulty: 'easy' | 'medium' | 'hard'; category: string };
    error?: string;
}

interface ProblemSummary {
    _id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    isPremium: boolean;
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

export default function PracticePage() {
    const router = useRouter();
    const [me, setMe] = useState<Me | null>(null);
    const [data, setData] = useState<NextResponse | null>(null);
    const [problems, setProblems] = useState<ProblemSummary[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        Promise.all([
            fetch('/api/practice/next', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json()),
            fetch('/api/user/me', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json()),
            fetch('/api/problems', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json())
        ]).then(([nextData, userData, problemsData]) => {
            setData(nextData);
            if (userData.username) setMe(userData);
            if (Array.isArray(problemsData)) setProblems(problemsData);
            setLoading(false);
        }).catch(() => {
            setData({ error: 'Failed to load practice queue' });
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
                    <Link href="/practice" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none', borderBottom: `2px solid ${BLUE}`, paddingBottom: 4 }}>Practice</Link>
                    <Link href="/drills" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Drills</Link>
                    <Link href="/flashcards" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Flashcards</Link>
                    <Link href="/review" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Code Review</Link>
                    <Link href="/rules" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Rules</Link>
                    <Link href="/leaderboard" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Leaderboard</Link>
                </div>
            </div>
            {me && <UserMenu username={me.username} plan={me.plan} hasHadTrial={me.hasHadTrial} isTrialing={me.isTrialing} />}
        </nav>
    );

    if (loading) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading practice queue...
        </div>
    );

    if (data?.error) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {data.error}
        </div>
    );

    const filteredProblems = problems.filter(p => p.title.toLowerCase().includes(search.trim().toLowerCase()));

    return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
            {nav}
            <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px 100px' }}>
                <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>🎓 Guided Practice</h1>
                <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 15.5, marginBottom: 40, lineHeight: 1.6 }}>
                    No opponent, no ELO on the line — Claude tutors you through it with hints as you go, then scores
                    you on correctness and hint efficiency once you submit.
                </p>

                <section style={{ marginBottom: 48 }}>
                    <p className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 14px' }}>
                        From your weak spots
                    </p>

                    {data?.requiresPro && (
                        <UpgradeBanner hasHadTrial={me?.hasHadTrial} reason="practice" />
                    )}

                    {data?.noWeakCategories && (
                        <div style={{ background: NEUTRAL_BG, border: '1px solid oklch(40% 0.02 260)', borderRadius: 12, padding: '32px 28px' }}>
                            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Not enough data yet</div>
                            <div style={{ color: 'oklch(70% 0.02 260)', fontSize: 14.5, lineHeight: 1.6 }}>{data.message}</div>
                        </div>
                    )}

                    {data?.queueComplete && (
                        <div style={{ background: BLUE_BG, border: `1px solid ${BLUE}66`, borderRadius: 12, padding: '32px 28px' }}>
                            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: BLUE }}>Queue cleared 🎉</div>
                            <div style={{ color: 'oklch(80% 0.02 260)', fontSize: 14.5, lineHeight: 1.6 }}>{data.message}</div>
                            {data.weakCategories && data.weakCategories.length > 0 && (
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                                    {data.weakCategories.map(c => (
                                        <span key={c} className={jetbrainsMono.className} style={{ fontSize: 12, background: NEUTRAL_BG, padding: '5px 10px', borderRadius: 6, color: NEUTRAL }}>
                                            {CATEGORY_LABELS[c] || c}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {data?.problem && (
                        <div style={{ background: NEUTRAL_BG, border: '1px solid oklch(40% 0.02 260)', borderRadius: 12, padding: '32px 28px' }}>
                            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                                <span className={jetbrainsMono.className} style={{
                                    fontSize: 12, padding: '4px 10px', borderRadius: 6,
                                    background: diffColors(data.problem.difficulty).bg, color: diffColors(data.problem.difficulty).color, textTransform: 'capitalize'
                                }}>
                                    {data.problem.difficulty}
                                </span>
                                <span className={jetbrainsMono.className} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: 'oklch(30% 0.02 260)', color: 'oklch(75% 0.02 260)' }}>
                                    {CATEGORY_LABELS[data.problem.category] || data.problem.category}
                                </span>
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{data.problem.title}</div>
                            <div style={{ color: 'oklch(65% 0.02 260)', fontSize: 13.5, marginBottom: 24 }}>
                                {data.remaining} problem{data.remaining === 1 ? '' : 's'} left in your weak-category queue
                            </div>
                            <button
                                onClick={() => router.push(`/practice/${data.problem!._id}`)}
                                className={jetbrainsMono.className}
                                style={{
                                    background: BLUE, color: 'oklch(16% 0.02 260)', border: 'none', borderRadius: 8,
                                    padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer'
                                }}
                            >
                                Start Practice →
                            </button>
                        </div>
                    )}
                </section>

                <section>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                        <p className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                            Or pick any problem
                        </p>
                        {me?.plan === 'free' && (
                            <p className={jetbrainsMono.className} style={{ fontSize: 11.5, color: 'oklch(55% 0.02 260)', margin: 0 }}>
                                Free plan: 1 practice session/day on non-premium problems
                            </p>
                        )}
                    </div>

                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search problems…"
                        className={jetbrainsMono.className}
                        style={{
                            width: '100%', boxSizing: 'border-box', background: 'oklch(18% 0.02 260)',
                            border: '1px solid oklch(32% 0.02 260)', borderRadius: 8, padding: '10px 14px',
                            fontSize: 13.5, color: 'oklch(96% 0.01 260)', outline: 'none', marginBottom: 12
                        }}
                    />

                    <div style={{
                        background: 'oklch(19% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 10,
                        maxHeight: 360, overflowY: 'auto'
                    }}>
                        {filteredProblems.length === 0 && (
                            <div style={{ padding: 24, textAlign: 'center', color: 'oklch(55% 0.02 260)', fontSize: 13.5 }}>
                                No problems match "{search}"
                            </div>
                        )}
                        {filteredProblems.map((p, i) => {
                            const locked = p.isPremium && me?.plan !== 'pro';
                            const c = diffColors(p.difficulty);
                            return (
                                <div
                                    key={p._id}
                                    onClick={() => router.push(`/practice/${p._id}`)}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                                        padding: '12px 16px', cursor: 'pointer',
                                        borderTop: i === 0 ? 'none' : '1px solid oklch(28% 0.02 260)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                                        {locked && <span style={{ fontSize: 12.5, flexShrink: 0 }}>🔒</span>}
                                        <span style={{ fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                        <span className={jetbrainsMono.className} style={{ fontSize: 11, color: 'oklch(60% 0.02 260)' }}>
                                            {CATEGORY_LABELS[p.category] || p.category}
                                        </span>
                                        <span className={pressStart2P.className} style={{ fontSize: 7, padding: '4px 7px', borderRadius: 4, background: c.bg, color: c.color }}>
                                            {p.difficulty.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}

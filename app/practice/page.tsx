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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        Promise.all([
            fetch('/api/practice/next', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json()),
            fetch('/api/user/me', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json())
        ]).then(([nextData, userData]) => {
            setData(nextData);
            if (userData.username) setMe(userData);
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

    if (data?.requiresPro) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
            {nav}
            <main style={{ maxWidth: 1120, margin: '0 auto', padding: '80px 24px' }}>
                <UpgradeBanner hasHadTrial={me?.hasHadTrial} reason="practice" />
            </main>
        </div>
    );

    if (data?.error) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {data.error}
        </div>
    );

    return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
            {nav}
            <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px' }}>
                <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>Guided Practice</h1>
                <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 15.5, marginBottom: 40, lineHeight: 1.6 }}>
                    No opponent, no ELO on the line — just problems picked from your weakest categories,
                    in easy-to-hard order, with hints and a full solution walkthrough whenever you're ready.
                </p>

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
            </main>
        </div>
    );
}

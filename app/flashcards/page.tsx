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
    'bit-manipulation': 'Bit Manipulation', 'hash-table': 'Hash Map', 'two-pointers': 'Two Pointers',
    heap: 'Heap (Priority Queue)', 'sliding-window': 'Sliding Window', matrix: 'Matrix', sorting: 'Sorting',
    'union-find': 'Union-Find', 'topological-sort': 'Topological Sort', simulation: 'Simulation',
    counting: 'Counting', 'shortest-path': 'Shortest Path / BFS', 'number-theory': 'Number Theory',
    bitmask: 'Bitmask', recursion: 'Recursion', geometry: 'Geometry',
    'divide-and-conquer': 'Divide and Conquer', 'game-theory': 'Game Theory', 'linked-list': 'Linked List',
    trie: 'Trie', iterator: 'Iterator', interactive: 'Interactive', concurrency: 'Concurrency'
};

interface Me { username: string; plan: string; hasHadTrial?: boolean; isTrialing?: boolean; }

interface Card {
    _id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    examples: { input: string; output: string; explanation?: string }[];
    options: string[];
}

interface Stats { totalAttempts: number; overallAccuracy: number | null; weakestPatterns: { category: string; accuracy: number; attempts: number }[]; }

interface AnswerResult { correct: boolean; correctCategory: string; explanation: string; }

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

type Phase = 'landing' | 'loading' | 'quiz' | 'summary';

export default function FlashcardsPage() {
    const router = useRouter();
    const [me, setMe] = useState<Me | null>(null);
    const [stats, setStats] = useState<Stats | null>(null);
    const [phase, setPhase] = useState<Phase>('landing');
    const [cards, setCards] = useState<Card[]>([]);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [answer, setAnswer] = useState<AnswerResult | null>(null);
    const [answering, setAnswering] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [error, setError] = useState('');
    const [flashcardsLimitReached, setFlashcardsLimitReached] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        Promise.all([
            fetch('/api/user/me', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json()),
            fetch('/api/flashcards/stats', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json())
        ]).then(([userData, statsData]) => {
            if (userData.username) setMe(userData);
            if (!statsData.error) setStats(statsData);
        }).catch(() => {});
    }, []);

    const startSession = async () => {
        setPhase('loading');
        setError('');
        setFlashcardsLimitReached(false);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/flashcards/session', { headers: { authorization: `Bearer ${token}` } });
            const data = await res.json();
            if (data.flashcardsLimitReached) { setFlashcardsLimitReached(true); setPhase('landing'); return; }
            if (data.error) { setError(data.error); setPhase('landing'); return; }
            setCards(data.cards);
            setIndex(0);
            setCorrectCount(0);
            setSelected(null);
            setAnswer(null);
            setPhase('quiz');
        } catch {
            setError('Failed to start session');
            setPhase('landing');
        }
    };

    const submitAnswer = async (category: string) => {
        if (selected) return;
        setSelected(category);
        setAnswering(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/flashcards/answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify({ problemId: cards[index]._id, selectedCategory: category })
            });
            const data = await res.json();
            if (data.error) { setError(data.error); return; }
            setAnswer(data);
            if (data.correct) setCorrectCount(c => c + 1);
        } catch {
            setError('Failed to submit answer');
        } finally {
            setAnswering(false);
        }
    };

    const nextCard = () => {
        if (index + 1 >= cards.length) {
            setPhase('summary');
        } else {
            setIndex(i => i + 1);
            setSelected(null);
            setAnswer(null);
        }
    };

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
                    <Link href="/drills" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Drills</Link>
                    <Link href="/flashcards" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none', borderBottom: `2px solid ${BLUE}`, paddingBottom: 4 }}>Flashcards</Link>
                    <Link href="/review" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Code Review</Link>
                    <Link href="/rules" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Rules</Link>
                    <Link href="/leaderboard" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Leaderboard</Link>
                </div>
            </div>
            {me && <UserMenu username={me.username} plan={me.plan} hasHadTrial={me.hasHadTrial} isTrialing={me.isTrialing} />}
        </nav>
    );

    const sessionSize = me?.plan === 'pro' ? 10 : 5;

    if (phase === 'landing' || phase === 'loading') {
        return (
            <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
                {nav}
                <main style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>Flashcard Mode</h1>
                    <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 15.5, marginBottom: 32, lineHeight: 1.6 }}>
                        See a problem, pick the right approach from 4 options — no coding required. Trains pattern recognition in isolation.
                    </p>

                    {stats && stats.totalAttempts > 0 && (
                        <div style={{ background: NEUTRAL_BG, border: '1px solid oklch(38% 0.02 260)', borderRadius: 12, padding: '20px 24px', marginBottom: 28, textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: stats.weakestPatterns.length > 0 ? 16 : 0 }}>
                                <span style={{ fontSize: 13.5, color: 'oklch(70% 0.02 260)' }}>Your accuracy (last 30 days)</span>
                                <span className={jetbrainsMono.className} style={{ fontSize: 20, fontWeight: 700, color: BLUE }}>{stats.overallAccuracy}%</span>
                            </div>
                            {stats.weakestPatterns.length > 0 && (
                                <div>
                                    <p className={jetbrainsMono.className} style={{ fontSize: 10.5, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px' }}>Weakest patterns</p>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        {stats.weakestPatterns.map(w => (
                                            <span key={w.category} className={jetbrainsMono.className} style={{ fontSize: 12, background: ORANGE_BG, color: ORANGE, padding: '5px 10px', borderRadius: 6 }}>
                                                {CATEGORY_LABELS[w.category] || w.category} · {w.accuracy}%
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {flashcardsLimitReached ? (
                        <UpgradeBanner hasHadTrial={me?.hasHadTrial} reason="flashcards" />
                    ) : (
                        <>
                            {error && <div style={{ color: ORANGE, fontSize: 13.5, marginBottom: 16 }}>{error}</div>}

                            <button
                                onClick={startSession}
                                disabled={phase === 'loading'}
                                className={jetbrainsMono.className}
                                style={{
                                    background: BLUE, color: 'oklch(16% 0.02 260)', border: 'none', borderRadius: 8,
                                    padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: phase === 'loading' ? 'default' : 'pointer'
                                }}
                            >
                                {phase === 'loading' ? 'Loading…' : `Start Session (${sessionSize} cards)`}
                            </button>
                        </>
                    )}
                </main>
            </div>
        );
    }

    if (phase === 'summary') {
        const pct = Math.round((correctCount / cards.length) * 100);
        return (
            <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
                {nav}
                <main style={{ maxWidth: 480, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
                    <div className={jetbrainsMono.className} style={{ fontSize: 48, fontWeight: 700, color: BLUE, marginBottom: 8 }}>{pct}%</div>
                    <div style={{ fontSize: 16, color: 'oklch(80% 0.02 260)', marginBottom: 32 }}>{correctCount}/{cards.length} correct</div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <button onClick={startSession} className={jetbrainsMono.className} style={{
                            background: BLUE, color: 'oklch(16% 0.02 260)', border: 'none', borderRadius: 8,
                            padding: '12px 22px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer'
                        }}>
                            Start Another Session
                        </button>
                        <Link href="/problems" className={jetbrainsMono.className} style={{
                            color: 'oklch(80% 0.02 260)', border: '1px solid oklch(38% 0.02 260)', borderRadius: 8,
                            padding: '12px 22px', fontSize: 13.5, fontWeight: 700, textDecoration: 'none'
                        }}>
                            Back to Problems
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    // phase === 'quiz'
    const card = cards[index];
    const diffBadge = diffColors(card.difficulty);

    return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
            {nav}
            <main style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <span className={jetbrainsMono.className} style={{ fontSize: 12.5, color: 'oklch(60% 0.02 260)' }}>
                        Card {index + 1} of {cards.length}
                    </span>
                    <span className={jetbrainsMono.className} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: diffBadge.bg, color: diffBadge.color, textTransform: 'capitalize' }}>
                        {card.difficulty}
                    </span>
                </div>

                <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 28, marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 14px' }}>{card.title}</h2>
                    <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'oklch(85% 0.02 260)', whiteSpace: 'pre-wrap', margin: '0 0 16px' }}>{card.description}</p>
                    {card.examples[0] && (
                        <div style={{ background: NEUTRAL_BG, borderRadius: 8, padding: 14 }}>
                            <pre className={jetbrainsMono.className} style={{ margin: '0 0 4px', fontSize: 12.5, whiteSpace: 'pre-wrap' }}>Input: {card.examples[0].input}</pre>
                            <pre className={jetbrainsMono.className} style={{ margin: 0, fontSize: 12.5, whiteSpace: 'pre-wrap' }}>Output: {card.examples[0].output}</pre>
                        </div>
                    )}
                </div>

                <p style={{ fontSize: 13.5, color: 'oklch(65% 0.02 260)', marginBottom: 12 }}>Which approach applies here?</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                    {card.options.map(opt => {
                        const isSelected = selected === opt;
                        const isCorrectOpt = answer && opt === answer.correctCategory;
                        let bg = 'oklch(21% 0.02 260)';
                        let border = 'oklch(30% 0.02 260)';
                        let color = 'oklch(90% 0.02 260)';
                        if (answer) {
                            if (isCorrectOpt) { bg = BLUE_BG; border = BLUE; color = BLUE; }
                            else if (isSelected) { bg = ORANGE_BG; border = ORANGE; color = ORANGE; }
                        } else if (isSelected) {
                            bg = BLUE_BG; border = BLUE;
                        }
                        return (
                            <button
                                key={opt}
                                onClick={() => submitAnswer(opt)}
                                disabled={!!selected}
                                className={jetbrainsMono.className}
                                style={{
                                    background: bg, border: `1px solid ${border}`, color, borderRadius: 8,
                                    padding: '14px 16px', fontSize: 13.5, fontWeight: 600, textAlign: 'left',
                                    cursor: selected ? 'default' : 'pointer'
                                }}
                            >
                                {CATEGORY_LABELS[opt] || opt}
                            </button>
                        );
                    })}
                </div>

                {answering && !answer && (
                    <div style={{ fontSize: 13, color: 'oklch(60% 0.02 260)' }}>Checking…</div>
                )}

                {answer && (
                    <div style={{
                        background: answer.correct ? BLUE_BG : ORANGE_BG, border: `1px solid ${answer.correct ? BLUE : ORANGE}66`,
                        borderRadius: 10, padding: '18px 20px'
                    }}>
                        <div style={{ fontWeight: 700, marginBottom: 8, color: answer.correct ? BLUE : ORANGE }}>
                            {answer.correct ? 'Correct!' : `Not quite — it's ${CATEGORY_LABELS[answer.correctCategory] || answer.correctCategory}`}
                        </div>
                        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'oklch(85% 0.02 260)', margin: '0 0 16px' }}>{answer.explanation}</p>
                        <button
                            onClick={nextCard}
                            className={jetbrainsMono.className}
                            style={{
                                background: BLUE, color: 'oklch(16% 0.02 260)', border: 'none', borderRadius: 6,
                                padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer'
                            }}
                        >
                            {index + 1 >= cards.length ? 'See Results →' : 'Next Card →'}
                        </button>
                    </div>
                )}

                {error && <div style={{ color: ORANGE, fontSize: 13, marginTop: 12 }}>{error}</div>}
            </main>
        </div>
    );
}

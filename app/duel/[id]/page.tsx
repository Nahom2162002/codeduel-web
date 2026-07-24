'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';
import UpgradeBanner from '../../components/UpgradeBanner';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

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

interface Problem {
    _id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    examples: { input: string; output: string; explanation?: string }[];
    constraints: string[];
    hints: string[];
    starterCode: Record<string, string>;
    isPremium: boolean;
}

interface ProblemSummary {
    _id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

const LANGUAGES = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' }
];

const CATEGORY_LABELS: Record<string, string> = {
    arrays: 'Arrays',
    strings: 'Strings',
    trees: 'Trees',
    graphs: 'Graphs',
    'dynamic-programming': 'Dynamic Programming',
    'system-design': 'System Design'
};

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

function defineMonacoTheme(monaco: any) {
    monaco.editor.defineTheme('codeduel-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#14161b',
            'editor.foreground': '#e4e6ea',
            'editorLineNumber.foreground': '#585c68',
            'editorLineNumber.activeForeground': '#9aa0ac',
            'editor.lineHighlightBackground': '#1c1f2740',
            'editorCursor.foreground': '#7cd0f5',
            'editor.selectionBackground': '#7cd0f533',
            'editorGutter.background': '#14161b'
        }
    });
}

export default function DuelPage() {
    const { id } = useParams();
    const router = useRouter();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [problemList, setProblemList] = useState<ProblemSummary[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [limitReached, setLimitReached] = useState(false);
    const [hasHadTrial, setHasHadTrial] = useState(false);
    const [claudeDots, setClaudeDots] = useState(1);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        const loadData = async () => {
            try {
                const [problemRes, meRes, listRes] = await Promise.all([
                    fetch(`/api/problems/${id}`, {
                        headers: { authorization: `Bearer ${token}` }
                    }),
                    fetch('/api/user/me', {
                        headers: { authorization: `Bearer ${token}` }
                    }),
                    fetch('/api/problems', {
                        headers: { authorization: `Bearer ${token}` }
                    })
                ]);

                const problemData = await problemRes.json();
                const meData = await meRes.json();
                const listData = await listRes.json();

                if (problemData.error) {
                    setError(problemData.error);
                } else {
                    setProblem(problemData);
                    setCode(problemData.starterCode.python || '');
                }

                if (Array.isArray(listData)) setProblemList(listData);
                setHasHadTrial(meData.hasHadTrial ?? false);
                setLoading(false);
            } catch {
                setError('Failed to load problem');
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    // Animate "Claude is coding..." dots while a submission is in flight
    useEffect(() => {
        if (!submitting) return;
        const dotTimer = setInterval(() => {
            setClaudeDots(d => (d % 3) + 1);
        }, 500);
        return () => clearInterval(dotTimer);
    }, [submitting]);

    // Start timer when user first types
    const handleCodeChange = (value: string | undefined) => {
        setCode(value || '');
        if (!timerActive) {
            setTimerActive(true);
            startTimeRef.current = Date.now();
            timerRef.current = setInterval(() => {
                setTimer(Math.floor((Date.now() - startTimeRef.current) / 1000));
            }, 1000);
        }
    };

    // Change language
    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        if (problem) {
            setCode(problem.starterCode[lang] || '');
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const handleSubmit = async () => {
        if (!code.trim()) { setError('Please write your solution first'); return; }

        // Stop timer
        if (timerRef.current) clearInterval(timerRef.current);
        setTimerActive(false);
        setSubmitting(true);
        setError('');

        const token = localStorage.getItem('token');
        const userTime = timerActive ? Math.floor((Date.now() - startTimeRef.current) / 1000) : timer;

        try {
            const res = await fetch('/api/duels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    problemId: id,
                    language,
                    userCode: code,
                    userTime
                })
            });

            const data = await res.json();

            if (data.limitReached) {
                setLimitReached(true);
                setSubmitting(false);
                return;
            }

            if (data.error) {
                setError(data.error);
                setSubmitting(false);
                return;
            }

            // Navigate to results page
            router.push(`/results/${data.duelId}`);
        } catch {
            setError('Submission failed. Please try again.');
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading problem...
        </div>
    );

    if (error && !problem) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {error}
        </div>
    );

    if (!problem) return null;

    const diffBadge = diffColors(problem.difficulty);

    return (
        <div className={spaceGrotesk.className} style={{
            background: 'oklch(16% 0.02 260)',
            color: 'oklch(96% 0.01 260)',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box'
        }}>
            <nav style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 32px',
                borderBottom: '1px solid oklch(28% 0.02 260)',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <Link href="/problems" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'oklch(96% 0.01 260)', fontWeight: 700, fontSize: 17 }}>
                        <DuelIcon />
                        CodeDuel
                    </Link>
                    <div style={{ width: 1, height: 22, background: 'oklch(30% 0.02 260)' }} />

                    <div style={{ position: 'relative' }}>
                        <div
                            onClick={() => setMenuOpen(m => !m)}
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, userSelect: 'none' }}
                        >
                            {problem.title}
                            <span style={{ fontSize: 11, color: 'oklch(55% 0.02 260)', transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>▾</span>
                        </div>

                        {menuOpen && (
                            <>
                                <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
                                <div style={{
                                    position: 'absolute', top: 32, left: 0, width: 280,
                                    background: 'oklch(21% 0.02 260)', border: '1px solid oklch(32% 0.02 260)',
                                    borderRadius: 10, padding: 8, zIndex: 100,
                                    boxShadow: '0 12px 32px oklch(0% 0 0 / 0.5)', maxHeight: 340, overflowY: 'auto'
                                }}>
                                    {problemList.map(p => {
                                        const c = diffColors(p.difficulty);
                                        const active = p._id === id;
                                        return (
                                            <div
                                                key={p._id}
                                                onClick={() => { setMenuOpen(false); router.push(`/duel/${p._id}`); }}
                                                style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                                                    padding: '10px 12px', borderRadius: 6, cursor: 'pointer',
                                                    color: 'oklch(88% 0.02 260)', background: active ? BLUE_BG : 'transparent', fontSize: 14
                                                }}
                                            >
                                                <span>{p.title}</span>
                                                <span className={pressStart2P.className} style={{ fontSize: 7, padding: '4px 7px', borderRadius: 4, background: c.bg, color: c.color }}>
                                                    {p.difficulty.toUpperCase()}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    <Link
                                        href="/problems"
                                        style={{ display: 'block', textAlign: 'center', marginTop: 6, padding: 10, borderTop: '1px solid oklch(30% 0.02 260)', textDecoration: 'none', color: BLUE, fontSize: 13, fontWeight: 600 }}
                                    >
                                        View all problems →
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>

                    <span className={pressStart2P.className} style={{ fontSize: 8, padding: '5px 9px', borderRadius: 4, background: diffBadge.bg, color: diffBadge.color }}>
                        {problem.difficulty.toUpperCase()}
                    </span>
                    <span className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(55% 0.02 260)' }}>
                        {CATEGORY_LABELS[problem.category] || problem.category}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div className={pressStart2P.className} style={{
                        fontSize: 15, color: timerActive ? BLUE : 'oklch(65% 0.02 260)',
                        background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)',
                        padding: '8px 14px', borderRadius: 6
                    }}>
                        {formatTime(timer)}
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={spaceGrotesk.className}
                        style={{
                            background: submitting ? 'oklch(75% 0.15 220 / 0.5)' : BLUE,
                            color: 'oklch(16% 0.02 260)', border: 'none',
                            padding: '10px 20px', borderRadius: 6, fontWeight: 700, fontSize: 14,
                            cursor: submitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {submitting ? 'Dueling Claude...' : 'Submit ▸'}
                    </button>
                </div>
            </nav>

            <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
                <div style={{ width: '42%', overflowY: 'auto', padding: '28px 32px', borderRight: '1px solid oklch(28% 0.02 260)', boxSizing: 'border-box' }}>
                    <h1 style={{ fontSize: 22, margin: '0 0 16px', fontWeight: 700 }}>{problem.title}</h1>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: 'oklch(82% 0.02 260)', margin: '0 0 24px', whiteSpace: 'pre-wrap' }}>
                        {problem.description}
                    </p>

                    {problem.examples.map((ex, i) => (
                        <div key={i} style={{ marginBottom: i === problem.examples.length - 1 ? 28 : 20 }}>
                            <div className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(60% 0.02 260)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Example {i + 1}
                            </div>
                            <pre className={jetbrainsMono.className} style={{
                                margin: 0, background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)',
                                borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.6, color: 'oklch(88% 0.02 260)', whiteSpace: 'pre-wrap'
                            }}>
                                {`Input: ${ex.input}\nOutput: ${ex.output}`}{ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}
                            </pre>
                        </div>
                    ))}

                    <div style={{ marginBottom: 28 }}>
                        <div className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(60% 0.02 260)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Constraints
                        </div>
                        <ul className={jetbrainsMono.className} style={{ fontSize: 13, lineHeight: 1.9, color: 'oklch(75% 0.02 260)', margin: 0, paddingLeft: 20 }}>
                            {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>

                    {problem.hints.length > 0 && (
                        <div style={{ marginBottom: 20 }}>
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className={spaceGrotesk.className}
                                style={{
                                    padding: '6px 12px', borderRadius: 6, border: '1px solid oklch(32% 0.02 260)',
                                    background: 'transparent', color: 'oklch(80% 0.02 260)', fontSize: 12,
                                    cursor: 'pointer', marginBottom: 8
                                }}
                            >
                                {showHint ? 'Hide hint' : '💡 Show hint'}
                            </button>
                            {showHint && (
                                <div style={{
                                    background: ORANGE_BG, border: `1px solid oklch(75% 0.15 55 / 0.35)`,
                                    borderRadius: 8, padding: 12, fontSize: 13, color: ORANGE
                                }}>
                                    {problem.hints[0]}
                                </div>
                            )}
                        </div>
                    )}

                    {submitting && (
                        <div style={{
                            background: 'oklch(24% 0.03 55 / 0.3)', border: '1px solid oklch(75% 0.15 55 / 0.35)',
                            borderRadius: 10, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12
                        }}>
                            <span style={{ fontSize: 18 }}>🤖</span>
                            <div style={{ fontSize: 13.5, color: 'oklch(85% 0.02 260)' }}>
                                Claude is coding<span className={jetbrainsMono.className}>{'.'.repeat(claudeDots)}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid oklch(28% 0.02 260)', flexShrink: 0 }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {LANGUAGES.map(lang => (
                                <div
                                    key={lang.value}
                                    onClick={() => handleLanguageChange(lang.value)}
                                    className={jetbrainsMono.className}
                                    style={{
                                        cursor: 'pointer', padding: '7px 14px', borderRadius: 6, fontSize: 13.5,
                                        background: language === lang.value ? BLUE_BG : 'transparent',
                                        color: language === lang.value ? BLUE : 'oklch(65% 0.02 260)'
                                    }}
                                >
                                    {lang.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: 1, minHeight: 0 }}>
                        <MonacoEditor
                            height="100%"
                            language={language === 'cpp' ? 'cpp' : language}
                            value={code}
                            onChange={handleCodeChange}
                            theme="codeduel-dark"
                            beforeMount={defineMonacoTheme}
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                padding: { top: 16, bottom: 16 },
                                lineNumbers: 'on',
                                renderLineHighlight: 'all',
                                cursorBlinking: 'smooth',
                                smoothScrolling: true,
                                fontLigatures: true,
                                fontFamily: 'JetBrains Mono, Fira Code, monospace'
                            }}
                        />
                    </div>

                    {error && (
                        <div className={spaceGrotesk.className} style={{
                            padding: '12px 16px', background: ORANGE_BG, borderTop: '1px solid oklch(75% 0.15 55 / 0.35)',
                            color: ORANGE, fontSize: 13, flexShrink: 0
                        }}>
                            {error}
                        </div>
                    )}

                    {limitReached && (
                        <div style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24
                        }}>
                            <UpgradeBanner hasHadTrial={hasHadTrial} onClose={() => setLimitReached(false)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import UpgradeBanner from '../../components/UpgradeBanner';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(75% 0.15 220 / 0.18)';
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
    starterCode: Record<string, string>;
}

interface DrillProblem { _id: string; title: string; completed: boolean; }

interface TestCaseResult {
    input: unknown;
    expectedOutput: unknown;
    output: unknown;
    error: string | null;
    passed: boolean;
    isHidden: boolean;
}

interface SubmitResult {
    passed: boolean;
    testsPassed: number;
    totalTests: number;
    testCaseResults: TestCaseResult[];
    drillCompleted: boolean;
    allCompleted: boolean;
    streak: { current: number; best: number };
}

const LANGUAGES = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'csharp', label: 'C#' },
    { value: 'rust', label: 'Rust' },
    { value: 'go', label: 'Go' }
];

function diffColors(d: string) {
    if (d === 'easy') return { bg: BLUE_BG, color: BLUE };
    if (d === 'hard') return { bg: ORANGE_BG, color: ORANGE };
    return { bg: NEUTRAL_BG, color: NEUTRAL };
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

const formatValue = (v: unknown) => v === undefined ? '—' : JSON.stringify(v);

export default function DrillSolvePage() {
    const { id } = useParams();
    const router = useRouter();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [drillProblems, setDrillProblems] = useState<DrillProblem[]>([]);
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [requiresPro, setRequiresPro] = useState(false);
    const [hasHadTrial, setHasHadTrial] = useState(false);
    const [result, setResult] = useState<SubmitResult | null>(null);
    const [notInSet, setNotInSet] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        const loadData = async () => {
            try {
                const [problemRes, todayRes, meRes] = await Promise.all([
                    fetch(`/api/problems/${id}`, { headers: { authorization: `Bearer ${token}` } }),
                    fetch('/api/drills/today', { headers: { authorization: `Bearer ${token}` } }),
                    fetch('/api/user/me', { headers: { authorization: `Bearer ${token}` } })
                ]);
                const problemData = await problemRes.json();
                const todayData = await todayRes.json();
                const meData = await meRes.json();

                if (todayData.requiresPro) { setRequiresPro(true); setLoading(false); return; }

                if (problemData.error) {
                    setError(problemData.error);
                } else {
                    setProblem(problemData);
                    setCode(problemData.starterCode.python || '');
                }
                if (Array.isArray(todayData.problems)) {
                    setDrillProblems(todayData.problems);
                    if (!todayData.problems.some((p: DrillProblem) => p._id === id)) setNotInSet(true);
                }
                setHasHadTrial(meData.hasHadTrial ?? false);
                setLoading(false);
            } catch {
                setError('Failed to load problem');
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        if (problem) setCode(problem.starterCode[lang] || '');
    };

    const handleSubmit = async () => {
        if (!code.trim()) { setError('Please write your solution first'); return; }
        setSubmitting(true);
        setError('');
        setResult(null);

        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/drills/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify({ problemId: id, language, userCode: code })
            });
            const data = await res.json();

            if (data.requiresPro) { setRequiresPro(true); setSubmitting(false); return; }
            if (data.error) { setError(data.error); setSubmitting(false); return; }

            setResult(data);
            if (data.drillCompleted) {
                setDrillProblems(dp => dp.map(p => p._id === id ? { ...p, completed: true } : p));
            }
        } catch {
            setError('Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading problem...
        </div>
    );

    if (requiresPro) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <UpgradeBanner hasHadTrial={hasHadTrial} reason="drills" />
        </div>
    );

    if (error && !problem) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {error}
        </div>
    );

    if (!problem) return null;

    const diffBadge = diffColors(problem.difficulty);
    const position = drillProblems.findIndex(p => p._id === id) + 1;
    const nextIncomplete = drillProblems.find(p => p._id !== id && !p.completed);

    return (
        <div className={`${spaceGrotesk.className} drill-page`} style={{
            background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)',
            height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
            <style>{`
                @media (max-width: 1024px) {
                    .drill-page .drill-columns { flex-direction: column !important; overflow-y: auto !important; }
                    .drill-page .drill-problem-panel { width: 100% !important; border-right: none !important; border-bottom: 1px solid oklch(28% 0.02 260) !important; }
                }
            `}</style>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid oklch(28% 0.02 260)', flexShrink: 0 }}>
                <Link href="/drills" style={{ color: 'oklch(70% 0.02 260)', textDecoration: 'none', fontSize: 13.5 }}>
                    ← Back to Daily Drills
                </Link>
                <span className={jetbrainsMono.className} style={{ fontSize: 12, color: ORANGE }}>
                    🔥 Daily Drill{position > 0 ? ` · Problem ${position} of ${drillProblems.length}` : ''} · No ELO
                </span>
            </div>

            {notInSet && (
                <div style={{ background: ORANGE_BG, color: ORANGE, padding: '10px 20px', fontSize: 13, borderBottom: '1px solid oklch(75% 0.15 55 / 0.35)' }}>
                    This problem isn't part of today's drill set — solving it here won't count toward your streak.
                </div>
            )}

            <div className="drill-columns" style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                <div className="drill-problem-panel" style={{ width: '42%', overflowY: 'auto', borderRight: '1px solid oklch(28% 0.02 260)', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                            <span className={jetbrainsMono.className} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: diffBadge.bg, color: diffBadge.color, textTransform: 'capitalize' }}>
                                {problem.difficulty}
                            </span>
                        </div>
                        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>{problem.title}</h1>
                        <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'oklch(85% 0.02 260)', whiteSpace: 'pre-wrap' }}>{problem.description}</p>
                    </div>

                    {problem.examples.map((ex, i) => (
                        <div key={i} style={{ background: NEUTRAL_BG, borderRadius: 10, padding: 16 }}>
                            <p className={jetbrainsMono.className} style={{ fontSize: 11, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px' }}>Example {i + 1}</p>
                            <pre className={jetbrainsMono.className} style={{ margin: '0 0 4px', fontSize: 13, whiteSpace: 'pre-wrap' }}>Input: {ex.input}</pre>
                            <pre className={jetbrainsMono.className} style={{ margin: 0, fontSize: 13, whiteSpace: 'pre-wrap' }}>Output: {ex.output}</pre>
                            {ex.explanation && <p style={{ fontSize: 13, color: 'oklch(70% 0.02 260)', marginTop: 8 }}>{ex.explanation}</p>}
                        </div>
                    ))}

                    {problem.constraints?.length > 0 && (
                        <div>
                            <p className={jetbrainsMono.className} style={{ fontSize: 11, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px' }}>Constraints</p>
                            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, color: 'oklch(80% 0.02 260)', lineHeight: 1.8 }}>
                                {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                        </div>
                    )}

                    {result && (
                        <div style={{ borderTop: '1px solid oklch(28% 0.02 260)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ background: result.passed ? BLUE_BG : ORANGE_BG, borderRadius: 10, padding: '14px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 14.5, fontWeight: 600, color: result.passed ? BLUE : ORANGE }}>
                                        {result.passed ? 'Drill solved ✓' : `${result.testsPassed}/${result.totalTests} tests passed`}
                                    </span>
                                    {result.passed && (
                                        <span className={jetbrainsMono.className} style={{ fontSize: 12.5, color: BLUE }}>🔥 {result.streak.current} day streak</span>
                                    )}
                                </div>
                                {result.allCompleted && (
                                    <div style={{ marginTop: 10, fontSize: 13, color: BLUE }}>
                                        All 3 drills complete for today — nice work! Come back tomorrow.
                                    </div>
                                )}
                                {result.passed && !result.allCompleted && nextIncomplete && (
                                    <button
                                        onClick={() => router.push(`/drills/${nextIncomplete._id}`)}
                                        className={jetbrainsMono.className}
                                        style={{
                                            marginTop: 12, background: BLUE, color: 'oklch(16% 0.02 260)', border: 'none',
                                            borderRadius: 6, padding: '8px 16px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer'
                                        }}
                                    >
                                        Next Problem →
                                    </button>
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {result.testCaseResults.map((tc, i) => (
                                    <div key={i} style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 10, overflow: 'hidden' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderBottom: '1px solid oklch(30% 0.02 260)' }}>
                                            <span style={{ fontSize: 12.5, fontWeight: 600 }}>
                                                Test Case {i + 1}{tc.isHidden && (
                                                    <span className={jetbrainsMono.className} style={{ marginLeft: 8, fontSize: 10, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Hidden</span>
                                                )}
                                            </span>
                                            <span className={jetbrainsMono.className} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: tc.passed ? BLUE_BG : ORANGE_BG, color: tc.passed ? BLUE : ORANGE }}>
                                                {tc.passed ? '✓' : '✗'}
                                            </span>
                                        </div>
                                        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            <div>
                                                <p className={jetbrainsMono.className} style={{ fontSize: 10.5, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 4px' }}>Input</p>
                                                <pre className={jetbrainsMono.className} style={{ margin: 0, fontSize: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{formatValue(tc.input)}</pre>
                                            </div>
                                            <div>
                                                <p className={jetbrainsMono.className} style={{ fontSize: 10.5, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 4px' }}>Expected</p>
                                                <pre className={jetbrainsMono.className} style={{ margin: 0, fontSize: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{formatValue(tc.expectedOutput)}</pre>
                                            </div>
                                            <div>
                                                <p className={jetbrainsMono.className} style={{ fontSize: 10.5, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 4px' }}>Your Output</p>
                                                <pre className={jetbrainsMono.className} style={{ margin: 0, fontSize: 12, color: tc.error ? ORANGE : 'oklch(85% 0.02 260)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                    {tc.error || formatValue(tc.output)}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid oklch(28% 0.02 260)', flexShrink: 0, gap: 12 }}>
                        <div style={{ display: 'flex', gap: 4, overflowX: 'auto', minWidth: 0, flex: 1 }}>
                            {LANGUAGES.map(lang => (
                                <div
                                    key={lang.value}
                                    onClick={() => handleLanguageChange(lang.value)}
                                    className={jetbrainsMono.className}
                                    style={{
                                        cursor: 'pointer', padding: '7px 11px', borderRadius: 6, fontSize: 13, flexShrink: 0,
                                        background: language === lang.value ? BLUE_BG : 'transparent',
                                        color: language === lang.value ? BLUE : 'oklch(65% 0.02 260)'
                                    }}
                                >
                                    {lang.label}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className={jetbrainsMono.className}
                            style={{
                                background: submitting ? 'oklch(40% 0.02 260)' : ORANGE, color: 'oklch(16% 0.02 260)',
                                border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 700,
                                cursor: submitting ? 'default' : 'pointer'
                            }}
                        >
                            {submitting ? 'Running…' : 'Submit'}
                        </button>
                    </div>

                    <div style={{ flex: 1, minHeight: 0 }}>
                        <MonacoEditor
                            height="100%"
                            language={language}
                            value={code}
                            onChange={(v) => setCode(v || '')}
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
                        <div style={{ padding: '12px 16px', background: ORANGE_BG, borderTop: '1px solid oklch(75% 0.15 55 / 0.35)', color: ORANGE, fontSize: 13, flexShrink: 0 }}>
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

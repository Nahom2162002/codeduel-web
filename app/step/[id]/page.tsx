'use client';
import { useState, useEffect, useRef } from 'react';
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
const MAX_HINTS = 3;

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

interface TestCaseResult {
    input: unknown;
    expectedOutput: unknown;
    output: unknown;
    error: string | null;
    passed: boolean;
    isHidden: boolean;
}

interface SubmitResult {
    testsPassed: number;
    totalTests: number;
    passed: boolean;
    testCaseResults: TestCaseResult[];
    hintsUsed: number;
    correctnessScore: number;
    hintScore: number;
    totalScore: number;
    solutionCode: string;
    solutionExplanation: string;
}

const LANGUAGES = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' }
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

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 5 }}>
                <span style={{ color: 'oklch(75% 0.02 260)' }}>{label}</span>
                <span className={jetbrainsMono.className} style={{ color: BLUE }}>{value}/{max}</span>
            </div>
            <div style={{ height: 6, background: 'oklch(30% 0.02 260)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, (value / max) * 100)}%`, background: BLUE }} />
            </div>
        </div>
    );
}

export default function StepByStepPage() {
    const { id } = useParams();
    const router = useRouter();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [blocked, setBlocked] = useState<{ reason: 'requiresPro' | 'limitReached' | 'stepLimitReached'; message?: string } | null>(null);
    const [hasHadTrial, setHasHadTrial] = useState(false);
    const [hints, setHints] = useState<string[]>([]);
    const [hintLoading, setHintLoading] = useState(false);
    const [result, setResult] = useState<SubmitResult | null>(null);
    const initialHintRequested = useRef(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        const loadData = async () => {
            try {
                const [problemRes, meRes] = await Promise.all([
                    fetch(`/api/problems/${id}`, { headers: { authorization: `Bearer ${token}` } }),
                    fetch('/api/user/me', { headers: { authorization: `Bearer ${token}` } })
                ]);
                const problemData = await problemRes.json();
                const meData = await meRes.json();

                if (problemData.error) {
                    if (problemData.error === 'Pro plan required') setBlocked({ reason: 'requiresPro' });
                    else setError(problemData.error);
                } else {
                    setProblem(problemData);
                    setCode(problemData.starterCode.python || '');
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

    const requestHint = async (hintNumber: number) => {
        setHintLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/step/hint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify({ problemId: id, hintNumber })
            });
            const data = await res.json();

            if (data.requiresPro) { setBlocked({ reason: 'requiresPro' }); return; }
            if (data.stepLimitReached) { setBlocked({ reason: 'stepLimitReached', message: data.error }); return; }
            if (data.limitReached) { setBlocked({ reason: 'limitReached', message: data.error }); return; }
            if (data.hint) setHints(h => [...h, data.hint]);
        } catch {
            // Silent — the initial hint is a convenience; the editor is still usable without it.
        } finally {
            setHintLoading(false);
        }
    };

    // Claude gives the first hint unprompted the moment the problem loads —
    // that's what makes this a tutor rather than an opt-in hint button.
    useEffect(() => {
        if (problem && !initialHintRequested.current) {
            initialHintRequested.current = true;
            requestHint(1);
        }
    }, [problem]);

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
            const res = await fetch('/api/step/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify({ problemId: id, language, userCode: code, hintsUsed: hints.length })
            });
            const data = await res.json();

            if (data.requiresPro) { setBlocked({ reason: 'requiresPro' }); setSubmitting(false); return; }
            if (data.stepLimitReached) { setBlocked({ reason: 'stepLimitReached', message: data.error }); setSubmitting(false); return; }
            if (data.limitReached) { setBlocked({ reason: 'limitReached', message: data.error }); setSubmitting(false); return; }
            if (data.error) { setError(data.error); setSubmitting(false); return; }

            setResult(data);
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

    if (blocked) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            {blocked.reason === 'requiresPro' ? (
                <UpgradeBanner hasHadTrial={hasHadTrial} reason="problem" />
            ) : (
                <div style={{ maxWidth: 440, textAlign: 'center' }}>
                    <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>
                        {blocked.reason === 'stepLimitReached' ? 'Step by Step limit reached' : "You've hit your daily limit"}
                    </div>
                    <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{blocked.message}</p>
                    <UpgradeBanner hasHadTrial={hasHadTrial} reason="limit" />
                </div>
            )}
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
        <div className={`${spaceGrotesk.className} step-page`} style={{
            background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)',
            height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
            <style>{`
                @media (max-width: 1024px) {
                    .step-page .step-columns { flex-direction: column !important; overflow-y: auto !important; }
                    .step-page .step-problem-panel { width: 100% !important; border-right: none !important; border-bottom: 1px solid oklch(28% 0.02 260) !important; }
                }
            `}</style>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid oklch(28% 0.02 260)', flexShrink: 0 }}>
                <Link href="/problems" style={{ color: 'oklch(70% 0.02 260)', textDecoration: 'none', fontSize: 13.5 }}>
                    ← Back to Problems
                </Link>
                <span className={jetbrainsMono.className} style={{ fontSize: 12, color: BLUE }}>🎓 Step by Step · Claude is tutoring, not racing · No ELO</span>
            </div>

            <div className="step-columns" style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                <div className="step-problem-panel" style={{ width: '42%', overflowY: 'auto', borderRight: '1px solid oklch(28% 0.02 260)', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
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

                    <div style={{ borderTop: '1px solid oklch(28% 0.02 260)', paddingTop: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <p className={jetbrainsMono.className} style={{ fontSize: 11, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>Claude's Hints</p>
                            {hints.length < MAX_HINTS && (
                                <button
                                    onClick={() => requestHint(hints.length + 1)}
                                    disabled={hintLoading}
                                    className={jetbrainsMono.className}
                                    style={{
                                        fontSize: 12, padding: '6px 12px', borderRadius: 6, border: `1px solid ${BLUE}66`,
                                        background: 'transparent', color: hintLoading ? 'oklch(50% 0.02 260)' : BLUE,
                                        cursor: hintLoading ? 'default' : 'pointer'
                                    }}
                                >
                                    {hintLoading ? 'Thinking…' : hints.length === 0 ? 'Get first hint' : `Next Hint ${hints.length + 1}/${MAX_HINTS}`}
                                </button>
                            )}
                        </div>
                        {hints.map((h, i) => (
                            <div key={i} style={{ background: BLUE_BG, borderRadius: 8, padding: '12px 14px', fontSize: 13.5, color: 'oklch(90% 0.02 260)', lineHeight: 1.6, marginBottom: 8 }}>
                                <span className={jetbrainsMono.className} style={{ fontSize: 10.5, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Hint {i + 1}</span>
                                <div style={{ marginTop: 4 }}>{h}</div>
                            </div>
                        ))}
                        {hints.length === 0 && !hintLoading && (
                            <p style={{ fontSize: 13, color: 'oklch(55% 0.02 260)' }}>Claude is thinking of a starting point…</p>
                        )}
                        <p style={{ fontSize: 12, color: 'oklch(55% 0.02 260)', marginTop: 10 }}>
                            Fewer hints used means a higher score — but it never affects your ELO.
                        </p>
                    </div>

                    {result && (
                        <div style={{ borderTop: '1px solid oklch(28% 0.02 260)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ background: result.passed ? BLUE_BG : ORANGE_BG, borderRadius: 10, padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                    <span style={{ fontSize: 14.5, fontWeight: 600, color: result.passed ? BLUE : ORANGE }}>
                                        {result.passed ? 'All tests passed' : `${result.testsPassed}/${result.totalTests} tests passed`}
                                    </span>
                                    <span className={jetbrainsMono.className} style={{ fontSize: 16, fontWeight: 700, color: BLUE }}>
                                        {result.totalScore}/100
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <ScoreBar label="Correctness" value={result.correctnessScore} max={70} />
                                    <ScoreBar label={`Hint Efficiency (${result.hintsUsed} used)`} value={result.hintScore} max={30} />
                                </div>
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

                            <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 10, padding: 18 }}>
                                <p className={jetbrainsMono.className} style={{ fontSize: 11, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 10px' }}>Full Solution</p>
                                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'oklch(85% 0.02 260)', margin: '0 0 14px' }}>{result.solutionExplanation}</p>
                                <pre className={jetbrainsMono.className} style={{
                                    margin: 0, fontSize: 12.5, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                    background: 'oklch(16% 0.02 260)', borderRadius: 8, padding: 14, color: 'oklch(88% 0.02 260)', overflowX: 'auto'
                                }}>{result.solutionCode}</pre>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid oklch(28% 0.02 260)', flexShrink: 0 }}>
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
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className={jetbrainsMono.className}
                            style={{
                                background: submitting ? 'oklch(40% 0.02 260)' : BLUE, color: 'oklch(16% 0.02 260)',
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

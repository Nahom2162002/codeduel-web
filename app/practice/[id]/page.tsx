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
const MAX_HINTS = 3;
const MAX_ATTEMPTS = 3;

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
    attemptNumber: number;
    solutionRevealed: boolean;
    hintsUsed?: number;
    correctnessScore?: number;
    hintScore?: number;
    totalScore?: number;
    solutionCode?: string;
    solutionExplanation?: string;
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

export default function PracticeSolvePage() {
    const { id } = useParams();
    const router = useRouter();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [blocked, setBlocked] = useState<{ reason: 'requiresPro' | 'limitReached' | 'practiceLimitReached'; message?: string } | null>(null);
    const [hasHadTrial, setHasHadTrial] = useState(false);
    const [hints, setHints] = useState<string[]>([]);
    const [hintLoading, setHintLoading] = useState(false);
    const [result, setResult] = useState<SubmitResult | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [revealing, setRevealing] = useState(false);
    const [activeTab, setActiveTab] = useState<'problem' | 'result'>('problem');

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
            const res = await fetch('/api/practice/hint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify({ problemId: id, hintNumber })
            });
            const data = await res.json();

            if (data.requiresPro) { setBlocked({ reason: 'requiresPro' }); return; }
            if (data.practiceLimitReached) { setBlocked({ reason: 'practiceLimitReached', message: data.error }); return; }
            if (data.limitReached) { setBlocked({ reason: 'limitReached', message: data.error }); return; }
            if (data.hint) setHints(h => [...h, data.hint]);
        } catch {
            // Silent — the initial hint is a convenience; the editor is still usable without it.
        } finally {
            setHintLoading(false);
        }
    };

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        if (problem) setCode(problem.starterCode[lang] || '');
    };

    // Shared by the Submit and Solution buttons — a "Solution" click still
    // runs the current code through the same submit pipeline, it just forces
    // the terminal (solution-revealing) path early instead of waiting for a
    // pass or the 3rd attempt. See app/api/practice/submit for the gating.
    const submitAttempt = async (forceReveal: boolean) => {
        if (!code.trim()) { setError('Please write your solution first'); return; }
        const nextAttempt = attempts + 1;
        if (forceReveal) setRevealing(true); else setSubmitting(true);
        setError('');

        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/practice/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    problemId: id, language, userCode: code, hintsUsed: hints.length,
                    attemptNumber: nextAttempt, forceReveal
                })
            });
            const data = await res.json();

            if (data.requiresPro) { setBlocked({ reason: 'requiresPro' }); return; }
            if (data.practiceLimitReached) { setBlocked({ reason: 'practiceLimitReached', message: data.error }); return; }
            if (data.limitReached) { setBlocked({ reason: 'limitReached', message: data.error }); return; }
            if (data.error) { setError(data.error); return; }

            setAttempts(nextAttempt);
            setResult(data);
            setActiveTab('result');
        } catch {
            setError('Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
            setRevealing(false);
        }
    };

    const handleSubmit = () => submitAttempt(false);
    const handleRevealSolution = () => submitAttempt(true);

    const handleNext = () => {
        router.push('/practice');
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
                        {blocked.reason === 'practiceLimitReached' ? 'Guided Practice limit reached' : "You've hit your daily limit"}
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
    const solutionRevealed = result?.solutionRevealed === true;

    return (
        <div className={`${spaceGrotesk.className} practice-page`} style={{
            background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)',
            height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
            <style>{`
                @media (max-width: 1024px) {
                    .practice-page .practice-columns { flex-direction: column !important; overflow-y: auto !important; }
                    .practice-page .practice-problem-panel { width: 100% !important; border-right: none !important; border-bottom: 1px solid oklch(28% 0.02 260) !important; }
                }
            `}</style>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid oklch(28% 0.02 260)', flexShrink: 0 }}>
                <Link href="/practice" style={{ color: 'oklch(70% 0.02 260)', textDecoration: 'none', fontSize: 13.5 }}>
                    ← Back to Practice
                </Link>
                <span className={jetbrainsMono.className} style={{ fontSize: 12, color: BLUE }}>🎓 Guided Practice · Claude is tutoring, not racing · No ELO</span>
            </div>

            <div className="practice-columns" style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                <div className="practice-problem-panel" style={{ width: '42%', display: 'flex', flexDirection: 'column', minHeight: 0, borderRight: '1px solid oklch(28% 0.02 260)' }}>
                    <div style={{ display: 'flex', gap: 4, padding: '10px 20px 0', borderBottom: '1px solid oklch(28% 0.02 260)', flexShrink: 0 }}>
                        {(['problem', 'result'] as const).map(tab => (
                            <div
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={jetbrainsMono.className}
                                style={{
                                    cursor: 'pointer', padding: '8px 16px', fontSize: 13, fontWeight: 600,
                                    color: activeTab === tab ? BLUE : 'oklch(60% 0.02 260)',
                                    borderBottom: activeTab === tab ? `2px solid ${BLUE}` : '2px solid transparent',
                                    marginBottom: -1
                                }}
                            >
                                {tab === 'problem' ? 'Problem' : `Results${result ? ` (${result.solutionRevealed ? `${result.totalScore}/100` : `${result.testsPassed}/${result.totalTests}`})` : ''}`}
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
                        {activeTab === 'problem' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                                                {hintLoading ? 'Thinking…' : `Get Hint ${hints.length + 1}/${MAX_HINTS}`}
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
                                        <p style={{ fontSize: 13, color: 'oklch(55% 0.02 260)' }}>Stuck? Hints never affect anything — ask away.</p>
                                    )}
                                    <p style={{ fontSize: 12, color: 'oklch(55% 0.02 260)', marginTop: 10 }}>
                                        Fewer hints used means a higher score — but it never affects your ELO.
                                    </p>
                                </div>
                            </div>
                        ) : result ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ background: result.passed ? BLUE_BG : ORANGE_BG, borderRadius: 10, padding: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: 14.5, fontWeight: 600, color: result.passed ? BLUE : ORANGE }}>
                                            {result.passed ? 'All tests passed' : `${result.testsPassed}/${result.totalTests} tests passed`}
                                        </span>
                                        {result.solutionRevealed && (
                                            <span className={jetbrainsMono.className} style={{ fontSize: 16, fontWeight: 700, color: BLUE }}>
                                                {result.totalScore}/100
                                            </span>
                                        )}
                                    </div>

                                    {result.solutionRevealed ? (
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                                                <ScoreBar label="Correctness" value={result.correctnessScore!} max={70} />
                                                <ScoreBar label={`Hint Efficiency (${result.hintsUsed} used)`} value={result.hintScore!} max={30} />
                                            </div>
                                            <button onClick={handleNext} className={jetbrainsMono.className} style={{
                                                background: BLUE, color: 'oklch(16% 0.02 260)', border: 'none', borderRadius: 6,
                                                padding: '8px 16px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', marginTop: 14
                                            }}>
                                                Next Problem →
                                            </button>
                                        </>
                                    ) : (
                                        <p style={{ fontSize: 13, color: 'oklch(75% 0.02 260)', margin: '10px 0 0', lineHeight: 1.6 }}>
                                            {MAX_ATTEMPTS - result.attemptNumber} attempt{MAX_ATTEMPTS - result.attemptNumber === 1 ? '' : 's'} left before Claude shows the solution.
                                            Keep trying, or reveal it now from the editor.
                                        </p>
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

                                {result.solutionRevealed && (
                                    <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 10, padding: 18 }}>
                                        <p className={jetbrainsMono.className} style={{ fontSize: 11, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 10px' }}>Solution Walkthrough</p>
                                        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'oklch(85% 0.02 260)', margin: '0 0 14px' }}>{result.solutionExplanation}</p>
                                        <pre className={jetbrainsMono.className} style={{
                                            margin: 0, fontSize: 12.5, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                            background: 'oklch(16% 0.02 260)', borderRadius: 8, padding: 14, color: 'oklch(88% 0.02 260)', overflowX: 'auto'
                                        }}>{result.solutionCode}</pre>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: 'oklch(55% 0.02 260)', fontSize: 13.5 }}>
                                Submit your solution to see results here.
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid oklch(28% 0.02 260)', flexShrink: 0, gap: 12 }}>
                        <select
                            value={language}
                            onChange={e => handleLanguageChange(e.target.value)}
                            className={jetbrainsMono.className}
                            style={{
                                background: 'oklch(16% 0.02 260)', border: '1px solid oklch(35% 0.02 260)', borderRadius: 6,
                                padding: '8px 12px', color: BLUE, fontSize: 13, fontWeight: 600, cursor: 'pointer'
                            }}
                        >
                            {LANGUAGES.map(lang => <option key={lang.value} value={lang.value}>{lang.label}</option>)}
                        </select>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            {!solutionRevealed && attempts > 0 && (
                                <span className={jetbrainsMono.className} style={{ fontSize: 12, color: 'oklch(60% 0.02 260)' }}>
                                    Attempt {attempts}/{MAX_ATTEMPTS}
                                </span>
                            )}
                            {attempts > 0 && !solutionRevealed && (
                                <button
                                    onClick={handleRevealSolution}
                                    disabled={submitting || revealing}
                                    className={jetbrainsMono.className}
                                    style={{
                                        background: 'transparent', color: revealing ? 'oklch(50% 0.02 260)' : ORANGE,
                                        border: `1px solid ${ORANGE}66`, borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 700,
                                        cursor: submitting || revealing ? 'default' : 'pointer'
                                    }}
                                >
                                    {revealing ? 'Revealing…' : 'Solution'}
                                </button>
                            )}
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || revealing || solutionRevealed}
                                className={jetbrainsMono.className}
                                style={{
                                    background: submitting || solutionRevealed ? 'oklch(40% 0.02 260)' : BLUE, color: 'oklch(16% 0.02 260)',
                                    border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 700,
                                    cursor: submitting || revealing || solutionRevealed ? 'default' : 'pointer'
                                }}
                            >
                                {submitting ? 'Running…' : 'Submit'}
                            </button>
                        </div>
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

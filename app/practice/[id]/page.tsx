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
    solutionCode: string;
    solutionExplanation: string;
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

export default function PracticeSolvePage() {
    const { id } = useParams();
    const router = useRouter();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [requiresPro, setRequiresPro] = useState(false);
    const [hasHadTrial, setHasHadTrial] = useState(false);
    const [hints, setHints] = useState<string[]>([]);
    const [hintLoading, setHintLoading] = useState(false);
    const [result, setResult] = useState<SubmitResult | null>(null);
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
                    setError(problemData.error);
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

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        if (problem) setCode(problem.starterCode[lang] || '');
    };

    const handleHint = async () => {
        if (hints.length >= 3 || hintLoading) return;
        setHintLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/practice/hint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify({ problemId: id, hintNumber: hints.length + 1 })
            });
            const data = await res.json();
            if (data.requiresPro) { setRequiresPro(true); return; }
            if (data.hint) setHints(h => [...h, data.hint]);
        } catch {
            // Silent — hints are a convenience, not required for submission.
        } finally {
            setHintLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!code.trim()) { setError('Please write your solution first'); return; }
        setSubmitting(true);
        setError('');
        setResult(null);

        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/practice/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify({ problemId: id, language, userCode: code })
            });
            const data = await res.json();

            if (data.requiresPro) { setRequiresPro(true); setSubmitting(false); return; }
            if (data.error) { setError(data.error); setSubmitting(false); return; }

            setResult(data);
            setActiveTab('result');
        } catch {
            setError('Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleNext = () => {
        router.push('/practice');
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
                <span className={jetbrainsMono.className} style={{ fontSize: 12, color: BLUE }}>Guided Practice · No ELO on the line</span>
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
                                {tab === 'problem' ? 'Problem' : `Results${result ? ` (${result.testsPassed}/${result.totalTests})` : ''}`}
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
                                        <p className={jetbrainsMono.className} style={{ fontSize: 11, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>Hints</p>
                                        <button
                                            onClick={handleHint}
                                            disabled={hints.length >= 3 || hintLoading}
                                            className={jetbrainsMono.className}
                                            style={{
                                                fontSize: 12, padding: '6px 12px', borderRadius: 6, border: `1px solid ${BLUE}66`,
                                                background: 'transparent', color: hints.length >= 3 ? 'oklch(50% 0.02 260)' : BLUE,
                                                cursor: hints.length >= 3 || hintLoading ? 'default' : 'pointer'
                                            }}
                                        >
                                            {hintLoading ? 'Thinking…' : hints.length >= 3 ? 'No more hints' : `Get Hint ${hints.length + 1}/3`}
                                        </button>
                                    </div>
                                    {hints.map((h, i) => (
                                        <div key={i} style={{ background: BLUE_BG, borderRadius: 8, padding: '12px 14px', fontSize: 13.5, color: 'oklch(90% 0.02 260)', lineHeight: 1.6, marginBottom: 8 }}>
                                            {h}
                                        </div>
                                    ))}
                                    {hints.length === 0 && (
                                        <p style={{ fontSize: 13, color: 'oklch(55% 0.02 260)' }}>Stuck? Hints never affect anything — ask away.</p>
                                    )}
                                </div>
                            </div>
                        ) : result ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    background: result.passed ? BLUE_BG : ORANGE_BG, borderRadius: 10, padding: '14px 16px'
                                }}>
                                    <span style={{ fontSize: 14.5, fontWeight: 600, color: result.passed ? BLUE : ORANGE }}>
                                        {result.passed ? 'All tests passed' : `${result.testsPassed}/${result.totalTests} tests passed`}
                                    </span>
                                    <button onClick={handleNext} className={jetbrainsMono.className} style={{
                                        background: BLUE, color: 'oklch(16% 0.02 260)', border: 'none', borderRadius: 6,
                                        padding: '8px 16px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer'
                                    }}>
                                        Next Problem →
                                    </button>
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
                                    <p className={jetbrainsMono.className} style={{ fontSize: 11, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 10px' }}>Solution Walkthrough</p>
                                    <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'oklch(85% 0.02 260)', margin: '0 0 14px' }}>{result.solutionExplanation}</p>
                                    <pre className={jetbrainsMono.className} style={{
                                        margin: 0, fontSize: 12.5, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                        background: 'oklch(16% 0.02 260)', borderRadius: 8, padding: 14, color: 'oklch(88% 0.02 260)', overflowX: 'auto'
                                    }}>{result.solutionCode}</pre>
                                </div>
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

            {requiresPro && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }}>
                    <UpgradeBanner hasHadTrial={hasHadTrial} reason="practice" onClose={() => setRequiresPro(false)} />
                </div>
            )}
        </div>
    );
}

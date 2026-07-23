'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../../components/Navbar';
import UpgradeBanner from '../../components/UpgradeBanner';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

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

const DIFFICULTY_COLORS = {
    easy: '#00ff87',
    medium: '#ffd93d',
    hard: '#ff4d4d'
};

const LANGUAGES = ['python', 'javascript', 'java'];

export default function DuelPage() {
    const { id } = useParams();
    const router = useRouter();
    const [problem, setProblem] = useState<Problem | null>(null);
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
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        const loadData = async () => {
            try {
                const [problemRes, meRes] = await Promise.all([
                    fetch(`/api/problems/${id}`, {
                        headers: { authorization: `Bearer ${token}` }
                    }),
                    fetch('/api/user/me', {
                        headers: { authorization: `Bearer ${token}` }
                    })
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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'var(--text-muted)' }}>Loading problem...</div>
        </div>
    );

    if (error && !problem) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'var(--loss)' }}>{error}</div>
        </div>
    );

    if (!problem) return null;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* Top bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 24px',
                borderBottom: '1px solid var(--border)',
                background: 'var(--surface)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{problem.title}</span>
                    <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: DIFFICULTY_COLORS[problem.difficulty],
                        textTransform: 'capitalize'
                    }}>
                        {problem.difficulty}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {/* Timer */}
                    <div style={{
                        fontFamily: 'monospace',
                        fontSize: 18,
                        fontWeight: 700,
                        color: timerActive ? 'var(--green)' : 'var(--text-muted)',
                        minWidth: 60
                    }}>
                        {formatTime(timer)}
                    </div>

                    {/* Language selector */}
                    <div style={{ display: 'flex', gap: 4 }}>
                        {LANGUAGES.map(lang => (
                            <button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                style={{
                                    padding: '5px 10px',
                                    borderRadius: 6,
                                    border: '1px solid var(--border)',
                                    background: language === lang ? 'rgba(0,255,135,0.15)' : 'transparent',
                                    color: language === lang ? 'var(--green)' : 'var(--text-muted)',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    fontWeight: language === lang ? 600 : 400
                                }}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        style={{
                            padding: '8px 20px',
                            borderRadius: 8,
                            border: 'none',
                            background: submitting
                                ? 'rgba(0,255,135,0.3)'
                                : 'linear-gradient(135deg, #00ff87, #00cc6a)',
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: submitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {submitting ? 'Dueling Claude...' : '⚔️ Submit & Duel'}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Problem panel */}
                <div style={{
                    width: '40%',
                    borderRight: '1px solid var(--border)',
                    overflowY: 'auto',
                    padding: '24px'
                }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{problem.title}</h2>

                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: 14,
                        lineHeight: 1.7,
                        marginBottom: 24,
                        whiteSpace: 'pre-wrap'
                    }}>
                        {problem.description}
                    </p>

                    {/* Examples */}
                    <div style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Examples
                        </h3>
                        {problem.examples.map((ex, i) => (
                            <div key={i} style={{
                                background: 'var(--surface2)',
                                border: '1px solid var(--border)',
                                borderRadius: 8,
                                padding: '12px',
                                marginBottom: 10,
                                fontSize: 13
                            }}>
                                <p style={{ margin: '0 0 4px', color: 'var(--text-muted)' }}>
                                    <strong style={{ color: 'white' }}>Input:</strong> {ex.input}
                                </p>
                                <p style={{ margin: '0 0 4px', color: 'var(--text-muted)' }}>
                                    <strong style={{ color: 'white' }}>Output:</strong> {ex.output}
                                </p>
                                {ex.explanation && (
                                    <p style={{ margin: 0, color: 'var(--text-subtle)', fontSize: 12 }}>
                                        {ex.explanation}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Constraints */}
                    <div style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Constraints
                        </h3>
                        <ul style={{ paddingLeft: 20, margin: 0 }}>
                            {problem.constraints.map((c, i) => (
                                <li key={i} style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 4 }}>
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Hints */}
                    {problem.hints.length > 0 && (
                        <div>
                            <button
                                onClick={() => setShowHint(!showHint)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: 6,
                                    border: '1px solid var(--border)',
                                    background: 'transparent',
                                    color: 'var(--text-muted)',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    marginBottom: 8
                                }}
                            >
                                {showHint ? 'Hide hint' : '💡 Show hint'}
                            </button>
                            {showHint && (
                                <div style={{
                                    background: 'rgba(255,217,61,0.08)',
                                    border: '1px solid rgba(255,217,61,0.2)',
                                    borderRadius: 8,
                                    padding: '12px',
                                    fontSize: 13,
                                    color: '#ffd93d'
                                }}>
                                    {problem.hints[0]}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Editor panel */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <MonacoEditor
                        height="100%"
                        language={language === 'cpp' ? 'cpp' : language}
                        value={code}
                        onChange={handleCodeChange}
                        theme="vs-dark"
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

                    {error && (
                        <div style={{
                            padding: '12px 16px',
                            background: 'rgba(255,77,77,0.1)',
                            borderTop: '1px solid rgba(255,77,77,0.3)',
                            color: 'var(--loss)',
                            fontSize: 13
                        }}>
                            {error}
                        </div>
                    )}

                    {limitReached && (
                        <div style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.85)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: 24
                        }}>
                            <UpgradeBanner hasHadTrial={hasHadTrial} onClose={() => setLimitReached(false)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
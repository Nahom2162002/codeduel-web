'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import UserMenu from '../components/UserMenu';
import UpgradeBanner from '../components/UpgradeBanner';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(75% 0.15 220 / 0.18)';
const NEUTRAL_BG = 'oklch(40% 0.02 260 / 0.4)';
const NEUTRAL = 'oklch(85% 0.02 260)';

const LANGUAGE_OPTIONS = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'Go', 'Rust', 'C#', 'Other'];
const MONACO_LANG: Record<string, string> = {
    Python: 'python', JavaScript: 'javascript', TypeScript: 'typescript', Java: 'java',
    'C++': 'cpp', C: 'c', Go: 'go', Rust: 'rust', 'C#': 'csharp'
};

interface Me { username: string; plan: string; hasHadTrial?: boolean; isTrialing?: boolean; }
interface ProblemSummary { _id: string; title: string; difficulty: string; }
interface SessionSummary { _id: string; problemTitle: string; language: string; roundCount: number; updatedAt: string; }
interface Round { code: string; review: string; submittedAt: string; }

function defineMonacoTheme(monaco: any) {
    monaco.editor.defineTheme('codeduel-dark', {
        base: 'vs-dark', inherit: true, rules: [],
        colors: {
            'editor.background': '#14161b', 'editor.foreground': '#e4e6ea',
            'editorLineNumber.foreground': '#585c68', 'editorLineNumber.activeForeground': '#9aa0ac',
            'editor.lineHighlightBackground': '#1c1f2740', 'editorCursor.foreground': '#7cd0f5',
            'editor.selectionBackground': '#7cd0f533', 'editorGutter.background': '#14161b'
        }
    });
}

function DuelIcon({ size = 22 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

type Phase = 'landing' | 'workspace';

export default function ReviewPage() {
    const router = useRouter();
    const [me, setMe] = useState<Me | null>(null);
    const [requiresPro, setRequiresPro] = useState(false);
    const [loading, setLoading] = useState(true);
    const [phase, setPhase] = useState<Phase>('landing');
    const [error, setError] = useState('');

    const [pastSessions, setPastSessions] = useState<SessionSummary[]>([]);
    const [problems, setProblems] = useState<ProblemSummary[]>([]);
    const [pickerMode, setPickerMode] = useState<'existing' | 'custom'>('existing');
    const [problemSearch, setProblemSearch] = useState('');
    const [selectedProblemId, setSelectedProblemId] = useState('');
    const [customTitle, setCustomTitle] = useState('');
    const [customDescription, setCustomDescription] = useState('');
    const [language, setLanguage] = useState('Python');
    const [customLanguage, setCustomLanguage] = useState('');
    const [starting, setStarting] = useState(false);

    const [sessionId, setSessionId] = useState('');
    const [problemTitle, setProblemTitle] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [sessionLanguage, setSessionLanguage] = useState('Python');
    const [code, setCode] = useState('');
    const [rounds, setRounds] = useState<Round[]>([]);
    const [reviewing, setReviewing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        Promise.all([
            fetch('/api/user/me', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json()),
            fetch('/api/review/sessions', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json()),
            fetch('/api/problems', { headers: { authorization: `Bearer ${token}` } }).then(res => res.json())
        ]).then(([userData, sessionsData, problemsData]) => {
            if (userData.username) setMe(userData);
            if (sessionsData.requiresPro) setRequiresPro(true);
            else if (Array.isArray(sessionsData.sessions)) setPastSessions(sessionsData.sessions);
            if (Array.isArray(problemsData)) setProblems(problemsData);
            setLoading(false);
        }).catch(() => {
            setError('Failed to load Code Review');
            setLoading(false);
        });
    }, []);

    const startSession = async () => {
        setStarting(true);
        setError('');
        const token = localStorage.getItem('token');
        const lang = language === 'Other' ? customLanguage.trim() : language;
        if (!lang) { setError('Please specify a language'); setStarting(false); return; }

        const body: any = { language: lang };
        if (pickerMode === 'existing') {
            if (!selectedProblemId) { setError('Please select a problem'); setStarting(false); return; }
            body.problemId = selectedProblemId;
        } else {
            if (!customTitle.trim() || !customDescription.trim()) { setError('Please fill in the problem title and description'); setStarting(false); return; }
            body.customTitle = customTitle;
            body.customDescription = customDescription;
        }

        try {
            const res = await fetch('/api/review/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (data.requiresPro) { setRequiresPro(true); setStarting(false); return; }
            if (data.error) { setError(data.error); setStarting(false); return; }

            setSessionId(data.sessionId);
            setProblemTitle(data.problemTitle);
            setProblemDescription(data.problemDescription);
            setSessionLanguage(data.language);
            setCode('');
            setRounds([]);
            setPhase('workspace');
        } catch {
            setError('Failed to start review session');
        } finally {
            setStarting(false);
        }
    };

    const resumeSession = async (id: string) => {
        setError('');
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/review/${id}`, { headers: { authorization: `Bearer ${token}` } });
            const data = await res.json();
            if (data.error) { setError(data.error); return; }
            setSessionId(data.sessionId);
            setProblemTitle(data.problemTitle);
            setProblemDescription(data.problemDescription);
            setSessionLanguage(data.language);
            setRounds(data.rounds);
            setCode(data.rounds[data.rounds.length - 1]?.code || '');
            setPhase('workspace');
        } catch {
            setError('Failed to resume session');
        }
    };

    const getReview = async () => {
        if (!code.trim()) { setError('Please paste or write your code first'); return; }
        setReviewing(true);
        setError('');
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/review/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
                body: JSON.stringify({ sessionId, code })
            });
            const data = await res.json();
            if (data.requiresPro) { setRequiresPro(true); setReviewing(false); return; }
            if (data.error) { setError(data.error); setReviewing(false); return; }

            setRounds(r => [...r, { code, review: data.review, submittedAt: new Date().toISOString() }]);
        } catch {
            setError('Failed to get review');
        } finally {
            setReviewing(false);
        }
    };

    const filteredProblems = problems.filter(p => p.title.toLowerCase().includes(problemSearch.toLowerCase())).slice(0, 30);

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
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 14.5, fontWeight: 500 }}>
                    <Link href="/problems" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Problems</Link>
                    <Link href="/dashboard" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Dashboard</Link>
                    <Link href="/practice" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Practice</Link>
                    <Link href="/drills" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Drills</Link>
                    <Link href="/flashcards" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Flashcards</Link>
                    <Link href="/review" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none', borderBottom: `2px solid ${BLUE}`, paddingBottom: 4 }}>Code Review</Link>
                    <Link href="/rules" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Rules</Link>
                    <Link href="/leaderboard" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Leaderboard</Link>
                </div>
            </div>
            {me && <UserMenu username={me.username} plan={me.plan} hasHadTrial={me.hasHadTrial} isTrialing={me.isTrialing} />}
        </nav>
    );

    if (loading) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading Code Review...
        </div>
    );

    if (requiresPro) return (
        <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
            {nav}
            <main style={{ maxWidth: 1120, margin: '0 auto', padding: '80px 24px' }}>
                <UpgradeBanner hasHadTrial={me?.hasHadTrial} reason="review" />
            </main>
        </div>
    );

    if (phase === 'landing') {
        return (
            <div className={spaceGrotesk.className} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
                {nav}
                <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
                    <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>Code Review Mode</h1>
                    <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 15.5, marginBottom: 32, lineHeight: 1.6 }}>
                        Paste code you've already written — from here, LeetCode, an interview, or your day job — and Claude reviews it on
                        complexity, readability, and edge cases. No ELO, no scoring, purely educational. Revise and ask again as many times as you want.
                    </p>

                    {pastSessions.length > 0 && (
                        <div style={{ marginBottom: 32 }}>
                            <p className={jetbrainsMono.className} style={{ fontSize: 11, color: 'oklch(60% 0.02 260)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Recent Sessions</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {pastSessions.map(s => (
                                    <div key={s._id} onClick={() => resumeSession(s._id)} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                                        background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 8, padding: '12px 16px'
                                    }}>
                                        <span style={{ fontSize: 13.5 }}>{s.problemTitle}</span>
                                        <span className={jetbrainsMono.className} style={{ fontSize: 11.5, color: 'oklch(60% 0.02 260)' }}>{s.language} · {s.roundCount} round{s.roundCount === 1 ? '' : 's'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 24 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                            <button onClick={() => setPickerMode('existing')} className={jetbrainsMono.className} style={{
                                flex: 1, padding: '9px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                background: pickerMode === 'existing' ? BLUE_BG : 'transparent', color: pickerMode === 'existing' ? BLUE : 'oklch(65% 0.02 260)',
                                border: `1px solid ${pickerMode === 'existing' ? BLUE + '66' : 'oklch(35% 0.02 260)'}`
                            }}>
                                Pick a Problem
                            </button>
                            <button onClick={() => setPickerMode('custom')} className={jetbrainsMono.className} style={{
                                flex: 1, padding: '9px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                background: pickerMode === 'custom' ? BLUE_BG : 'transparent', color: pickerMode === 'custom' ? BLUE : 'oklch(65% 0.02 260)',
                                border: `1px solid ${pickerMode === 'custom' ? BLUE + '66' : 'oklch(35% 0.02 260)'}`
                            }}>
                                Describe Your Own
                            </button>
                        </div>

                        {pickerMode === 'existing' ? (
                            <div>
                                <input
                                    value={problemSearch}
                                    onChange={e => setProblemSearch(e.target.value)}
                                    placeholder="Search problems..."
                                    className={jetbrainsMono.className}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'oklch(16% 0.02 260)', border: '1px solid oklch(35% 0.02 260)', borderRadius: 6, padding: '10px 12px', color: 'oklch(90% 0.02 260)', fontSize: 13, marginBottom: 10 }}
                                />
                                <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {filteredProblems.map(p => (
                                        <div
                                            key={p._id}
                                            onClick={() => setSelectedProblemId(p._id)}
                                            style={{
                                                padding: '9px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 13.5,
                                                background: selectedProblemId === p._id ? BLUE_BG : 'transparent',
                                                color: selectedProblemId === p._id ? BLUE : 'oklch(85% 0.02 260)'
                                            }}
                                        >
                                            {p.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <input
                                    value={customTitle}
                                    onChange={e => setCustomTitle(e.target.value)}
                                    placeholder="Problem title (e.g. 'Merge Intervals')"
                                    className={jetbrainsMono.className}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'oklch(16% 0.02 260)', border: '1px solid oklch(35% 0.02 260)', borderRadius: 6, padding: '10px 12px', color: 'oklch(90% 0.02 260)', fontSize: 13 }}
                                />
                                <textarea
                                    value={customDescription}
                                    onChange={e => setCustomDescription(e.target.value)}
                                    placeholder="Paste the problem description..."
                                    rows={5}
                                    className={jetbrainsMono.className}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'oklch(16% 0.02 260)', border: '1px solid oklch(35% 0.02 260)', borderRadius: 6, padding: '10px 12px', color: 'oklch(90% 0.02 260)', fontSize: 13, resize: 'vertical' }}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'center' }}>
                            <select
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                                className={jetbrainsMono.className}
                                style={{ background: 'oklch(16% 0.02 260)', border: '1px solid oklch(35% 0.02 260)', borderRadius: 6, padding: '9px 10px', color: 'oklch(90% 0.02 260)', fontSize: 13 }}
                            >
                                {LANGUAGE_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                            {language === 'Other' && (
                                <input
                                    value={customLanguage}
                                    onChange={e => setCustomLanguage(e.target.value)}
                                    placeholder="Language name"
                                    className={jetbrainsMono.className}
                                    style={{ background: 'oklch(16% 0.02 260)', border: '1px solid oklch(35% 0.02 260)', borderRadius: 6, padding: '9px 12px', color: 'oklch(90% 0.02 260)', fontSize: 13 }}
                                />
                            )}
                            <button
                                onClick={startSession}
                                disabled={starting}
                                className={jetbrainsMono.className}
                                style={{
                                    marginLeft: 'auto', background: BLUE, color: 'oklch(16% 0.02 260)', border: 'none', borderRadius: 6,
                                    padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: starting ? 'default' : 'pointer'
                                }}
                            >
                                {starting ? 'Starting…' : 'Start Review →'}
                            </button>
                        </div>
                        {error && <div style={{ color: ORANGE, fontSize: 12.5, marginTop: 10 }}>{error}</div>}
                    </div>
                </main>
            </div>
        );
    }

    // phase === 'workspace'
    return (
        <div className={`${spaceGrotesk.className} review-page`} style={{ minHeight: '100vh', background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)' }}>
            <style>{`
                @media (max-width: 1024px) {
                    .review-page .review-columns { grid-template-columns: 1fr !important; }
                }
            `}</style>
            {nav}
            <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 80px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <button onClick={() => setPhase('landing')} className={jetbrainsMono.className} style={{
                        background: 'transparent', border: 'none', color: 'oklch(70% 0.02 260)', fontSize: 13, cursor: 'pointer', padding: 0
                    }}>
                        ← New Review Session
                    </button>
                    <span className={jetbrainsMono.className} style={{ fontSize: 12, color: BLUE }}>Code Review · No ELO, no scoring</span>
                </div>

                <div className="review-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div>
                        <div style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>{problemTitle}</h2>
                            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'oklch(80% 0.02 260)', whiteSpace: 'pre-wrap', margin: 0 }}>{problemDescription}</p>
                        </div>

                        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid oklch(30% 0.02 260)', height: 320, marginBottom: 12 }}>
                            <MonacoEditor
                                height="100%"
                                language={MONACO_LANG[sessionLanguage] || 'plaintext'}
                                value={code}
                                onChange={v => setCode(v || '')}
                                theme="codeduel-dark"
                                beforeMount={defineMonacoTheme}
                                options={{
                                    fontSize: 13.5, minimap: { enabled: false }, scrollBeyondLastLine: false,
                                    padding: { top: 14, bottom: 14 }, lineNumbers: 'on', fontFamily: 'JetBrains Mono, Fira Code, monospace'
                                }}
                            />
                        </div>
                        <button
                            onClick={getReview}
                            disabled={reviewing}
                            className={jetbrainsMono.className}
                            style={{
                                width: '100%', background: reviewing ? 'oklch(40% 0.02 260)' : BLUE, color: 'oklch(16% 0.02 260)',
                                border: 'none', borderRadius: 8, padding: '13px', fontSize: 14, fontWeight: 700, cursor: reviewing ? 'default' : 'pointer'
                            }}
                        >
                            {reviewing ? 'Reviewing…' : rounds.length === 0 ? 'Get Review' : 'Get Review (Revision)'}
                        </button>
                        {error && <div style={{ color: ORANGE, fontSize: 12.5, marginTop: 10 }}>{error}</div>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 720, overflowY: 'auto' }}>
                        {rounds.length === 0 && (
                            <div style={{ background: NEUTRAL_BG, borderRadius: 12, padding: 24, textAlign: 'center', color: 'oklch(60% 0.02 260)', fontSize: 13.5 }}>
                                Your review will appear here.
                            </div>
                        )}
                        {rounds.slice().reverse().map((r, i) => {
                            const roundNum = rounds.length - i;
                            return (
                                <div key={roundNum} style={{ background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 12, padding: 20 }}>
                                    <p className={jetbrainsMono.className} style={{ fontSize: 11, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 10px' }}>
                                        Round {roundNum}{roundNum === rounds.length ? ' (latest)' : ''}
                                    </p>
                                    <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'oklch(85% 0.02 260)', whiteSpace: 'pre-wrap', margin: 0 }}>{r.review}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}

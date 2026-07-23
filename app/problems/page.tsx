'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';

interface Problem {
    _id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    isPremium: boolean;
}

const DIFFICULTY_COLORS = {
    easy: '#00ff87',
    medium: '#ffd93d',
    hard: '#ff4d4d'
};

const CATEGORIES = [
    'all', 'arrays', 'strings', 'trees', 'graphs', 'dynamic-programming', 'system-design'
];

export default function ProblemsPage() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [filtered, setFiltered] = useState<Problem[]>([]);
    const [category, setCategory] = useState('all');
    const [difficulty, setDifficulty] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }

        fetch('/api/problems', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProblems(data);
                    setFiltered(data);
                } else {
                    setError(data.error);
                }
                setLoading(false);
            })
            .catch(() => { setError('Failed to load problems'); setLoading(false); });
    }, []);

    useEffect(() => {
        let result = problems;
        if (category !== 'all') result = result.filter(p => p.category === category);
        if (difficulty !== 'all') result = result.filter(p => p.difficulty === difficulty);
        setFiltered(result);
    }, [category, difficulty, problems]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <Navbar />

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
                <div style={{ marginBottom: 32 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Problems</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                        Choose a problem and compete against Claude to keep your skills sharp.
                    </p>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: 20,
                                    border: '1px solid var(--border)',
                                    background: category === cat ? 'rgba(0,255,135,0.15)' : 'transparent',
                                    color: category === cat ? 'var(--green)' : 'var(--text-muted)',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    fontWeight: category === cat ? 600 : 400
                                }}
                            >
                                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                        {['all', 'easy', 'medium', 'hard'].map(diff => (
                            <button
                                key={diff}
                                onClick={() => setDifficulty(diff)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: 20,
                                    border: '1px solid var(--border)',
                                    background: difficulty === diff ? 'rgba(255,255,255,0.08)' : 'transparent',
                                    color: diff === 'all' ? 'var(--text-muted)' : DIFFICULTY_COLORS[diff as keyof typeof DIFFICULTY_COLORS] || 'var(--text-muted)',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    fontWeight: difficulty === diff ? 600 : 400
                                }}
                            >
                                {diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                        Loading problems...
                    </div>
                )}

                {error && (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--loss)' }}>
                        {error}
                    </div>
                )}

                {/* Problem list */}
                {!loading && !error && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {filtered.map((problem, i) => (
                            <Link
                                key={problem._id}
                                href={`/duel/${problem._id}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px 20px',
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 12,
                                    cursor: 'pointer',
                                    transition: 'border-color 0.15s',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,255,135,0.3)')}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <span style={{ color: 'var(--text-subtle)', fontSize: 13, minWidth: 24 }}>
                                        {i + 1}
                                    </span>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>
                                                {problem.title}
                                            </span>
                                            {problem.isPremium && (
                                                <span style={{
                                                    fontSize: 9,
                                                    fontWeight: 700,
                                                    padding: '2px 6px',
                                                    borderRadius: 4,
                                                    background: 'rgba(0,255,135,0.15)',
                                                    color: 'var(--green)'
                                                }}>
                                                    PRO
                                                </span>
                                            )}
                                        </div>
                                        <span style={{
                                            fontSize: 11,
                                            color: 'var(--text-subtle)',
                                            textTransform: 'capitalize'
                                        }}>
                                            {problem.category.replace('-', ' ')}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <span style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: DIFFICULTY_COLORS[problem.difficulty],
                                        textTransform: 'capitalize'
                                    }}>
                                        {problem.difficulty}
                                    </span>
                                    <span style={{ color: 'var(--text-subtle)', fontSize: 18 }}>→</span>
                                </div>
                            </Link>
                        ))}

                        {filtered.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                                No problems found for these filters.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
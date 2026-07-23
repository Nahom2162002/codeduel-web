'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) { setError('Please fill in all fields'); return; }
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                router.push('/problems');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch {
            setError('Connection failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 0%, #0a1a0f, #0a0a0f)'
        }}>
            <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '40px 36px',
                width: '100%',
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                gap: 16
            }}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <p style={{ fontSize: 32, margin: 0 }}>⚔️</p>
                    <h1 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 4px', color: 'var(--green)' }}>
                        CodeDuel
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                        Sign in to your account
                    </p>
                </div>

                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    placeholder="Username"
                    style={inputStyle}
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    placeholder="Password"
                    style={inputStyle}
                />

                {error && <p style={{ color: 'var(--loss)', fontSize: 12, textAlign: 'center' }}>{error}</p>}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={btnStyle}
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                    Don't have an account?{' '}
                    <Link href="/register" style={{ color: 'var(--green)' }}>Sign up</Link>
                </p>

                <p style={{ textAlign: 'center', fontSize: 12 }}>
                    <Link href="/forgot-password" style={{ color: 'var(--text-subtle)' }}>
                        Forgot password?
                    </Link>
                </p>
            </div>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    padding: '11px 14px',
    borderRadius: 8,
    border: '1px solid var(--border)',
    background: 'var(--surface2)',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    width: '100%'
};

const btnStyle: React.CSSProperties = {
    padding: '12px',
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
    color: '#000',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    width: '100%'
};
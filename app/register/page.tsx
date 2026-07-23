'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const requirements = [
        { text: 'At least 8 characters', met: password.length >= 8 },
        { text: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
        { text: 'At least one lowercase letter', met: /[a-z]/.test(password) },
        { text: 'At least one number', met: /[0-9]/.test(password) },
        { text: 'At least one symbol', met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
    ];

    const handleRegister = async () => {
        if (!username || !email || !password || !confirm) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }
        if (requirements.some(r => !r.met)) {
            setError('Password does not meet requirements');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();
            if (data.message) {
                router.push('/login');
            } else {
                setError(data.error || 'Registration failed');
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
            background: 'radial-gradient(circle at 50% 0%, #0a1a0f, #0a0a0f)',
            padding: '24px'
        }}>
            <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '40px 36px',
                width: '100%',
                maxWidth: 420,
                display: 'flex',
                flexDirection: 'column',
                gap: 14
            }}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <p style={{ fontSize: 32, margin: 0 }}>⚔️</p>
                    <h1 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 4px', color: 'var(--green)' }}>
                        Join CodeDuel
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                        Create your account and start dueling
                    </p>
                </div>

                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" style={inputStyle} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={inputStyle} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={inputStyle} />

                {password && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {requirements.map((req, i) => (
                            <p key={i} style={{
                                fontSize: 11,
                                color: req.met ? 'var(--win)' : 'var(--loss)',
                                margin: 0
                            }}>
                                {req.met ? '✓' : '✗'} {req.text}
                            </p>
                        ))}
                    </div>
                )}

                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" style={inputStyle} />

                {error && <p style={{ color: 'var(--loss)', fontSize: 12, textAlign: 'center' }}>{error}</p>}

                <button onClick={handleRegister} disabled={loading} style={btnStyle}>
                    {loading ? 'Creating account...' : 'Create account'}
                </button>

                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: 'var(--green)' }}>Sign in</Link>
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
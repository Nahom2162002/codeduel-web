'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email) { setError('Please enter your email'); return; }
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.message) {
                setMessage(data.message);
            } else {
                setError(data.error || 'Something went wrong');
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
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                gap: 16
            }}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <p style={{ fontSize: 32, margin: 0 }}>⚔️</p>
                    <h1 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 4px', color: 'var(--green)' }}>
                        Forgot Password
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                {message ? (
                    <p style={{ color: 'var(--win)', fontSize: 14, textAlign: 'center', lineHeight: 1.6 }}>
                        {message}
                    </p>
                ) : (
                    <>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            placeholder="Email address"
                            style={inputStyle}
                        />

                        {error && <p style={{ color: 'var(--loss)', fontSize: 12, textAlign: 'center' }}>{error}</p>}

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            style={btnStyle}
                        >
                            {loading ? 'Sending...' : 'Send reset link'}
                        </button>
                    </>
                )}

                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                    Remembered your password?{' '}
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

'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const GREEN = 'oklch(75% 0.15 155)';
const RED = 'oklch(68% 0.18 25)';

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function ResetPasswordPage() {
    const { token } = useParams();
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => router.push('/login'), 5000);
        return () => clearTimeout(timer);
    }, [message]);

    const requirements = [
        { text: 'At least 8 characters', met: password.length >= 8 },
        { text: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
        { text: 'At least one lowercase letter', met: /[a-z]/.test(password) },
        { text: 'At least one number', met: /[0-9]/.test(password) },
        { text: 'At least one symbol', met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
    ];

    const handleReset = async () => {
        if (!password || !confirm) {
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
            const res = await fetch(`/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            if (data.message) {
                setMessage('Password reset successful! You can now log in with your new password.');
                setError('');
            } else {
                setError(data.error);
            }
        } catch {
            setError('Connection failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={spaceGrotesk.className} style={{
            background: 'oklch(16% 0.02 260)',
            color: 'oklch(96% 0.01 260)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <nav style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 48px',
                maxWidth: 1280,
                margin: '0 auto',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <Link href="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    textDecoration: 'none',
                    color: 'oklch(96% 0.01 260)'
                }}>
                    <DuelIcon />
                    CodeDuel
                </Link>
            </nav>

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
                <div style={{
                    width: '100%',
                    maxWidth: 400,
                    background: 'oklch(21% 0.02 260)',
                    border: '1px solid oklch(30% 0.02 260)',
                    borderRadius: 14,
                    padding: 40,
                    position: 'relative'
                }}>
                    <div style={{ position: 'absolute', top: 6, left: 6, width: 16, height: 16, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` }} />
                    <div style={{ position: 'absolute', bottom: 6, right: 6, width: 16, height: 16, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` }} />

                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
                            <DuelIcon size={30} />
                        </div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Reset Password</h1>
                        <p style={{ fontSize: 15, color: 'oklch(65% 0.02 260)', margin: 0 }}>
                            Choose a new password for your CodeDuel account.
                        </p>
                    </div>

                    {message ? (
                        <>
                            <p style={{ color: GREEN, fontSize: 14, textAlign: 'center', lineHeight: 1.6, margin: '0 0 8px' }}>
                                {message}
                            </p>
                            <p className={jetbrainsMono.className} style={{ color: 'oklch(65% 0.02 260)', fontSize: 12, textAlign: 'center', margin: '0 0 24px' }}>
                                Redirecting to login in 5 seconds...
                            </p>
                            <Link
                                href="/login"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    textAlign: 'center',
                                    background: BLUE,
                                    color: 'oklch(16% 0.02 260)',
                                    padding: 13,
                                    borderRadius: 8,
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    fontSize: 16
                                }}
                            >
                                Back to Login
                            </Link>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 }}>
                                <div>
                                    <label className={jetbrainsMono.className} style={labelStyle}>New Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleReset()}
                                        placeholder="••••••••"
                                        className={spaceGrotesk.className}
                                        style={inputStyle}
                                    />
                                </div>

                                {password && (
                                    <div className={jetbrainsMono.className} style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: -8 }}>
                                        {requirements.map((req, i) => (
                                            <p key={i} style={{
                                                fontSize: 11,
                                                color: req.met ? GREEN : RED,
                                                margin: 0
                                            }}>
                                                {req.met ? '✓' : '✗'} {req.text}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                <div>
                                    <label className={jetbrainsMono.className} style={labelStyle}>Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirm}
                                        onChange={e => setConfirm(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleReset()}
                                        placeholder="••••••••"
                                        className={spaceGrotesk.className}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            {error && (
                                <p style={{ color: RED, fontSize: 13, textAlign: 'center', margin: '0 0 16px' }}>
                                    {error}
                                </p>
                            )}

                            <button
                                onClick={handleReset}
                                disabled={loading}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center',
                                    background: loading ? 'oklch(75% 0.15 220 / 0.5)' : BLUE,
                                    color: 'oklch(16% 0.02 260)',
                                    padding: 13,
                                    border: 'none',
                                    borderRadius: 8,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontFamily: 'inherit'
                                }}
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </>
                    )}
                </div>
            </main>

            <footer style={{
                borderTop: '1px solid oklch(28% 0.02 260)',
                padding: '24px 48px',
                maxWidth: 1280,
                margin: '0 auto',
                width: '100%',
                boxSizing: 'border-box',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: 13, color: 'oklch(50% 0.02 260)' }}>
                    © {new Date().getFullYear()} CodeDuel. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    color: 'oklch(65% 0.02 260)',
    marginBottom: 8
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'oklch(18% 0.02 260)',
    border: '1px solid oklch(32% 0.02 260)',
    borderRadius: 8,
    padding: '12px 14px',
    fontSize: 15,
    color: 'oklch(96% 0.01 260)',
    outline: 'none'
};

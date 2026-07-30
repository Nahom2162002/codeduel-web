'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function VerifyEmailPage() {
    const { token } = useParams();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) return;
        (async () => {
            try {
                const res = await fetch(`/api/auth/verify-email/${token}`, { method: 'POST' });
                const data = await res.json();
                if (data.message) {
                    setStatus('success');
                    setMessage(data.message);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Verification failed');
                }
            } catch {
                setStatus('error');
                setMessage('Connection failed. Please try again.');
            }
        })();
    }, [token]);

    return (
        <div className={`${spaceGrotesk.className} auth-page`} style={{
            background: 'oklch(16% 0.02 260)',
            color: 'oklch(96% 0.01 260)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <style>{`
                @media (max-width: 480px) {
                    .auth-page nav { padding-left: 20px !important; padding-right: 20px !important; }
                    .auth-page main { padding: 24px 16px !important; }
                    .auth-page .auth-card { padding: 28px 22px !important; }
                    .auth-page footer { padding-left: 20px !important; padding-right: 20px !important; }
                }
            `}</style>
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
                <div className="auth-card" style={{
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
                        <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Email Verification</h1>
                    </div>

                    {status === 'verifying' && (
                        <p className={jetbrainsMono.className} style={{ color: 'oklch(65% 0.02 260)', fontSize: 13, textAlign: 'center', margin: 0 }}>
                            Verifying your email...
                        </p>
                    )}

                    {status !== 'verifying' && (
                        <>
                            <p style={{ color: status === 'success' ? GREEN : RED, fontSize: 14, textAlign: 'center', lineHeight: 1.6, margin: '0 0 24px' }}>
                                {message}
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
                                {status === 'success' ? 'Go to Login' : 'Back to Login'}
                            </Link>
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

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(24% 0.03 220 / 0.4)';
const BLUE_BORDER = 'oklch(75% 0.15 220 / 0.35)';

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'oklch(18% 0.02 260)',
    border: '1px solid oklch(32% 0.02 260)',
    borderRadius: 8,
    padding: '12px 14px',
    color: 'oklch(96% 0.01 260)',
    fontSize: 14.5,
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box'
};

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            setError('Please fill in all fields');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const data = await res.json();
            if (res.ok) {
                setSent(true);
            } else {
                setError(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setError('Connection failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={spaceGrotesk.className} style={{ background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', minHeight: '100vh' }}>
            <style>{`
                @media (max-width: 768px) {
                    .contact-page nav { padding: 16px 20px !important; flex-wrap: wrap !important; row-gap: 12px !important; }
                    .contact-page .nav-links { gap: 14px !important; }
                    .contact-page .nav-anchor { display: none !important; }
                    .contact-page main { padding-left: 20px !important; padding-right: 20px !important; }
                    .contact-page h1 { font-size: 30px !important; }
                    .contact-page footer { padding-left: 20px !important; padding-right: 20px !important; justify-content: center !important; text-align: center !important; }
                }
            `}</style>
            <div className="contact-page">
                <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: 1280, margin: '0 auto' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', textDecoration: 'none', color: 'oklch(96% 0.01 260)' }}>
                        <DuelIcon />
                        CodeDuel
                    </Link>
                    <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 15, fontWeight: 500 }}>
                        <a href="/#how-it-works" className="nav-anchor" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>How it works</a>
                        <a href="/#features" className="nav-anchor" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Features</a>
                        <a href="/#pricing" className="nav-anchor" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Pricing</a>
                        <Link href="/blog" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Blog</Link>
                        <Link href="/contact" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none', borderBottom: `2px solid ${BLUE}`, paddingBottom: 4 }}>Contact</Link>
                        <Link href="/register" style={{ background: BLUE, color: 'oklch(16% 0.02 260)', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 700 }}>
                            Start Dueling
                        </Link>
                    </div>
                </nav>

                <main style={{ maxWidth: 560, margin: '0 auto', padding: '24px 48px 100px' }}>
                    <div className={pressStart2P.className} style={{
                        display: 'inline-block', fontSize: 9, letterSpacing: '0.04em', color: BLUE,
                        background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`, padding: '8px 14px', borderRadius: 4, marginBottom: 24
                    }}>
                        [ CONTACT ]
                    </div>

                    <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Get in touch</h1>
                    <p style={{ fontSize: 17, color: 'oklch(70% 0.02 260)', margin: '0 0 40px', lineHeight: 1.6 }}>
                        Questions, bug reports, feedback on a problem, or anything else — send us a message and we'll get back to you.
                    </p>

                    {sent ? (
                        <div style={{
                            background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`, borderRadius: 12,
                            padding: 28, textAlign: 'center'
                        }}>
                            <p style={{ fontSize: 28, margin: '0 0 12px' }}>✓</p>
                            <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>Message sent</h2>
                            <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                                Thanks for reaching out — we'll get back to you at {email}.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'oklch(85% 0.02 260)', marginBottom: 6 }}>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Your name"
                                    style={inputStyle}
                                    maxLength={100}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'oklch(85% 0.02 260)', marginBottom: 6 }}>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    style={inputStyle}
                                    maxLength={254}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'oklch(85% 0.02 260)', marginBottom: 6 }}>Message</label>
                                <textarea
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="What's on your mind?"
                                    rows={7}
                                    maxLength={5000}
                                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }}
                                />
                            </div>

                            {error && (
                                <p style={{ color: ORANGE, fontSize: 13.5, lineHeight: 1.5, margin: 0 }}>
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    padding: '13px', borderRadius: 8, border: 'none',
                                    background: loading ? 'oklch(75% 0.15 220 / 0.5)' : BLUE,
                                    color: 'oklch(16% 0.02 260)', fontSize: 15, fontWeight: 700,
                                    cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit'
                                }}
                            >
                                {loading ? 'Sending...' : 'Send message'}
                            </button>
                        </form>
                    )}

                    <p className={jetbrainsMono.className} style={{ fontSize: 13, color: 'oklch(55% 0.02 260)', marginTop: 32 }}>
                        You can also reach us directly at{' '}
                        <a href="mailto:support@duelai.dev" style={{ color: BLUE }}>support@duelai.dev</a>.
                    </p>
                </main>

                <footer style={{
                    borderTop: '1px solid oklch(28% 0.02 260)', padding: '32px 48px', maxWidth: 1280, margin: '0 auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15 }}>
                        <DuelIcon size={19} />
                        CodeDuel
                    </div>
                    <div style={{ fontSize: 13.5, color: 'oklch(55% 0.02 260)' }}>
                        © {new Date().getFullYear()} CodeDuel. All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: 24, fontSize: 13.5 }}>
                        <Link href="/privacy" style={{ color: 'oklch(65% 0.02 260)', textDecoration: 'none' }}>Privacy Policy</Link>
                        <Link href="/terms" style={{ color: 'oklch(65% 0.02 260)', textDecoration: 'none' }}>Terms of Service</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}

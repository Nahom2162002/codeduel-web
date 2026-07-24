'use client';
import { useState } from 'react';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';

interface UpgradeBannerProps {
    hasHadTrial?: boolean;
    onClose?: () => void;
}

export default function UpgradeBanner({ hasHadTrial = false, onClose }: UpgradeBannerProps) {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ hasHadTrial })
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch {
            setLoading(false);
        }
    };

    return (
        <div className={spaceGrotesk.className} style={{
            background: 'oklch(24% 0.04 220 / 0.2)',
            border: `1.5px solid ${BLUE}`,
            borderRadius: 14,
            padding: '36px 28px',
            textAlign: 'center',
            maxWidth: 420,
            width: '100%',
            margin: '0 auto',
            position: 'relative',
            color: 'oklch(96% 0.01 260)'
        }}>
            <div style={{ position: 'absolute', top: 4, left: 4, width: 14, height: 14, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` }} />
            <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` }} />

            {onClose && (
                <button
                    onClick={onClose}
                    aria-label="Close"
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        border: '1px solid oklch(45% 0.02 260)',
                        background: 'transparent',
                        color: 'oklch(70% 0.02 260)',
                        fontSize: 14,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ✕
                </button>
            )}

            <div className={pressStart2P.className} style={{
                display: 'inline-block',
                background: BLUE,
                color: 'oklch(16% 0.02 260)',
                fontSize: 9,
                letterSpacing: '0.03em',
                padding: '6px 14px',
                borderRadius: 4,
                marginBottom: 18
            }}>
                {hasHadTrial ? 'PRO' : 'MOST POPULAR'}
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                {hasHadTrial ? 'Upgrade to Pro' : "You've hit your daily limit"}
            </h2>
            <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 14, lineHeight: 1.7, margin: '0 0 4px' }}>
                You've used your 3 free duels for today.
            </p>
            <p style={{ fontSize: 32, fontWeight: 700, margin: '12px 0 24px' }}>
                $9<span style={{ fontSize: 15, fontWeight: 400, color: 'oklch(65% 0.02 260)' }}>/month</span>
                {!hasHadTrial && (
                    <span className={jetbrainsMono.className} style={{ display: 'block', fontSize: 13, color: 'oklch(70% 0.05 220)', marginTop: 4 }}>
                        7-day free trial — no credit card required
                    </span>
                )}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, textAlign: 'left' }}>
                {[
                    'Everything in Free',
                    'Unlimited duels per day',
                    'All 6 problem categories',
                    'ELO rating system',
                    'Progress dashboard and analytics',
                    'Weak spot detection',
                    'Performance analytics',
                    'New problems added weekly'
                ].map((f, i) => (
                    <p key={i} style={{ color: 'oklch(85% 0.02 260)', fontSize: 13, margin: 0, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: BLUE, flexShrink: 0 }}>✓</span> {f}
                    </p>
                ))}
            </div>

            <button
                onClick={handleUpgrade}
                disabled={loading}
                className={spaceGrotesk.className}
                style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: 8,
                    border: 'none',
                    background: loading ? 'oklch(75% 0.15 220 / 0.5)' : BLUE,
                    color: 'oklch(16% 0.02 260)',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: 8
                }}
            >
                {loading
                    ? 'Loading...'
                    : hasHadTrial
                        ? 'Upgrade to Pro — $9/month'
                        : 'Start 7-Day Free Trial'
                }
            </button>

            {!hasHadTrial && (
                <p className={jetbrainsMono.className} style={{ color: 'oklch(55% 0.02 260)', fontSize: 12, margin: 0 }}>
                    No credit card required. Cancel anytime.
                </p>
            )}
        </div>
    );
}

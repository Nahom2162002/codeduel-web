'use client';
import { useState, useEffect } from 'react';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';
import posthog from 'posthog-js';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(75% 0.15 220 / 0.18)';

type Reason = 'limit' | 'problem' | 'dashboard' | 'general';

const BLOCKED_HEADING: Record<Reason, string> = {
    limit: "You've hit your daily limit",
    problem: 'This is a Pro problem',
    dashboard: 'Dashboard is a Pro feature',
    general: 'Upgrade to Pro'
};

const SUBTEXT: Record<Reason, string> = {
    limit: "You've used your 3 free duels for today.",
    problem: 'Unlock this problem and everything else Pro has to offer.',
    dashboard: 'Unlock your dashboard and everything else Pro has to offer.',
    general: 'Unlock unlimited duels and everything else Pro has to offer.'
};

interface UpgradeBannerProps {
    hasHadTrial?: boolean;
    onClose?: () => void;
    reason?: Reason;
}

export default function UpgradeBanner({ hasHadTrial = false, onClose, reason = 'limit' }: UpgradeBannerProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [interval, setBillingInterval] = useState<'month' | 'year'>('month');

    // If the user navigates back from Stripe via the browser's back button, the
    // page can be restored from bfcache with `loading` frozen mid-request.
    useEffect(() => {
        const handlePageShow = (e: PageTransitionEvent) => {
            if (e.persisted) setLoading(false);
        };
        window.addEventListener('pageshow', handlePageShow);
        return () => window.removeEventListener('pageshow', handlePageShow);
    }, []);

    const handleUpgrade = async () => {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ hasHadTrial, interval })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                setError(data.error || 'Something went wrong. Please try again.');
                setLoading(false);
            }
            posthog.capture('upgrade_clicked', {
                hasHadTrial,
                interval,
                source: reason
            });
        } catch {
            setError('Connection failed. Please try again.');
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
                {hasHadTrial ? 'Upgrade to Pro' : BLOCKED_HEADING[reason]}
            </h2>
            <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 14, lineHeight: 1.7, margin: '0 0 4px' }}>
                {SUBTEXT[reason]}
            </p>

            <div className={spaceGrotesk.className} style={{
                display: 'flex', gap: 4, background: 'oklch(18% 0.02 260)', border: '1px solid oklch(32% 0.02 260)',
                borderRadius: 8, padding: 4, margin: '16px 0 4px'
            }}>
                <button
                    onClick={() => setBillingInterval('month')}
                    style={{
                        flex: 1, padding: '8px', borderRadius: 6, border: 'none', cursor: 'pointer',
                        background: interval === 'month' ? BLUE : 'transparent',
                        color: interval === 'month' ? 'oklch(16% 0.02 260)' : 'oklch(75% 0.02 260)',
                        fontSize: 13, fontWeight: 600
                    }}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setBillingInterval('year')}
                    style={{
                        flex: 1, padding: '8px', borderRadius: 6, border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        background: interval === 'year' ? BLUE : 'transparent',
                        color: interval === 'year' ? 'oklch(16% 0.02 260)' : 'oklch(75% 0.02 260)',
                        fontSize: 13, fontWeight: 600
                    }}
                >
                    Annual
                    <span className={jetbrainsMono.className} style={{
                        fontSize: 9.5, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                        background: interval === 'year' ? 'oklch(16% 0.02 260 / 0.2)' : BLUE_BG,
                        color: interval === 'year' ? 'oklch(16% 0.02 260)' : BLUE
                    }}>
                        SAVE $13
                    </span>
                </button>
            </div>

            <p style={{ fontSize: 32, fontWeight: 700, margin: '12px 0 4px' }}>
                {interval === 'year' ? '$59' : '$6'}
                <span style={{ fontSize: 15, fontWeight: 400, color: 'oklch(65% 0.02 260)' }}>
                    {interval === 'year' ? '/year' : '/month'}
                </span>
            </p>
            {interval === 'year' && (
                <p className={jetbrainsMono.className} style={{ fontSize: 12.5, color: BLUE, margin: '0 0 4px' }}>
                    That's $4.92/mo — save $13/year vs. paying monthly
                </p>
            )}
            {!hasHadTrial && (
                <p className={jetbrainsMono.className} style={{ fontSize: 13, color: 'oklch(70% 0.05 220)', margin: '4px 0 20px' }}>
                    7-day free trial — no credit card required
                </p>
            )}

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

            {error && (
                <p style={{ color: ORANGE, fontSize: 13, lineHeight: 1.5, margin: '0 0 12px' }}>
                    {error}
                </p>
            )}

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
                        ? `Upgrade to Pro — ${interval === 'year' ? '$59/year' : '$6/month'}`
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

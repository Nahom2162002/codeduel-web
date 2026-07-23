'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UpgradeBannerProps {
    hasHadTrial?: boolean;
    onClose?: () => void;
}

export default function UpgradeBanner({ hasHadTrial = false, onClose }: UpgradeBannerProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
        <div style={{
            background: 'linear-gradient(135deg, rgba(0,255,135,0.08), rgba(0,204,106,0.04))',
            border: '1px solid rgba(0,255,135,0.25)',
            borderRadius: 16,
            padding: '32px 28px',
            textAlign: 'center',
            maxWidth: 420,
            width: '100%',
            margin: '0 auto',
            position: 'relative'
        }}>
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
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.5)',
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

            <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                color: '#000',
                fontSize: 11,
                fontWeight: 800,
                padding: '4px 14px',
                borderRadius: 20,
                marginBottom: 16
            }}>
                {hasHadTrial ? 'PRO' : 'MOST POPULAR'}
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>
                {hasHadTrial ? 'Upgrade to Pro' : "You've hit your daily limit"}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, margin: '0 0 4px' }}>
                You've used your 3 free duels for today.
            </p>
            <p style={{ fontSize: 32, fontWeight: 900, margin: '12px 0 24px' }}>
                $9<span style={{ fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>/month</span>
                {!hasHadTrial && (
                    <span style={{ display: 'block', fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
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
                    <p key={i} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: 0, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: '#00ff87', flexShrink: 0 }}>✓</span> {f}
                    </p>
                ))}
            </div>

            <button
                onClick={handleUpgrade}
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: 8,
                    border: 'none',
                    background: loading
                        ? 'rgba(0,255,135,0.3)'
                        : 'linear-gradient(135deg, #00ff87, #00cc6a)',
                    color: '#000',
                    fontSize: 15,
                    fontWeight: 800,
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
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, margin: 0 }}>
                    No credit card required. Cancel anytime.
                </p>
            )}
        </div>
    );
}
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UpgradeBannerProps {
    hasHadTrial?: boolean;
}

export default function UpgradeBanner({ hasHadTrial = false }: UpgradeBannerProps) {
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
            border: '1px solid rgba(0,255,135,0.2)',
            borderRadius: 16,
            padding: '32px',
            textAlign: 'center',
            maxWidth: 480,
            margin: '0 auto'
        }}>
            <p style={{ fontSize: 40, margin: '0 0 16px' }}>⚔️</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>
                {hasHadTrial ? 'Upgrade to Pro' : 'Start Your Free Trial'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, margin: '0 0 24px' }}>
                {hasHadTrial
                    ? 'Upgrade to Pro for unlimited duels, all categories, ELO tracking, and your full dashboard.'
                    : "You've used your 3 free duels for today. Start your 7-day free trial to unlock unlimited duels and all Pro features."
                }
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, textAlign: 'left' }}>
                {[
                    'Unlimited duels per day',
                    'All 6 problem categories',
                    'ELO rating system',
                    'Progress dashboard and analytics',
                    'Weak spot detection'
                ].map((f, i) => (
                    <p key={i} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: 0, display: 'flex', gap: 8 }}>
                        <span style={{ color: '#00ff87' }}>✓</span> {f}
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
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import UpgradeBanner from './UpgradeBanner';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';

interface UserMenuProps {
    username: string;
    plan: string;
    hasHadTrial?: boolean;
}

export default function UserMenu({ username, plan, hasHadTrial = false }: UserMenuProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showUpgrade, setShowUpgrade] = useState(false);
    const router = useRouter();
    const isPro = plan === 'pro';

    // If the user navigates back from Stripe via the browser's back button, the
    // page can be restored from bfcache with `loading` frozen mid-request.
    useEffect(() => {
        const handlePageShow = (e: PageTransitionEvent) => {
            if (e.persisted) setLoading(false);
        };
        window.addEventListener('pageshow', handlePageShow);
        return () => window.removeEventListener('pageshow', handlePageShow);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const handlePortal = async () => {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('/api/stripe/portal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else if (data.cancelled) {
                window.location.reload();
            } else {
                setError(data.error || 'Something went wrong. Please try again.');
                setLoading(false);
            }
        } catch {
            setError('Connection failed. Please try again.');
            setLoading(false);
        }
    };

    const handleMenuClick = () => {
        if (isPro) {
            handlePortal();
        } else {
            setOpen(false);
            setShowUpgrade(true);
        }
    };

    const itemStyle: React.CSSProperties = {
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left',
        padding: '10px 12px',
        borderRadius: 6,
        border: 'none',
        background: 'transparent',
        color: 'oklch(88% 0.02 260)',
        fontSize: 14,
        textDecoration: 'none',
        cursor: 'pointer'
    };

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
            {isPro && (
                <span className={jetbrainsMono.className} style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: 20,
                    background: BLUE,
                    color: 'oklch(16% 0.02 260)'
                }}>
                    PRO
                </span>
            )}

            <div
                onClick={() => setOpen(o => !o)}
                className={spaceGrotesk.className}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, color: 'oklch(85% 0.02 260)', userSelect: 'none' }}
            >
                {username}
                <span style={{ fontSize: 11, color: 'oklch(55% 0.02 260)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>▾</span>
            </div>

            {open && (
                <>
                    <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
                    <div style={{
                        position: 'absolute', top: 32, right: 0, width: 220,
                        background: 'oklch(21% 0.02 260)', border: '1px solid oklch(32% 0.02 260)',
                        borderRadius: 10, padding: 8, zIndex: 100,
                        boxShadow: '0 12px 32px oklch(0% 0 0 / 0.5)'
                    }}>
                        <button onClick={handleMenuClick} disabled={loading} className={spaceGrotesk.className} style={{ ...itemStyle, cursor: loading ? 'not-allowed' : 'pointer' }}>
                            {loading ? 'Loading...' : isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
                        </button>

                        {error && (
                            <p style={{ color: ORANGE, fontSize: 12, lineHeight: 1.5, margin: '0 4px 6px', padding: '0 8px' }}>
                                {error}
                            </p>
                        )}

                        {isPro && (
                            <Link href="/dashboard" onClick={() => setOpen(false)} className={spaceGrotesk.className} style={itemStyle}>
                                Dashboard
                            </Link>
                        )}

                        <div style={{ height: 1, background: 'oklch(30% 0.02 260)', margin: '6px 4px' }} />

                        <button onClick={handleLogout} className={spaceGrotesk.className} style={itemStyle}>
                            Log out
                        </button>
                    </div>
                </>
            )}

            {showUpgrade && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: 24
                }}>
                    <UpgradeBanner hasHadTrial={hasHadTrial} reason="general" onClose={() => setShowUpgrade(false)} />
                </div>
            )}
        </div>
    );
}

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
    const router = useRouter();

    useEffect(() => {
        // Auto redirect to problems after 5 seconds
        const timer = setTimeout(() => router.push('/problems'), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at 50% 0%, #0a1a0f, #0a0a0f)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
            padding: 24
        }}>
            <div style={{
                background: 'rgba(0,255,135,0.06)',
                border: '1px solid rgba(0,255,135,0.2)',
                borderRadius: 20,
                padding: '48px 40px',
                textAlign: 'center',
                maxWidth: 480,
                width: '100%'
            }}>
                <p style={{ fontSize: 56, margin: '0 0 16px' }}>🏆</p>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#00ff87', margin: '0 0 12px' }}>
                    Welcome to CodeDuel Pro!
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, margin: '0 0 32px' }}>
                    Your Pro access is now active. You have unlimited duels,
                    all problem categories, ELO tracking, and full dashboard access.
                </p>
                <div style={{
                    background: 'rgba(0,255,135,0.08)',
                    border: '1px solid rgba(0,255,135,0.15)',
                    borderRadius: 12,
                    padding: '16px',
                    marginBottom: 32,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.5)'
                }}>
                    💡 Redirecting to problems in 5 seconds...
                </div>
                <Link
                    href="/problems"
                    style={{
                        display: 'block',
                        padding: '13px',
                        borderRadius: 8,
                        border: 'none',
                        background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                        color: '#000',
                        fontSize: 15,
                        fontWeight: 800,
                        textDecoration: 'none'
                    }}
                >
                    ⚔️ Start Dueling
                </Link>
            </div>
        </div>
    );
}
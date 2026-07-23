'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [user, setUser] = useState<{ username: string; plan: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('/api/user/me', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.username) setUser(data);
            })
            .catch(() => {});
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/');
    };

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            height: 60,
            borderBottom: '1px solid var(--border)',
            background: 'rgba(10,10,15,0.95)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>⚔️</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--green)' }}>CodeDuel</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {user ? (
                    <>
                        <Link href="/problems" style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                            Problems
                        </Link>
                        <Link href="/dashboard" style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                            Dashboard
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            {user.plan === 'pro' && (
                                <span style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: '2px 8px',
                                    borderRadius: 20,
                                    background: 'linear-gradient(135deg, var(--green), var(--green-dark))',
                                    color: '#000'
                                }}>
                                    PRO
                                </span>
                            )}
                            <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                                {user.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: 6,
                                    border: '1px solid var(--border)',
                                    background: 'transparent',
                                    color: 'var(--text-muted)',
                                    fontSize: 13,
                                    cursor: 'pointer'
                                }}
                            >
                                Log out
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link href="/login" style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            style={{
                                padding: '7px 16px',
                                borderRadius: 6,
                                background: 'linear-gradient(135deg, var(--green), var(--green-dark))',
                                color: '#000',
                                fontSize: 13,
                                fontWeight: 700
                            }}
                        >
                            Get started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
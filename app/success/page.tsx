'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(75% 0.15 220 / 0.18)';
const BLUE_BORDER = 'oklch(75% 0.15 220 / 0.5)';

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function SuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => router.push('/problems'), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={spaceGrotesk.className} style={{
            background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', minHeight: '100vh',
            display: 'flex', flexDirection: 'column'
        }}>
            <nav style={{ display: 'flex', alignItems: 'center', padding: '20px 48px', maxWidth: 1280, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', textDecoration: 'none', color: 'oklch(96% 0.01 260)' }}>
                    <DuelIcon />
                    CodeDuel
                </Link>
            </nav>

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
                <div style={{
                    width: '100%', maxWidth: 440, background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`,
                    borderRadius: 14, padding: 40, textAlign: 'center', position: 'relative'
                }}>
                    <div style={{ position: 'absolute', top: 6, left: 6, width: 16, height: 16, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` }} />
                    <div style={{ position: 'absolute', bottom: 6, right: 6, width: 16, height: 16, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` }} />

                    <p style={{ fontSize: 56, margin: '0 0 16px' }}>🏆</p>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: BLUE, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                        Welcome to CodeDuel Pro!
                    </h1>
                    <p style={{ color: 'oklch(80% 0.02 260)', fontSize: 15, lineHeight: 1.7, margin: '0 0 32px' }}>
                        Your Pro access is now active. You have unlimited duels, all problem categories, ELO tracking, and full dashboard access.
                    </p>
                    <div className={jetbrainsMono.className} style={{
                        background: 'oklch(21% 0.02 260)', border: '1px solid oklch(30% 0.02 260)', borderRadius: 8,
                        padding: 16, marginBottom: 32, fontSize: 13, color: 'oklch(65% 0.02 260)'
                    }}>
                        Redirecting to problems in 5 seconds...
                    </div>
                    <Link
                        href="/problems"
                        style={{
                            display: 'block', padding: 13, borderRadius: 8, border: 'none', background: BLUE,
                            color: 'oklch(16% 0.02 260)', fontSize: 15, fontWeight: 700, textDecoration: 'none'
                        }}
                    >
                        Start Dueling
                    </Link>
                </div>
            </main>

            <footer style={{
                borderTop: '1px solid oklch(28% 0.02 260)', padding: '24px 48px', maxWidth: 1280, margin: '0 auto',
                width: '100%', boxSizing: 'border-box', textAlign: 'center'
            }}>
                <div style={{ fontSize: 13, color: 'oklch(50% 0.02 260)' }}>
                    © {new Date().getFullYear()} CodeDuel. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

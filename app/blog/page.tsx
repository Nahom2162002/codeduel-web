import type { Metadata } from 'next';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const BLUE = 'oklch(75% 0.15 220)';
const ORANGE = 'oklch(75% 0.15 55)';
const BLUE_BG = 'oklch(24% 0.03 220 / 0.4)';
const BLUE_BORDER = 'oklch(75% 0.15 220 / 0.35)';

export const metadata: Metadata = {
    title: 'Blog — CodeDuel',
    description: 'Thoughts on coding, AI tools, and staying sharp as a developer in the age of AI.',
};

const POSTS = [
    {
        slug: 'are-ai-tools-making-developers-worse',
        title: 'Are AI Coding Tools Making Developers Worse at Coding?',
        description: 'GitHub Copilot and Claude are making developers faster. But are they making developers better?',
        date: 'July 2026',
        readTime: '5 min read'
    }
];

function DuelIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * (24 / 32)} viewBox="0 0 32 24" fill="none">
            <path d="M4 4L14 12L4 20" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 4L18 12L28 20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function BlogPage() {
    return (
        <div className={spaceGrotesk.className} style={{ background: 'oklch(16% 0.02 260)', color: 'oklch(96% 0.01 260)', minHeight: '100vh' }}>
            <style>{`
                .blog-post-card { transition: border-color 0.15s; }
                .blog-post-card:hover { border-color: ${BLUE_BORDER}; }
                @media (max-width: 768px) {
                    .blog-page nav { padding: 16px 20px !important; flex-wrap: wrap !important; row-gap: 12px !important; }
                    .blog-page .nav-links { gap: 14px !important; }
                    .blog-page .nav-anchor { display: none !important; }
                    .blog-page main { padding-left: 20px !important; padding-right: 20px !important; }
                    .blog-page h1 { font-size: 30px !important; }
                    .blog-page footer { padding-left: 20px !important; padding-right: 20px !important; justify-content: center !important; text-align: center !important; }
                }
            `}</style>
            <div className="blog-page">
                <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: 1280, margin: '0 auto' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', textDecoration: 'none', color: 'oklch(96% 0.01 260)' }}>
                        <DuelIcon />
                        CodeDuel
                    </Link>
                    <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 15, fontWeight: 500 }}>
                        <a href="/#how-it-works" className="nav-anchor" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>How it works</a>
                        <a href="/#features" className="nav-anchor" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Features</a>
                        <a href="/#pricing" className="nav-anchor" style={{ color: 'oklch(80% 0.02 260)', textDecoration: 'none' }}>Pricing</a>
                        <Link href="/blog" style={{ color: 'oklch(96% 0.01 260)', textDecoration: 'none', borderBottom: `2px solid ${BLUE}`, paddingBottom: 4 }}>Blog</Link>
                        <Link href="/register" style={{ background: BLUE, color: 'oklch(16% 0.02 260)', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 700 }}>
                            Start Dueling
                        </Link>
                    </div>
                </nav>

                <main style={{ maxWidth: 760, margin: '0 auto', padding: '24px 48px 100px' }}>
                    <div className={pressStart2P.className} style={{
                        display: 'inline-block', fontSize: 9, letterSpacing: '0.04em', color: BLUE,
                        background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`, padding: '8px 14px', borderRadius: 4, marginBottom: 24
                    }}>
                        [ BLOG ]
                    </div>

                    <h1 style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Blog</h1>
                    <p style={{ fontSize: 17, color: 'oklch(70% 0.02 260)', margin: '0 0 48px', lineHeight: 1.6 }}>
                        Thoughts on coding, AI tools, and staying sharp as a Developer.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {POSTS.map(post => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="blog-post-card"
                                style={{
                                    display: 'block',
                                    background: 'oklch(21% 0.02 260)',
                                    border: '1px solid oklch(30% 0.02 260)',
                                    borderRadius: 12,
                                    padding: 24,
                                    textDecoration: 'none',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ position: 'absolute', top: 6, left: 6, width: 14, height: 14, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` }} />
                                <div style={{ position: 'absolute', bottom: 6, right: 6, width: 14, height: 14, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` }} />

                                <div className={jetbrainsMono.className} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 12, color: 'oklch(55% 0.02 260)' }}>
                                    <span>{post.date}</span>
                                    <span>·</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: 'oklch(96% 0.01 260)', margin: '0 0 8px' }}>
                                    {post.title}
                                </h2>
                                <p style={{ color: 'oklch(70% 0.02 260)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                                    {post.description}
                                </p>
                            </Link>
                        ))}
                    </div>
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

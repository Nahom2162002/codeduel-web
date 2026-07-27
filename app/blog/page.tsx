import Link from 'next/link';

const POSTS = [
    {
        slug: 'are-ai-tools-making-developers-worse',
        title: 'Are AI Coding Tools Making Developers Worse at Coding?',
        description: 'GitHub Copilot and Claude are making developers faster. But are they making developers better?',
        date: 'July 2026',
        readTime: '5 min read'
    }
];

export default function BlogPage() {
    return (
        <main style={{
            fontFamily: 'Inter, sans-serif',
            background: '#0a0a0f',
            minHeight: '100vh',
            color: 'white',
            padding: '60px 24px'
        }}>
            <style>{`
                .blog-post-card { transition: border-color 0.15s; }
                .blog-post-card:hover { border-color: rgba(0,255,135,0.3); }
            `}</style>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
                <Link href="/" style={{ color: '#00ff87', fontSize: 14, textDecoration: 'none' }}>
                    ← Back to CodeDuel
                </Link>

                <h1 style={{ fontSize: 32, fontWeight: 800, margin: '32px 0 8px' }}>Blog</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginBottom: 48 }}>
                    Thoughts on coding, AI tools, and staying sharp as a developer.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {POSTS.map(post => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="blog-post-card"
                            style={{
                                display: 'block',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 12,
                                padding: '24px',
                                textDecoration: 'none'
                            }}
                        >
                            <div style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                                <span>{post.date}</span>
                                <span>·</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'white', margin: '0 0 8px' }}>
                                {post.title}
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                                {post.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
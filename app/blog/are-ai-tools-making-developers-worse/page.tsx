import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Are AI Coding Tools Making Developers Worse at Coding?',
    description: 'GitHub Copilot and Claude are making developers faster. But are they making developers better? An honest look at what AI tools are doing to raw coding skills.',
};

export default function BlogPost() {
    return (
        <main style={{
            fontFamily: 'Inter, sans-serif',
            background: '#0a0a0f',
            minHeight: '100vh',
            color: 'white',
            padding: '60px 24px'
        }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>

                {/* Back link */}
                <Link href="/" style={{ color: '#00ff87', fontSize: 14, textDecoration: 'none' }}>
                    ← Back to CodeDuel
                </Link>

                {/* Header */}
                <div style={{ margin: '40px 0 48px' }}>
                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(0,255,135,0.1)',
                        border: '1px solid rgba(0,255,135,0.2)',
                        borderRadius: 20,
                        padding: '4px 12px',
                        fontSize: 12,
                        color: '#00ff87',
                        marginBottom: 20
                    }}>
                        Opinion · July 2026
                    </div>
                    <h1 style={{
                        fontSize: 36,
                        fontWeight: 800,
                        lineHeight: 1.2,
                        margin: '0 0 16px'
                    }}>
                        Are AI Coding Tools Making Developers Worse at Coding?
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                        GitHub Copilot and Claude are making developers faster. But are they making developers better?
                        An honest look at what AI tools might be doing to raw coding skills.
                    </p>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                    <p style={prose}>
                        I noticed something uncomfortable a few months ago. I was shipping faster than ever.
                        Copilot was autocompleting my functions. Claude was helping me debug in minutes what used to take hours.
                        By any productivity metric I was performing at my best.
                    </p>

                    <p style={prose}>
                        Then I sat down to do a LeetCode problem without any AI assistance. Something felt off.
                        The muscle memory was slower. The instinct to reach for the answer before working through
                        the problem had gotten stronger. I wasn't sure if I was imagining it or if something real
                        was happening to my raw coding ability.
                    </p>

                    <p style={prose}>
                        I started asking other developers if they felt the same thing. Most of them did.
                        Nobody had a good answer for what to do about it.
                    </p>

                    <h2 style={h2}>The Productivity Trap</h2>

                    <p style={prose}>
                        AI coding tools are genuinely remarkable. GitHub Copilot has tens of millions of users.
                        Claude Code launched in 2026 and became one of the most discussed developer tools of the year
                        almost immediately. Every major IDE now has AI integration. The productivity gains are real
                        and well documented.
                    </p>

                    <p style={prose}>
                        But productivity and skill are not the same thing. You can be more productive with a calculator
                        without becoming better at mental arithmetic. You can navigate more efficiently with GPS without
                        becoming better at reading maps. The tool does the work so your brain doesn't have to —
                        and over time your brain gets out of practice.
                    </p>

                    <p style={prose}>
                        The question is whether the same thing is happening with AI coding tools. Are developers
                        becoming more productive while their underlying skills quietly atrophy?
                    </p>

                    <h2 style={h2}>What the Research Suggests</h2>

                    <p style={prose}>
                        A 2023 study from Stanford found that GitHub Copilot users wrote code 55% faster than those
                        without it. That number gets cited constantly. What gets cited less often is the follow-up
                        question nobody studied rigorously: what happens to the skills of those developers over time?
                    </p>

                    <p style={prose}>
                        We have some indirect evidence from adjacent fields. Research on GPS navigation has found
                        that heavy GPS users show reduced spatial memory and reduced ability to navigate without assistance.
                        Research on calculator use in education found that students who relied heavily on calculators
                        performed worse on mental arithmetic assessments than those who practiced without them.
                    </p>

                    <p style={prose}>
                        None of this proves that AI coding tools are degrading developer skills. But it suggests
                        the mechanism is plausible — when a tool removes the need to exercise a cognitive skill,
                        that skill may weaken over time without deliberate practice to maintain it.
                    </p>

                    <h2 style={h2}>The Interview Problem</h2>

                    <p style={prose}>
                        The most concrete place where this tension surfaces is technical interviews.
                        Most technical interviews still require whiteboard coding or live coding without AI assistance.
                        A developer who has spent two years coding primarily with Copilot may find themselves
                        less prepared for that environment than they would have been before AI tools existed —
                        even if their day-to-day productivity has significantly improved.
                    </p>

                    <p style={prose}>
                        This creates a strange situation where the tools that make you better at your job
                        might make you worse at getting your next job. Developers who want to stay hireable
                        need to maintain raw coding skills that their daily workflow no longer requires them to exercise.
                    </p>

                    <h2 style={h2}>The Honest Answer</h2>

                    <p style={prose}>
                        The honest answer is that we don't know yet. AI coding tools at scale have only existed
                        for a few years. The longitudinal research needed to definitively answer whether they
                        degrade underlying developer skills doesn't exist yet.
                    </p>

                    <p style={prose}>
                        What we do know is that the anxiety is real and widespread. Developers who use AI tools
                        daily report feeling less confident in their raw coding ability even as their productivity
                        improves. That gap between feeling productive and feeling skilled is worth paying attention to.
                    </p>

                    <p style={prose}>
                        The solution isn't to stop using AI tools — that ship has sailed and the productivity
                        gains are too real to ignore. The solution is deliberate practice that maintains raw skills
                        independently of AI assistance. The same way musicians who use music software still practice
                        scales. The same way athletes who use data analytics still do fundamentals drills.
                    </p>

                    <h2 style={h2}>How to Stay Sharp</h2>

                    <p style={prose}>
                        A few approaches that developers are using to maintain raw skills in the age of AI:
                    </p>

                    <p style={prose}>
                        <strong style={{ color: 'white' }}>Regular no-AI coding sessions.</strong> Set aside time
                        each week to write code without any AI assistance. Even 30 minutes of deliberate
                        no-AI practice maintains the muscle memory that daily AI-assisted work doesn't exercise.
                    </p>

                    <p style={prose}>
                        <strong style={{ color: 'white' }}>Competitive coding practice.</strong> Platforms like
                        LeetCode, HackerRank, and Codeforces provide problems that require raw problem-solving
                        ability. Regular practice keeps the underlying skills sharp regardless of what tools
                        you use in your day job.
                    </p>

                    <p style={prose}>
                        <strong style={{ color: 'white' }}>Competing against AI directly.</strong> This is the
                        approach we built CodeDuel around. If you want to know honestly how your raw coding skills
                        compare to the AI you use every day, compete against it directly. Same problem,
                        same time, scored on correctness, speed, and code quality. Your ELO rating gives you
                        an honest picture of where you stand and your dashboard shows you exactly which
                        categories need the most work.
                    </p>

                    <p style={prose}>
                        <strong style={{ color: 'white' }}>Code review without AI.</strong> When reviewing
                        other developers' code, resist the urge to run it through an AI first.
                        Form your own opinion about correctness, performance, and style before using AI
                        as a second opinion. This keeps the analytical skills that AI tends to replace
                        most directly.
                    </p>

                    <h2 style={h2}>The Bottom Line</h2>

                    <p style={prose}>
                        AI coding tools are not going away and they shouldn't. The productivity gains are
                        real and valuable. But developers who want to stay sharp — for interviews, for
                        situations where AI isn't available, and for their own confidence — need to
                        deliberately maintain the raw skills that AI tools no longer require them to exercise daily.
                    </p>

                    <p style={prose}>
                        The best developers of the next decade will be those who can use AI tools fluently
                        AND code effectively without them. Maintaining that second capability requires intentional practice.
                    </p>

                    {/* CTA */}
                    <div style={{
                        background: 'rgba(0,255,135,0.06)',
                        border: '1px solid rgba(0,255,135,0.2)',
                        borderRadius: 16,
                        padding: '32px',
                        textAlign: 'center',
                        marginTop: 16
                    }}>
                        <p style={{ fontSize: 24, margin: '0 0 12px' }}>⚔️</p>
                        <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>
                            Find out where you stand
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>
                            CodeDuel puts you head-to-head against Claude AI on real coding problems.
                            Your ELO rating gives you an honest answer to the question this article asks.
                        </p>
                        <a
                            href="/register"
                            style={{
                                display: 'inline-block',
                                padding: '12px 28px',
                                borderRadius: 8,
                                background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                                color: '#000',
                                fontSize: 14,
                                fontWeight: 800,
                                textDecoration: 'none'
                            }}
                        >
                            Start for free — 3 duels per day
                        </a>
                    </div>

                    {/* Author */}
                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        paddingTop: 24,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16
                    }}>
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #00ff87, #00cc6a)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            color: '#000',
                            fontSize: 16,
                            flexShrink: 0
                        }}>
                            NA
                        </div>
                        <div>
                            <p style={{ color: 'white', fontWeight: 700, fontSize: 14, margin: '0 0 2px' }}>
                                Nahom Ashagrea
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0 }}>
                                Founder of CodeDuel · Full Stack Developer · B.S. Computational AI, RIT
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

const prose: React.CSSProperties = {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 16,
    lineHeight: 1.8,
    margin: 0
};

const h2: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    margin: '8px 0 0',
    color: 'white'
};
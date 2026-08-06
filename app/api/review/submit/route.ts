import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import CodeReviewSession from '@/models/CodeReviewSession';
import { isValidObjectId } from '@/lib/inputValidator';
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const MAX_CODE_LENGTH = 20000;

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        if (user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required', requiresPro: true }, { status: 403, headers: corsHeaders });
        }

        // Each submission is a real Claude call — same abuse-guard as sandbox/step.
        const { allowed, retryAfterSeconds } = await checkRateLimit(`review-submit:${user._id}`, 40, 10 * 60 * 1000);
        if (!allowed) return rateLimitResponse(retryAfterSeconds, corsHeaders);

        const { sessionId, code } = await req.json().catch(() => ({}));

        if (!isValidObjectId(sessionId)) {
            return NextResponse.json({ error: 'Invalid session ID' }, { status: 400, headers: corsHeaders });
        }
        if (typeof code !== 'string' || !code.trim() || code.length > MAX_CODE_LENGTH) {
            return NextResponse.json({ error: 'Invalid code submission' }, { status: 400, headers: corsHeaders });
        }

        const session = await CodeReviewSession.findOne({ _id: sessionId, userId: user._id });
        if (!session) return NextResponse.json({ error: 'Review session not found' }, { status: 404, headers: corsHeaders });

        const priorRound = session.rounds[session.rounds.length - 1];

        const prompt = `You are an experienced code reviewer helping a developer improve. They're working on this problem (it may be from this platform or from elsewhere — a LeetCode session, an interview, their day job):

Title: ${session.problemTitle}
Description: ${session.problemDescription}

${priorRound ? `This is a REVISION. Here is their previous attempt and the review it got:

Previous code (${session.language}):
\`\`\`${session.language}
${priorRound.code}
\`\`\`

Previous review:
${priorRound.review}

Here is their revised code:` : `Here is their solution:`}

\`\`\`${session.language}
${code}
\`\`\`

Write a concise, high-signal code review covering:
1. Time complexity (state the Big-O and explain why, in one sentence)
2. Space complexity (state the Big-O and explain why, in one sentence)
3. Readability and code style — only if there's something worth flagging
4. Edge cases — either handled well or missed
${priorRound ? '5. Whether this revision actually improved on the specific issues raised in the previous review' : ''}

End with the 2-3 most impactful, specific suggestions for improvement — not an exhaustive list. Be direct and constructive — this developer wants to genuinely get better, not just be told it's fine. Prioritize the issues that matter most over covering everything; skip a section entirely if there's nothing meaningful to say. Aim for around 250-350 words total. Write in plain prose with short paragraphs per section, no markdown headers, no code in your response.`;

        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            // A full review (4-5 sections plus actionable suggestions) was
            // measured landing at 720-760 output tokens on ordinary
            // submissions against the old 900 cap — comfortable most of the
            // time, but thin enough that longer or more complex code could
            // genuinely run past it and get cut off mid-sentence.
            max_tokens: 1500,
            messages: [{ role: 'user', content: prompt }]
        });
        const content = message.content[0];
        const review = content.type === 'text' ? content.text.trim() : 'Unable to generate a review right now.';

        session.rounds.push({ code, review, submittedAt: new Date() });
        session.updatedAt = new Date();
        await session.save();

        return NextResponse.json({
            review,
            roundNumber: session.rounds.length
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

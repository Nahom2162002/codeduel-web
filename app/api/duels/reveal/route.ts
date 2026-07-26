import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Problem from '@/models/Problem';
import RevealSession from '@/models/RevealSession';
import DailyRevealCount from '@/models/DailyRevealCount';
import { buildSolutionPrompt } from '@/lib/claudeSolutionPrompt';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Streams Claude's raw solution text live, for "Practice Mode" — the caller
// is responsible for marking the resulting duel as practice (no ELO, no
// daily-limit consumption) since revealing this defeats fair competition.
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const { problemId, language } = await req.json().catch(() => ({}));
        if (!problemId || !language) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        if (problem.isPremium && user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required' }, { status: 403, headers: corsHeaders });
        }

        // Free tier: 1 practice reveal per day. Reserved atomically the same way
        // as the duel limit in /api/duels — see models/DailyRevealCount.ts.
        let reservedRevealSlot = false;
        let dayKey: Date | null = null;
        if (user.plan === 'free') {
            dayKey = new Date();
            dayKey.setHours(0, 0, 0, 0);

            try {
                await DailyRevealCount.findOneAndUpdate(
                    { userId: user._id, date: dayKey, count: { $lt: 1 } },
                    { $inc: { count: 1 } },
                    { upsert: true, new: true }
                );
                reservedRevealSlot = true;
            } catch (reserveErr: any) {
                if (reserveErr.code === 11000) {
                    return NextResponse.json({
                        error: 'You\'ve used today\'s free practice reveal. Upgrade to Pro for unlimited practice.',
                        revealLimitReached: true
                    }, { status: 403, headers: corsHeaders });
                }
                throw reserveErr;
            }
        }

        const prompt = buildSolutionPrompt(problem, language);
        const startTime = Date.now();
        const claudeStream = anthropic.messages.stream({
            model: 'claude-sonnet-4-6',
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }]
        });

        const encoder = new TextEncoder();
        const body = new ReadableStream({
            async start(controller) {
                let fullText = '';
                try {
                    for await (const event of claudeStream) {
                        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                            fullText += event.delta.text;
                            controller.enqueue(encoder.encode(event.delta.text));
                        }
                    }

                    // Record proof this reveal actually happened — /api/duels looks this
                    // up server-side rather than trusting a client-supplied practice flag.
                    if (fullText.trim()) {
                        await RevealSession.create({
                            userId: user._id,
                            problemId: problem._id,
                            language,
                            aiCode: fullText.trim(),
                            aiTime: (Date.now() - startTime) / 1000
                        });
                    } else if (reservedRevealSlot && dayKey) {
                        // Nothing was actually generated (infra failure on our end) —
                        // give the free-tier slot back rather than charging them for it.
                        await DailyRevealCount.findOneAndUpdate(
                            { userId: user._id, date: dayKey },
                            { $inc: { count: -1 } }
                        ).catch(() => {});
                    }
                } catch {
                    if (reservedRevealSlot && dayKey) {
                        await DailyRevealCount.findOneAndUpdate(
                            { userId: user._id, date: dayKey },
                            { $inc: { count: -1 } }
                        ).catch(() => {});
                    }
                } finally {
                    controller.close();
                }
            }
        });

        return new Response(body, {
            headers: {
                ...corsHeaders,
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache'
            }
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

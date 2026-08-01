import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Problem from '@/models/Problem';
import LiveSolveSession from '@/models/LiveSolveSession';
import { buildSolutionPrompt } from '@/lib/claudeSolutionPrompt';
import { isValidObjectId, isValidLanguage } from '@/lib/inputValidator';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Starts Claude solving the problem the instant the user's duel timer starts,
// so both sides race from the same moment. The client only ever receives how
// many characters landed in each chunk — never the text itself — so the "Claude
// is typing" pane can mirror the real pace live without leaking the solution
// over the network before the user submits their own.
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const { problemId, language } = await req.json().catch(() => ({}));
        if (!problemId || !language) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
        }
        if (!isValidObjectId(problemId)) {
            return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400, headers: corsHeaders });
        }
        if (!isValidLanguage(language)) {
            return NextResponse.json({ error: 'Unsupported language' }, { status: 400, headers: corsHeaders });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        if (problem.isPremium && user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required' }, { status: 403, headers: corsHeaders });
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
                            controller.enqueue(encoder.encode(`${event.delta.text.length}\n`));
                        }
                    }

                    if (fullText.trim()) {
                        await LiveSolveSession.create({
                            userId: user._id,
                            problemId: problem._id,
                            language,
                            aiCode: fullText.trim(),
                            aiTime: (Date.now() - startTime) / 1000
                        });
                    }
                } catch {
                    // Submission falls back to generating Claude's solution fresh
                    // if no session was saved — nothing to clean up here.
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

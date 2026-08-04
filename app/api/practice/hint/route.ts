import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Problem from '@/models/Problem';
import { isValidObjectId } from '@/lib/inputValidator';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Three escalating levels — level 1 just names the pattern to think about,
// level 3 is a near-solution walkthrough — so a user who's fully stuck can
// keep asking without ever being handed the code outright.
const LEVEL_INSTRUCTIONS: Record<number, string> = {
    1: 'Give a high-level nudge: name the general pattern or technique that applies here (e.g. "this is a sliding window problem"), and briefly say why. Do not describe the steps to implement it.',
    2: 'Give a more specific direction: what data structure(s) or algorithmic idea to use and roughly how they fit together. Do not write code or pseudocode.',
    3: 'Give a near-solution walkthrough: the concrete steps to implement, in prose, in enough detail that a stuck user could code it from your description. Still do not write actual code.'
};

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

        const { problemId, hintNumber } = await req.json().catch(() => ({}));

        if (!isValidObjectId(problemId)) {
            return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400, headers: corsHeaders });
        }
        if (![1, 2, 3].includes(hintNumber)) {
            return NextResponse.json({ error: 'Invalid hint level' }, { status: 400, headers: corsHeaders });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        const prompt = `You are a coding tutor helping a student who is stuck on this problem:

Title: ${problem.title}
Description: ${problem.description}
Constraints:
${problem.constraints.join('\n')}
Examples:
${problem.examples.map((e: any) => `Input: ${e.input}\nOutput: ${e.output}`).join('\n\n')}

${LEVEL_INSTRUCTIONS[hintNumber as 1 | 2 | 3]}

Respond with 2-4 sentences, directly addressed to the student. No markdown, no code.`;

        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 300,
            messages: [{ role: 'user', content: prompt }]
        });

        const content = message.content[0];
        const hint = content.type === 'text' ? content.text.trim() : 'Unable to generate a hint right now.';

        return NextResponse.json({ hint, hintNumber }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

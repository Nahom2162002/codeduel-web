import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import Problem from '@/models/Problem';
import { isValidObjectId } from '@/lib/inputValidator';
import { generateHint, MAX_HINT_LEVEL } from '@/lib/hintGenerator';
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

        const { allowed, retryAfterSeconds } = await checkRateLimit(`practice-hint:${user._id}`, 40, 10 * 60 * 1000);
        if (!allowed) return rateLimitResponse(retryAfterSeconds, corsHeaders);

        const { problemId, hintNumber } = await req.json().catch(() => ({}));

        if (!isValidObjectId(problemId)) {
            return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400, headers: corsHeaders });
        }
        if (!Number.isInteger(hintNumber) || hintNumber < 1 || hintNumber > MAX_HINT_LEVEL) {
            return NextResponse.json({ error: 'Invalid hint level' }, { status: 400, headers: corsHeaders });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        const hint = await generateHint(problem, hintNumber as 1 | 2 | 3);

        return NextResponse.json({ hint, hintNumber }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

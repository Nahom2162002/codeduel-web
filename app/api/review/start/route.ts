import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import Problem from '@/models/Problem';
import CodeReviewSession from '@/models/CodeReviewSession';
import { isValidObjectId } from '@/lib/inputValidator';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const MAX_CUSTOM_TITLE = 200;
const MAX_CUSTOM_DESCRIPTION = 5000;

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

        const { problemId, customTitle, customDescription, language } = await req.json().catch(() => ({}));

        if (typeof language !== 'string' || !language.trim() || language.length > 30) {
            return NextResponse.json({ error: 'Invalid language' }, { status: 400, headers: corsHeaders });
        }

        let problemTitle: string;
        let problemDescription: string;
        let linkedProblemId: string | null = null;

        // Exactly one of "pick an existing problem" / "describe your own" —
        // the latter is what makes this useful for code from outside the
        // platform (a LeetCode session, an interview, a day job), which is
        // the feature's actual headline use case, not a fallback.
        if (problemId !== undefined) {
            if (!isValidObjectId(problemId)) {
                return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400, headers: corsHeaders });
            }
            const problem = await Problem.findById(problemId);
            if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });
            problemTitle = problem.title;
            problemDescription = problem.description;
            linkedProblemId = problem._id.toString();
        } else {
            if (typeof customTitle !== 'string' || !customTitle.trim() || customTitle.length > MAX_CUSTOM_TITLE) {
                return NextResponse.json({ error: 'Invalid problem title' }, { status: 400, headers: corsHeaders });
            }
            if (typeof customDescription !== 'string' || !customDescription.trim() || customDescription.length > MAX_CUSTOM_DESCRIPTION) {
                return NextResponse.json({ error: 'Invalid problem description' }, { status: 400, headers: corsHeaders });
            }
            problemTitle = customTitle.trim();
            problemDescription = customDescription.trim();
        }

        const session = await CodeReviewSession.create({
            userId: user._id,
            problemId: linkedProblemId,
            problemTitle,
            problemDescription,
            language: language.trim(),
            rounds: []
        });

        return NextResponse.json({
            sessionId: session._id,
            problemTitle: session.problemTitle,
            problemDescription: session.problemDescription,
            language: session.language
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

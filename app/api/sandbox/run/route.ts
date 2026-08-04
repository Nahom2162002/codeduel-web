import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import Problem from '@/models/Problem';
import { isValidObjectId, isValidLanguage } from '@/lib/inputValidator';
import { executeCode, wrapWithIO } from '@/lib/codeExecution';
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Free-form, unscored test-case runner — no Duel/PracticeAttempt record, no
// ELO, no Claude call, and (unlike a real submission) never touches hidden
// test cases: those exist specifically so a duel can't be won by hardcoding
// the visible ones, and letting sandbox mode reveal their input/output would
// undo that the moment a user re-encounters the same problem in a real duel.
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        // No score is on the line, but each run is still a real Judge0 call —
        // a generous per-user cap keeps "run as many times as you want"
        // (interactive iteration) intact while blocking scripted abuse.
        const { allowed, retryAfterSeconds } = await checkRateLimit(`sandbox:${user._id}`, 40, 10 * 60 * 1000);
        if (!allowed) return rateLimitResponse(retryAfterSeconds, corsHeaders);

        const { problemId, language, userCode } = await req.json().catch(() => ({}));

        if (!isValidObjectId(problemId)) {
            return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400, headers: corsHeaders });
        }
        if (!isValidLanguage(language)) {
            return NextResponse.json({ error: 'Unsupported language' }, { status: 400, headers: corsHeaders });
        }
        if (typeof userCode !== 'string' || !userCode.trim()) {
            return NextResponse.json({ error: 'Invalid submission' }, { status: 400, headers: corsHeaders });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        if (problem.isPremium && user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required' }, { status: 403, headers: corsHeaders });
        }

        const visibleTestCases = problem.testCases.filter((tc: any) => !tc.isHidden);

        const wrappedUserCode = userCode.includes('stdin') || userCode.includes('sys.stdin')
            ? userCode
            : wrapWithIO(userCode, language, problem);

        const results = await executeCode(wrappedUserCode, language, visibleTestCases);
        const testsPassed = results.filter(r => r.passed).length;

        const testCaseResults = visibleTestCases.map((tc: any, i: number) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            output: results[i].output,
            error: results[i].error,
            passed: results[i].passed
        }));

        return NextResponse.json({
            testsPassed,
            totalTests: visibleTestCases.length,
            testCaseResults
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

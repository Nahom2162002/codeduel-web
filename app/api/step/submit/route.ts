import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Problem from '@/models/Problem';
import DailyDuelCount from '@/models/DailyDuelCount';
import StepSession from '@/models/StepSession';
import { buildSolutionPrompt } from '@/lib/claudeSolutionPrompt';
import { isValidObjectId, isValidLanguage } from '@/lib/inputValidator';
import { executeCode, wrapWithIO } from '@/lib/codeExecution';
import { MAX_HINT_LEVEL } from '@/lib/hintGenerator';
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
    let reservedSlot = false;
    let dayKey: Date | null = null;
    let userId: string | null = null;

    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
        userId = user._id.toString();

        // Each submission is a real Judge0 run plus two Claude calls (solution +
        // explanation) — same abuse-guard as step/hint, sized the same way.
        const { allowed, retryAfterSeconds } = await checkRateLimit(`step-submit:${user._id}`, 40, 10 * 60 * 1000);
        if (!allowed) return rateLimitResponse(retryAfterSeconds, corsHeaders);

        const { problemId, language, userCode, hintsUsed } = await req.json().catch(() => ({}));

        if (!isValidObjectId(problemId)) {
            return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400, headers: corsHeaders });
        }
        if (!isValidLanguage(language)) {
            return NextResponse.json({ error: 'Unsupported language' }, { status: 400, headers: corsHeaders });
        }
        if (typeof userCode !== 'string' || !userCode.trim()) {
            return NextResponse.json({ error: 'Invalid submission' }, { status: 400, headers: corsHeaders });
        }
        if (!Number.isInteger(hintsUsed) || hintsUsed < 0 || hintsUsed > MAX_HINT_LEVEL) {
            return NextResponse.json({ error: 'Invalid hint count' }, { status: 400, headers: corsHeaders });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        if (problem.isPremium && user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required' }, { status: 403, headers: corsHeaders });
        }

        // Free users get 3 total free slots/day (shared with real duels), but
        // only 1 of those may be spent on Step by Step — both constraints are
        // enforced in the same atomic update so concurrent requests can't
        // double-spend the sub-limit, mirroring the reservation pattern in
        // app/api/duels/route.ts.
        if (user.plan === 'free') {
            dayKey = new Date();
            dayKey.setHours(0, 0, 0, 0);

            try {
                await DailyDuelCount.findOneAndUpdate(
                    { userId: user._id, date: dayKey, count: { $lt: 3 }, stepCount: { $lt: 1 } },
                    { $inc: { count: 1, stepCount: 1 } },
                    { upsert: true, new: true }
                );
                reservedSlot = true;
            } catch (reserveErr: any) {
                if (reserveErr.code === 11000) {
                    const existing = await DailyDuelCount.findOne({ userId: user._id, date: dayKey });
                    if (existing && existing.stepCount >= 1) {
                        return NextResponse.json({
                            error: 'Step by Step mode is limited to 1 session per day on the free plan.',
                            stepLimitReached: true
                        }, { status: 403, headers: corsHeaders });
                    }
                    return NextResponse.json({
                        error: 'Free tier limit reached. Upgrade to Pro for unlimited duels.',
                        limitReached: true
                    }, { status: 403, headers: corsHeaders });
                }
                throw reserveErr;
            }
        }

        const wrappedUserCode = userCode.includes('stdin') || userCode.includes('sys.stdin')
            ? userCode
            : wrapWithIO(userCode, language, problem);

        const userResults = await executeCode(wrappedUserCode, language, problem.testCases);
        const testsPassed = userResults.filter(r => r.passed).length;
        const totalTests = problem.testCases.length;
        const passed = testsPassed === totalTests;

        const testCaseResults = problem.testCases.map((tc: any, i: number) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            output: userResults[i].output,
            error: userResults[i].error,
            passed: userResults[i].passed,
            isHidden: !!tc.isHidden
        }));

        // Correctness carries more weight than hint usage (70/30 split) — a
        // solution that doesn't work shouldn't out-score one that does just
        // because it used fewer hints.
        const correctnessScore = Math.round((testsPassed / totalTests) * 70);
        const hintScore = Math.round(((MAX_HINT_LEVEL - hintsUsed) / MAX_HINT_LEVEL) * 30);
        const totalScore = correctnessScore + hintScore;

        const solutionPrompt = buildSolutionPrompt(problem, language);
        const solutionMessage = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 1024,
            messages: [{ role: 'user', content: solutionPrompt }]
        });
        const solutionContent = solutionMessage.content[0];
        const rawSolutionCode = solutionContent.type === 'text' ? solutionContent.text.trim() : '';

        const explanationMessage = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 512,
            messages: [{
                role: 'user',
                content: `A student just went through "${problem.title}" in ${language} in Step by Step tutoring mode, using ${hintsUsed} hint${hintsUsed === 1 ? '' : 's'}, and got ${testsPassed}/${totalTests} test cases passing. Here is the reference solution:

\`\`\`${language}
${rawSolutionCode}
\`\`\`

Explain the approach and the key insight, in 3-5 sentences, directly to the student. Be educational and encouraging. No markdown headers.`
            }]
        });
        const explanationContent = explanationMessage.content[0];
        const solutionExplanation = explanationContent.type === 'text' ? explanationContent.text.trim() : '';

        await StepSession.create({
            userId: user._id,
            problemId: problem._id,
            language,
            userCode,
            hintsUsed,
            testsPassed,
            totalTests,
            passed,
            correctnessScore,
            hintScore,
            totalScore,
            solutionCode: rawSolutionCode,
            solutionExplanation
        });

        return NextResponse.json({
            testsPassed,
            totalTests,
            passed,
            testCaseResults,
            hintsUsed,
            correctnessScore,
            hintScore,
            totalScore,
            solutionCode: rawSolutionCode,
            solutionExplanation
        }, { headers: corsHeaders });
    } catch (err: any) {
        if (reservedSlot && dayKey && userId) {
            try {
                await DailyDuelCount.findOneAndUpdate(
                    { userId, date: dayKey },
                    { $inc: { count: -1, stepCount: -1 } }
                );
            } catch {}
        }
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

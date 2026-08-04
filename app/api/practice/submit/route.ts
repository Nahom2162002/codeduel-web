import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Problem from '@/models/Problem';
import PracticeAttempt from '@/models/PracticeAttempt';
import { buildSolutionPrompt } from '@/lib/claudeSolutionPrompt';
import { isValidObjectId, isValidLanguage } from '@/lib/inputValidator';
import { executeCode, wrapWithIO } from '@/lib/codeExecution';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Practice mode reuses the exact same Judge0 execution pipeline as real duels
// (see lib/codeExecution.ts), just without an AI opponent, scoring, or ELO —
// the point is a low-stakes rep, not a competitive result.
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        if (user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required', requiresPro: true }, { status: 403, headers: corsHeaders });
        }

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

        await PracticeAttempt.create({
            userId: user._id,
            problemId: problem._id,
            language,
            testsPassed,
            totalTests,
            passed
        });

        // Reveal Claude's solution + a plain-English walkthrough regardless of
        // pass/fail — the whole point of practice mode is learning the "why",
        // not gatekeeping the answer behind a correct submission.
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
                content: `A student just attempted "${problem.title}" in ${language} and got ${testsPassed}/${totalTests} test cases ${passed ? 'passing' : 'passing (not all)'}. Here is the reference solution:

\`\`\`${language}
${rawSolutionCode}
\`\`\`

Explain the approach and the key insight, in 3-5 sentences, directly to the student. Be educational and encouraging. No markdown headers.`
            }]
        });
        const explanationContent = explanationMessage.content[0];
        const solutionExplanation = explanationContent.type === 'text' ? explanationContent.text.trim() : '';

        return NextResponse.json({
            testsPassed,
            totalTests,
            passed,
            testCaseResults,
            solutionCode: rawSolutionCode,
            solutionExplanation
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

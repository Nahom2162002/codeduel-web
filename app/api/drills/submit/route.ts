import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import Problem from '@/models/Problem';
import User from '@/models/User';
import DailyDrillSet from '@/models/DailyDrillSet';
import { selectDrillProblems } from '@/lib/drillSelection';
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

function todayKey() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

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

        const dayKey = todayKey();

        // Lazily create today's set if this is somehow the first call of the
        // day (normally the client already called GET /api/drills/today,
        // which is what actually generates it) — same race-safe
        // upsert-then-refetch-on-collision pattern as that route.
        let drillSet;
        try {
            const problems = await selectDrillProblems(user._id);
            drillSet = await DailyDrillSet.findOneAndUpdate(
                { userId: user._id, date: dayKey },
                { $setOnInsert: { problemIds: problems.map(p => p._id), completedProblemIds: [], completed: false } },
                { upsert: true, new: true }
            );
        } catch (err: any) {
            if (err.code === 11000) {
                drillSet = await DailyDrillSet.findOne({ userId: user._id, date: dayKey });
            } else {
                throw err;
            }
        }

        const isInTodaysSet = drillSet.problemIds.some((id: any) => id.toString() === problemId);
        if (!isInTodaysSet) {
            return NextResponse.json({ error: 'This problem is not part of today\'s drill set' }, { status: 400, headers: corsHeaders });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        const wrappedUserCode = userCode.includes('stdin') || userCode.includes('sys.stdin')
            ? userCode
            : wrapWithIO(userCode, language, problem);

        const results = await executeCode(wrappedUserCode, language, problem.testCases);
        const testsPassed = results.filter(r => r.passed).length;
        const totalTests = problem.testCases.length;
        const passed = testsPassed === totalTests;

        const testCaseResults = problem.testCases.map((tc: any, i: number) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            output: results[i].output,
            error: results[i].error,
            passed: results[i].passed,
            isHidden: !!tc.isHidden
        }));

        const alreadyCompleted = drillSet.completedProblemIds.some((id: any) => id.toString() === problemId);
        let allCompleted = drillSet.completed;
        let streak = { current: user.drillStats?.currentStreak || 0, best: user.drillStats?.bestStreak || 0 };

        if (passed && !alreadyCompleted) {
            const updatedSet = await DailyDrillSet.findByIdAndUpdate(
                drillSet._id,
                { $addToSet: { completedProblemIds: problem._id } },
                { new: true }
            );
            allCompleted = updatedSet.completedProblemIds.length >= updatedSet.problemIds.length;

            if (allCompleted && !drillSet.completed) {
                await DailyDrillSet.findByIdAndUpdate(drillSet._id, { $set: { completed: true } });

                const last = user.drillStats?.lastCompletedDate;
                let newStreak = 1;
                if (last) {
                    const lastMidnight = new Date(last);
                    lastMidnight.setHours(0, 0, 0, 0);
                    const diffDays = Math.round((dayKey.getTime() - lastMidnight.getTime()) / 86400000);
                    if (diffDays === 1) newStreak = (user.drillStats.currentStreak || 0) + 1;
                    else if (diffDays === 0) newStreak = user.drillStats.currentStreak || 1;
                }
                const newBest = Math.max(user.drillStats?.bestStreak || 0, newStreak);

                await User.findByIdAndUpdate(user._id, {
                    $set: {
                        'drillStats.currentStreak': newStreak,
                        'drillStats.bestStreak': newBest,
                        'drillStats.lastCompletedDate': dayKey
                    }
                });
                streak = { current: newStreak, best: newBest };
            }
        }

        return NextResponse.json({
            passed,
            testsPassed,
            totalTests,
            testCaseResults,
            drillCompleted: passed,
            allCompleted,
            streak
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

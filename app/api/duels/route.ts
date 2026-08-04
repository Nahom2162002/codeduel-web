import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Duel from '@/models/Duel';
import Problem from '@/models/Problem';
import User from '@/models/User';
import DailyDuelCount from '@/models/DailyDuelCount';
import LiveSolveSession from '@/models/LiveSolveSession';
import { buildSolutionPrompt } from '@/lib/claudeSolutionPrompt';
import { isValidObjectId, isValidLanguage } from '@/lib/inputValidator';
import { executeCode, wrapWithIO } from '@/lib/codeExecution';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function getClaudeSolution(problem: any, language: string): Promise<{ code: string; time: number }> {
    const startTime = Date.now();
    const prompt = buildSolutionPrompt(problem, language);

    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
    });

    const aiTime = (Date.now() - startTime) / 1000;
    const content = message.content[0];
    const rawCode = content.type === 'text' ? content.text.trim() : '';

    // Claude often omits the stdin/stdout wrapper despite instructions — wrap it ourselves
    const wrappedCode = wrapWithIO(rawCode, language, problem);

    return { code: wrappedCode, time: aiTime };
}

async function evaluateCodeQuality(
    problem: any,
    userCode: string,
    aiCode: string,
    language: string
): Promise<{ userScore: number; aiScore: number; explanation: string }> {
    const prompt = `You are an expert code reviewer. Evaluate these two solutions to the same coding problem.

Problem: ${problem.title}
${problem.description}

Solution A (Human Developer):
\`\`\`${language}
${userCode}
\`\`\`

Solution B (AI):
\`\`\`${language}
${aiCode}
\`\`\`

Evaluate both solutions on:
1. Time complexity (O notation)
2. Space complexity
3. Code readability and clarity
4. Edge case handling
5. Overall elegance

Respond with ONLY a JSON object in this exact format:
{
  "userScore": <number 0-100>,
  "aiScore": <number 0-100>,
  "explanation": "<2-3 sentences explaining the key differences and what the developer could improve>"
}`;

    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
    });

    const content = message.content[0];
    const text = content.type === 'text' ? content.text.trim() : '{}';

    try {
        const clean = text.replace(/```json|```/g, '').trim();
        return JSON.parse(clean);
    } catch {
        return { userScore: 50, aiScore: 50, explanation: 'Unable to evaluate code quality.' };
    }
}

function calculateEloChange(result: 'win' | 'loss' | 'draw', difficulty: string): number {
    const kFactor = difficulty === 'hard' ? 25 : difficulty === 'medium' ? 20 : 15;
    if (result === 'win') return kFactor;
    if (result === 'loss') return -Math.floor(kFactor * 0.75);
    return 5;
}

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

        const { problemId, language, userCode, userTime } = await req.json();

        if (!problemId || !language || !userCode || userTime === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
        }

        // Reject non-primitive values before they reach a query filter —
        // Mongoose passes '$'-prefixed object keys straight through to MongoDB
        // as operators (e.g. Problem.findById({"$ne": null}) matches an
        // arbitrary document instead of throwing), so a raw client value here
        // is a NoSQL injection vector.
        if (!isValidObjectId(problemId)) {
            return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400, headers: corsHeaders });
        }
        if (!isValidLanguage(language)) {
            return NextResponse.json({ error: 'Unsupported language' }, { status: 400, headers: corsHeaders });
        }
        if (typeof userCode !== 'string' || typeof userTime !== 'number' || !Number.isFinite(userTime)) {
            return NextResponse.json({ error: 'Invalid submission' }, { status: 400, headers: corsHeaders });
        }

        // Fetch the problem
        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        // Gate premium problems
        if (problem.isPremium && user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required' }, { status: 403, headers: corsHeaders });
        }

        if (user.plan === 'free') {
            dayKey = new Date();
            dayKey.setHours(0, 0, 0, 0);

            try {
                await DailyDuelCount.findOneAndUpdate(
                    { userId: user._id, date: dayKey, count: { $lt: 3 } },
                    { $inc: { count: 1 } },
                    { upsert: true, new: true }
                );
                reservedSlot = true;
            } catch (reserveErr: any) {
                // A duplicate-key error here means a counter for today already exists
                // and its count wasn't < 3, i.e. the free tier limit is genuinely hit.
                if (reserveErr.code === 11000) {
                    return NextResponse.json({
                        error: 'Free tier limit reached. Upgrade to Pro for unlimited duels.',
                        limitReached: true
                    }, { status: 403, headers: corsHeaders });
                }
                throw reserveErr;
            }
        }

        // Wrap user code with stdin/stdout if not already wrapped
        const wrappedUserCode = userCode.includes('stdin') || userCode.includes('sys.stdin')
            ? userCode
            : wrapWithIO(userCode, language, problem);

        // Run user code against test cases
        const userResults = await executeCode(wrappedUserCode, language, problem.testCases);
        const userTestsPassed = userResults.filter(r => r.passed).length;

        // Reuse the solution Claude was already streaming live during the user's
        // duel (see /api/duels/live-solve) instead of generating a second one —
        // falls back to a fresh generation if the user submitted before that
        // stream finished, or if it never started.
        const liveSolve = await LiveSolveSession.findOne({
            userId: user._id,
            problemId: problem._id,
            language
        }).sort({ createdAt: -1 });

        const { code: aiCode, time: aiTime } = liveSolve
            ? { code: wrapWithIO(liveSolve.aiCode, language, problem), time: liveSolve.aiTime }
            : await getClaudeSolution(problem, language);

        // Run AI code against test cases
        const aiResults = await executeCode(aiCode, language, problem.testCases);
        const aiTestsPassed = aiResults.filter(r => r.passed).length;

        // Evaluate code quality
        const { userScore: userQualityRaw, aiScore: aiQualityRaw, explanation } =
            await evaluateCodeQuality(problem, userCode, aiCode, language);

        // Calculate final scores
        const totalTests = problem.testCases.length;
        const userCorrectnessScore = Math.round((userTestsPassed / totalTests) * 50);
        const aiCorrectnessScore = Math.round((aiTestsPassed / totalTests) * 50);

        // Speed score — faster time = higher score (max 10 points)
        const totalTime = userTime + aiTime;
        const userSpeedScore = Math.round(totalTime > 0 ? ((aiTime / totalTime)) * 10 : 5);
        const aiSpeedScore = Math.round(totalTime > 0 ? ((userTime / totalTime)) * 10 : 5);

        // Quality score — max 40 points, weighted from the raw 0-100 LLM rating
        const userQualityScore = Math.round(userQualityRaw / 100 * 40);
        const aiQualityScore = Math.round(aiQualityRaw / 100 * 40);

        const userFinalScore = userCorrectnessScore + userSpeedScore + userQualityScore;
        const aiFinalScore = aiCorrectnessScore + aiSpeedScore + aiQualityScore;

        // Per-test-case breakdown for the results page — pairs each test case
        // with both sides' actual output (or error) next to what was expected.
        const testCaseResults = problem.testCases.map((tc: any, i: number) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            userOutput: userResults[i].output,
            userError: userResults[i].error,
            userPassed: userResults[i].passed,
            aiOutput: aiResults[i].output,
            aiError: aiResults[i].error,
            aiPassed: aiResults[i].passed,
            isHidden: !!tc.isHidden
        }));

        // Determine result
        const diff = userFinalScore - aiFinalScore;
        const result: 'win' | 'loss' | 'draw' = diff > 0 ? 'win' : diff < 0 ? 'loss' : 'draw';

        // Calculate ELO change
        const eloChange = calculateEloChange(result, problem.difficulty);

        // Get Claude's explanation of its approach
        const explanationMessage = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 512,
            messages: [{
                role: 'user',
                content: `You just solved "${problem.title}" in ${language}. Here's your solution:

\`\`\`${language}
${aiCode}
\`\`\`

In 2-3 sentences, explain your approach and the key insight that makes this solution efficient. Be direct and educational.`
            }]
        });

        const approachExplanation = explanationMessage.content[0].type === 'text'
            ? explanationMessage.content[0].text
            : '';

        // Save duel
        const duel = new Duel({
            userId: user._id,
            problemId,
            language,
            userCode,
            aiCode,
            userTime,
            aiTime,
            userTestsPassed,
            aiTestsPassed,
            totalTests,
            userScore: userFinalScore,
            aiScore: aiFinalScore,
            userCorrectnessScore,
            aiCorrectnessScore,
            userSpeedScore,
            aiSpeedScore,
            userQualityScore,
            aiQualityScore,
            userQualityRaw,
            aiQualityRaw,
            testCaseResults,
            result,
            aiExplanation: explanation,
            aiApproach: approachExplanation,
            eloChange
        });
        await duel.save();

        const statsUpdate: any = {
            'stats.totalDuels': user.stats.totalDuels + 1,
            'stats.eloRating': Math.max(0, user.stats.eloRating + eloChange)
        };

        if (result === 'win') {
            statsUpdate['stats.wins'] = user.stats.wins + 1;
            statsUpdate['stats.currentStreak'] = user.stats.currentStreak + 1;
            statsUpdate['stats.bestStreak'] = Math.max(
                user.stats.bestStreak,
                user.stats.currentStreak + 1
            );
        } else if (result === 'loss') {
            statsUpdate['stats.losses'] = user.stats.losses + 1;
            statsUpdate['stats.currentStreak'] = 0;
        } else {
            statsUpdate['stats.draws'] = user.stats.draws + 1;
            statsUpdate['stats.currentStreak'] = user.stats.currentStreak + 1;
        }

        await User.findByIdAndUpdate(user._id, { $set: statsUpdate });

        return NextResponse.json({
            duelId: duel._id,
            result,
            userScore: userFinalScore,
            aiScore: aiFinalScore,
            userCorrectnessScore,
            aiCorrectnessScore,
            userSpeedScore,
            aiSpeedScore,
            userQualityScore,
            aiQualityScore,
            userQualityRaw,
            aiQualityRaw,
            testCaseResults,
            userTestsPassed,
            aiTestsPassed,
            totalTests,
            userTime,
            aiTime,
            aiCode,
            aiExplanation: explanation,
            aiApproach: approachExplanation,
            eloChange,
            newElo: Math.max(0, user.stats.eloRating + eloChange)
        }, { headers: corsHeaders });

    } catch (err: any) {
        if (reservedSlot && dayKey && userId) {
            try {
                await DailyDuelCount.findOneAndUpdate(
                    { userId, date: dayKey },
                    { $inc: { count: -1 } }
                );
            } catch {}
        }
        console.log('Duel error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

// GET — fetch duel history
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const duels = await Duel.find({ userId: user._id })
            .populate('problemId', 'title difficulty category')
            .sort({ completedAt: -1 })
            .limit(20);

        return NextResponse.json(duels, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}
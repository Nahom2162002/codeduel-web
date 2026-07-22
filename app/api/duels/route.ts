import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Duel from '@/models/Duel';
import Problem from '@/models/Problem';
import User from '@/models/User';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const LANGUAGE_IDS: Record<string, number> = {
    python: 71,
    javascript: 63,
    java: 62,
    cpp: 54
};

async function executeCode(code: string, language: string, testCases: any[]) {
    const languageId = LANGUAGE_IDS[language];
    const results = await Promise.all(
        testCases.map(async (testCase: any) => {
            const submitRes = await fetch(
                `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    },
                    body: JSON.stringify({
                        source_code: code,
                        language_id: languageId,
                        stdin: JSON.stringify(testCase.input),
                        expected_output: JSON.stringify(testCase.expectedOutput),
                        cpu_time_limit: 5,
                        memory_limit: 128000
                    })
                }
            );
            const result = await submitRes.json();
            return { passed: result.status?.id === 3, time: parseFloat(result.time || '0') };
        })
    );
    return results;
}

async function getClaudeSolution(problem: any, language: string): Promise<{ code: string; time: number }> {
    const startTime = Date.now();

    const prompt = `You are an expert competitive programmer. Solve this coding problem in ${language}.

Problem: ${problem.title}

Description:
${problem.description}

Constraints:
${problem.constraints.join('\n')}

Examples:
${problem.examples.map((e: any) => `Input: ${e.input}\nOutput: ${e.output}`).join('\n\n')}

Write ONLY the solution code in ${language}. No explanation, no markdown, just the raw code that can be executed directly. Use the same function signature as the starter code:

${problem.starterCode[language]}`;

    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
    });

    const aiTime = (Date.now() - startTime) / 1000;
    const content = message.content[0];
    const code = content.type === 'text' ? content.text.trim() : '';

    return { code, time: aiTime };
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
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const { problemId, language, userCode, userTime } = await req.json();

        if (!problemId || !language || !userCode || userTime === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
        }

        // Fetch the problem
        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        // Gate premium problems
        if (problem.isPremium && user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required' }, { status: 403, headers: corsHeaders });
        }

        // Check free tier duel limit (3 per day)
        if (user.plan === 'free') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const todayDuels = await Duel.countDocuments({
                userId: user._id,
                completedAt: { $gte: today }
            });
            if (todayDuels >= 3) {
                return NextResponse.json({
                    error: 'Free tier limit reached. Upgrade to Pro for unlimited duels.',
                    limitReached: true
                }, { status: 403, headers: corsHeaders });
            }
        }

        // Run user code against test cases
        const userResults = await executeCode(userCode, language, problem.testCases);
        const userTestsPassed = userResults.filter(r => r.passed).length;

        // Get Claude's solution
        const { code: aiCode, time: aiTime } = await getClaudeSolution(problem, language);

        // Run AI code against test cases
        const aiResults = await executeCode(aiCode, language, problem.testCases);
        const aiTestsPassed = aiResults.filter(r => r.passed).length;

        // Evaluate code quality
        const { userScore: qualityScore, aiScore: aiQualityScore, explanation } =
            await evaluateCodeQuality(problem, userCode, aiCode, language);

        // Calculate final scores
        const totalTests = problem.testCases.length;
        const userCorrectnessScore = (userTestsPassed / totalTests) * 50;
        const aiCorrectnessScore = (aiTestsPassed / totalTests) * 50;

        // Speed score — faster time = higher score (max 30 points)
        const totalTime = userTime + aiTime;
        const userSpeedScore = totalTime > 0 ? ((aiTime / totalTime)) * 30 : 15;
        const aiSpeedScore = totalTime > 0 ? ((userTime / totalTime)) * 30 : 15;

        // Quality score — max 20 points
        const userFinalScore = Math.round(userCorrectnessScore + userSpeedScore + (qualityScore / 100 * 20));
        const aiFinalScore = Math.round(aiCorrectnessScore + aiSpeedScore + (aiQualityScore / 100 * 20));

        // Determine result
        const diff = userFinalScore - aiFinalScore;
        const result: 'win' | 'loss' | 'draw' = diff > 5 ? 'win' : diff < -5 ? 'loss' : 'draw';

        // Calculate ELO change
        const eloChange = calculateEloChange(result, problem.difficulty);

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
            result,
            aiExplanation: explanation,
            eloChange
        });
        await duel.save();

        // Update user stats
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

        return NextResponse.json({
            duelId: duel._id,
            result,
            userScore: userFinalScore,
            aiScore: aiFinalScore,
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
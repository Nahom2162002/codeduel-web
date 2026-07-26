import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Duel from '@/models/Duel';
import Problem from '@/models/Problem';
import User from '@/models/User';
import DailyDuelCount from '@/models/DailyDuelCount';
import RevealSession from '@/models/RevealSession';
import { buildSolutionPrompt } from '@/lib/claudeSolutionPrompt';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const LANGUAGE_IDS: Record<string, number> = {
    python: 100, // Python (3.12.5) — 71 is 3.8.1, too old for `list[int]`-style starter code annotations
    javascript: 63,
    java: 62
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
                        cpu_time_limit: 5,
                        memory_limit: 128000
                    })
                }
            );
            const result = await submitRes.json();

            // Compare parsed JSON rather than raw stdout — different languages'
            // JSON serializers format output differently (e.g. Python's json.dumps
            // adds spaces after commas), so an exact string match against
            // Judge0's expected_output is unreliable across languages.
            let outputsMatch = false;
            try {
                const actual = JSON.parse((result.stdout || '').trim());
                outputsMatch = JSON.stringify(actual) === JSON.stringify(testCase.expectedOutput);
            } catch {
                outputsMatch = false;
            }

            return { passed: result.status?.id === 3 && outputsMatch, time: parseFloat(result.time || '0') };
        })
    );
    return results;
}

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

function wrapWithIO(solutionCode: string, language: string, problem: any): string {
    const funcName = problem.functionName;
    const sampleInput = problem.testCases[0]?.input || {};
    const inputKeys = Object.keys(sampleInput);

    if (language === 'python') {
        const dataArgs = inputKeys.map(k => `data["${k}"]`).join(', ');
        return `import json
import sys

${solutionCode}

if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    result = ${funcName}(${dataArgs})
    print(json.dumps(result, separators=(",", ":")))`;
    }

    if (language === 'javascript') {
        const camelName = funcName.replace(/_([a-z])/g, (_: string, l: string) => l.toUpperCase());
        const dataArgs = inputKeys.map(k => `data.${k}`).join(', ');
        return `${solutionCode}

const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const result = ${camelName}(${dataArgs});
    console.log(JSON.stringify(result));
});`;
    }

    if (language === 'java') {
        const dataArgs = inputKeys.map(k => `data.get("${k}")`).join(', ');
        return `import java.util.*;
import org.json.*;

public class Solution {
    ${solutionCode}

    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        JSONObject data = new JSONObject(input);
        Object result = new Solution().${funcName}(${dataArgs});
        System.out.println(result.toString());
    }
}`;
    }

    return solutionCode;
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

        const { problemId, language, userCode, userTime, isPractice: clientClaimsPractice } = await req.json();

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

        // Never trust a client-supplied "isPractice" flag on its own — anyone could
        // set it to bypass the daily duel limit for free. Only treat this as a
        // practice duel if a matching reveal was actually recorded server-side.
        let isPractice = false;
        let revealedAiCode = '';
        let revealedAiTime = 0;
        if (clientClaimsPractice) {
            const revealSession = await RevealSession.findOne({
                userId: user._id,
                problemId: problem._id,
                language
            }).sort({ createdAt: -1 });

            if (!revealSession) {
                return NextResponse.json({
                    error: 'No revealed solution found for this problem. Please reveal Claude\'s approach again before submitting.'
                }, { status: 400, headers: corsHeaders });
            }

            isPractice = true;
            revealedAiCode = revealSession.aiCode;
            revealedAiTime = revealSession.aiTime;
        }

        // Practice duels (Claude's approach was revealed mid-solve) have no competitive
        // stakes — they don't consume a free-tier slot and don't affect ELO or stats.
        if (user.plan === 'free' && !isPractice) {
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

        // Get Claude's solution — for practice duels, reuse the solution that was
        // already streamed to the user during reveal instead of generating a new
        // one, so the code they watched matches the code shown in the results.
        const { code: aiCode, time: aiTime } = isPractice && revealedAiCode
            ? { code: wrapWithIO(revealedAiCode, language, problem), time: Number(revealedAiTime) || 0 }
            : await getClaudeSolution(problem, language);

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

        // Determine result — practice duels never win/lose/draw, since the user
        // had access to Claude's solution while writing their own.
        const diff = userFinalScore - aiFinalScore;
        const result: 'win' | 'loss' | 'draw' | 'practice' = isPractice
            ? 'practice'
            : diff > 5 ? 'win' : diff < -5 ? 'loss' : 'draw';

        // Calculate ELO change — none for practice duels
        const eloChange = isPractice ? 0 : calculateEloChange(result as 'win' | 'loss' | 'draw', problem.difficulty);

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
            result,
            aiExplanation: explanation,
            aiApproach: approachExplanation,
            eloChange,
            isPractice: !!isPractice
        });
        await duel.save();

        // Practice duels don't touch ELO, win/loss/draw counts, or the streak —
        // there's nothing competitive to record.
        if (!isPractice) {
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
        }

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
            newElo: isPractice ? user.stats.eloRating : Math.max(0, user.stats.eloRating + eloChange)
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
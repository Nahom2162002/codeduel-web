import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import Problem from '@/models/Problem';
import PracticeAttempt from '@/models/PracticeAttempt';
import { getCategoryPerformance } from '@/lib/weakCategories';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const DIFFICULTY_RANK: Record<string, number> = { easy: 0, medium: 1, hard: 2 };

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        // Practice mode is built entirely on top of the weak-category detection
        // that already gates Pro on the stats dashboard — keeping that boundary
        // consistent rather than giving free users a Pro-only signal for free.
        if (user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required', requiresPro: true }, { status: 403, headers: corsHeaders });
        }

        const { weakCategories } = await getCategoryPerformance(user._id);

        if (weakCategories.length === 0) {
            return NextResponse.json({
                noWeakCategories: true,
                message: 'Play a few more duels — once a pattern shows up in your results, we\'ll build you a practice queue from it.'
            }, { headers: corsHeaders });
        }

        const candidates = await Problem.find({ category: { $in: weakCategories } });

        const completedIds = new Set(
            (await PracticeAttempt.find({ userId: user._id, passed: true }).distinct('problemId'))
                .map(id => id.toString())
        );

        const queue = candidates
            .filter(p => !completedIds.has(p._id.toString()))
            .sort((a, b) => {
                const diff = DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty];
                if (diff !== 0) return diff;
                return a.title.localeCompare(b.title);
            });

        if (queue.length === 0) {
            return NextResponse.json({
                queueComplete: true,
                weakCategories,
                message: 'You\'ve cleared every problem in your weak categories. Keep dueling and we\'ll refresh this list.'
            }, { headers: corsHeaders });
        }

        const next = queue[0];
        return NextResponse.json({
            weakCategories,
            remaining: queue.length,
            problem: {
                _id: next._id,
                title: next.title,
                difficulty: next.difficulty,
                category: next.category
            }
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

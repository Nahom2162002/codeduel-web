import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import Problem from '@/models/Problem';
import DailyDrillSet from '@/models/DailyDrillSet';
import { selectDrillProblems } from '@/lib/drillSelection';

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

// A streak only counts as "alive" if the last completed day was today or
// yesterday — otherwise it's effectively broken even though the stored
// value hasn't been reset yet (that only happens lazily, on next
// completion, in app/api/drills/submit).
function displayStreak(drillStats: any, dayKey: Date) {
    const current = drillStats?.currentStreak || 0;
    const best = drillStats?.bestStreak || 0;
    const last = drillStats?.lastCompletedDate;
    if (!last) return { current: 0, best };

    const lastMidnight = new Date(last);
    lastMidnight.setHours(0, 0, 0, 0);
    const diffDays = Math.round((dayKey.getTime() - lastMidnight.getTime()) / 86400000);
    return { current: diffDays <= 1 ? current : 0, best };
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        if (user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required', requiresPro: true }, { status: 403, headers: corsHeaders });
        }

        const dayKey = todayKey();
        const problems = await selectDrillProblems(user._id);

        let drillSet;
        try {
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

        const problemDocs = await Problem.find({ _id: { $in: drillSet.problemIds } });
        const byId = new Map(problemDocs.map(p => [p._id.toString(), p]));
        const completedSet = new Set(drillSet.completedProblemIds.map((id: any) => id.toString()));

        const orderedProblems = drillSet.problemIds
            .map((id: any) => byId.get(id.toString()))
            .filter(Boolean)
            .map((p: any) => ({
                _id: p._id,
                title: p.title,
                difficulty: p.difficulty,
                category: p.category,
                completed: completedSet.has(p._id.toString())
            }));

        return NextResponse.json({
            problems: orderedProblems,
            allCompleted: !!drillSet.completed,
            streak: displayStreak(user.drillStats, dayKey)
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

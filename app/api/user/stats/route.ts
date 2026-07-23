import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import Duel from '@/models/Duel';
import Problem from '@/models/Problem';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        // Get last 30 days of duels
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const duels = await Duel.find({
            userId: user._id,
            completedAt: { $gte: thirtyDaysAgo }
        }).populate('problemId').sort({ completedAt: -1 });

        // Win rate by category
        const categoryStats: Record<string, { wins: number; losses: number; draws: number }> = {};
        for (const duel of duels) {
            const problem = await Problem.findById(duel.problemId);
            if (!problem) continue;
            const cat = problem.category;
            if (!categoryStats[cat]) categoryStats[cat] = { wins: 0, losses: 0, draws: 0 };
            if (duel.result === 'win') categoryStats[cat].wins++;
            else if (duel.result === 'loss') categoryStats[cat].losses++;
            else categoryStats[cat].draws++;
        }

        // Win rate by difficulty
        const difficultyStats: Record<string, { wins: number; total: number }> = {
            easy: { wins: 0, total: 0 },
            medium: { wins: 0, total: 0 },
            hard: { wins: 0, total: 0 }
        };
        for (const duel of duels) {
            const problem = await Problem.findById(duel.problemId);
            if (!problem) continue;
            difficultyStats[problem.difficulty].total++;
            if (duel.result === 'win') difficultyStats[problem.difficulty].wins++;
        }

        // Last 7 days activity
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const dateStr = d.toISOString().split('T')[0];
            const dayDuels = duels.filter(duel =>
                duel.completedAt.toISOString().split('T')[0] === dateStr
            );
            return {
                date: d.toLocaleDateString('en-US', { weekday: 'short' }),
                duels: dayDuels.length,
                wins: dayDuels.filter(d => d.result === 'win').length
            };
        });

        // Weak and strong categories
        const weakCategories = Object.entries(categoryStats)
            .filter(([, s]) => {
                const total = s.wins + s.losses + s.draws;
                return total >= 3 && (s.wins / total) < 0.4;
            })
            .map(([cat]) => cat);

        const strongCategories = Object.entries(categoryStats)
            .filter(([, s]) => {
                const total = s.wins + s.losses + s.draws;
                return total >= 3 && (s.wins / total) >= 0.7;
            })
            .map(([cat]) => cat);

        return NextResponse.json({
            stats: user.stats,
            categoryStats,
            difficultyStats,
            last7Days,
            weakCategories,
            strongCategories,
            recentDuels: duels.slice(0, 10)
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}
import Duel from '@/models/Duel';
import Problem from '@/models/Problem';

// Shared by /api/user/stats (dashboard win-rate breakdown) and /api/practice
// (picks which categories to serve problems from) — both need the same
// "what is this user bad/good at" signal from their last 30 days of duels.
export async function getCategoryPerformance(userId: unknown) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const duels = await Duel.find({
        userId,
        completedAt: { $gte: thirtyDaysAgo }
    }).sort({ completedAt: -1 });

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

    return { duels, categoryStats, weakCategories, strongCategories };
}

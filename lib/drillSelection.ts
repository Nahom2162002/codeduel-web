import Problem from '@/models/Problem';
import { getCategoryPerformance } from '@/lib/weakCategories';

function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Picks 3 problems for a user's daily drill — biased toward their weak
// categories and toward 'easy' difficulty, since drills are meant to be
// shorter and more focused than a full duel problem, not a fresh content
// type. Falls back to a broader pool whenever weak-category data or easy
// problems alone can't fill out 3, so there's always something to drill —
// this is a daily habit loop, not a gated queue like Practice Mode.
export async function selectDrillProblems(userId: unknown) {
    const { weakCategories } = await getCategoryPerformance(userId);

    const picked: any[] = [];
    const usedIds = new Set<string>();

    const addFrom = (pool: any[], count: number) => {
        for (const p of shuffle(pool)) {
            if (picked.length >= 3 || count <= 0) break;
            if (usedIds.has(p._id.toString())) continue;
            picked.push(p);
            usedIds.add(p._id.toString());
            count--;
        }
    };

    if (weakCategories.length > 0) {
        const weakEasy = await Problem.find({ category: { $in: weakCategories }, difficulty: 'easy', isPremium: false });
        addFrom(weakEasy, 3);

        if (picked.length < 3) {
            const weakAny = await Problem.find({ category: { $in: weakCategories }, isPremium: false });
            addFrom(weakAny, 3 - picked.length);
        }
    }

    if (picked.length < 3) {
        const anyEasy = await Problem.find({ difficulty: 'easy', isPremium: false });
        addFrom(anyEasy, 3 - picked.length);
    }

    if (picked.length < 3) {
        const anyNonPremium = await Problem.find({ isPremium: false });
        addFrom(anyNonPremium, 3 - picked.length);
    }

    return picked.slice(0, 3);
}

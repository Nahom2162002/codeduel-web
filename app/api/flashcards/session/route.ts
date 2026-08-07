import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import Problem from '@/models/Problem';
import DailyFlashcardCount from '@/models/DailyFlashcardCount';
import { PATTERN_CATEGORIES } from '@/lib/flashcardCategories';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Pro gets a full session every time; free gets a shorter one (5 cards vs
// 10) and only 1 round per day — see the reservation below.
function sessionSizeFor(plan: string) {
    return plan === 'pro' ? 10 : 5;
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        // Free users get 1 flashcards round per day, resetting at midnight —
        // its own allowance, not shared with the duels/practice slot pool.
        if (user.plan !== 'pro') {
            const dayKey = new Date();
            dayKey.setHours(0, 0, 0, 0);

            try {
                await DailyFlashcardCount.findOneAndUpdate(
                    { userId: user._id, date: dayKey, count: { $lt: 1 } },
                    { $inc: { count: 1 } },
                    { upsert: true, new: true }
                );
            } catch (reserveErr: any) {
                if (reserveErr.code === 11000) {
                    return NextResponse.json({
                        error: 'You\'ve used your free flashcards round for today. Upgrade to Pro for unlimited rounds.',
                        flashcardsLimitReached: true
                    }, { status: 403, headers: corsHeaders });
                }
                throw reserveErr;
            }
        }

        const sessionSize = sessionSizeFor(user.plan);
        const filter: Record<string, unknown> = { category: { $in: PATTERN_CATEGORIES } };
        if (user.plan !== 'pro') filter.isPremium = false;

        const candidates = await Problem.find(filter);
        const picked = shuffle(candidates).slice(0, sessionSize);

        const cards = picked.map(p => {
            const distractorPool = PATTERN_CATEGORIES.filter(c => c !== p.category);
            const distractors = shuffle([...distractorPool]).slice(0, 3);
            const options = shuffle([p.category, ...distractors]);

            return {
                _id: p._id,
                title: p.title,
                description: p.description,
                difficulty: p.difficulty,
                examples: p.examples,
                options
            };
        });

        return NextResponse.json({ sessionSize: cards.length, cards }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

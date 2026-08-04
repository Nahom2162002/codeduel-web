import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import FlashcardAttempt from '@/models/FlashcardAttempt';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Available to every plan (unlike /api/user/stats) — flashcards aren't a
// Pro-exclusive mode, so the accuracy history that mode produces shouldn't be either.
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const attempts = await FlashcardAttempt.find({
            userId: user._id,
            answeredAt: { $gte: thirtyDaysAgo }
        });

        const totalAttempts = attempts.length;
        const correctAttempts = attempts.filter(a => a.correct).length;
        const overallAccuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : null;

        const byCategory: Record<string, { correct: number; total: number }> = {};
        for (const a of attempts) {
            if (!byCategory[a.correctCategory]) byCategory[a.correctCategory] = { correct: 0, total: 0 };
            byCategory[a.correctCategory].total++;
            if (a.correct) byCategory[a.correctCategory].correct++;
        }

        const weakestPatterns = Object.entries(byCategory)
            .filter(([, s]) => s.total >= 2)
            .map(([category, s]) => ({ category, accuracy: Math.round((s.correct / s.total) * 100), attempts: s.total }))
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, 3);

        return NextResponse.json({
            totalAttempts,
            overallAccuracy,
            weakestPatterns
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

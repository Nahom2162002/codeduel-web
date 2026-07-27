import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import User from '@/models/User';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const LIMIT = 100;

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Public — no auth required to view. Only ranks users who've actually played,
// so the board isn't padded with default-1000-ELO accounts that never duelled.
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const topUsers = await User.find({ 'stats.totalDuels': { $gte: 1 } })
            .sort({ 'stats.eloRating': -1, 'stats.totalDuels': -1 })
            .limit(LIMIT)
            .select('username plan stats.wins stats.losses stats.draws stats.totalDuels stats.eloRating');

        const leaderboard = topUsers.map((u: any, i: number) => ({
            rank: i + 1,
            username: u.username,
            plan: u.plan,
            eloRating: u.stats.eloRating,
            wins: u.stats.wins,
            losses: u.stats.losses,
            draws: u.stats.draws,
            totalDuels: u.stats.totalDuels
        }));

        const totalRanked = await User.countDocuments({ 'stats.totalDuels': { $gte: 1 } });

        // If the caller happens to be authenticated, surface their own rank even
        // if they fall outside the public top 100 — this endpoint stays public
        // either way, auth just personalizes the response.
        let you: { rank: number; username: string; eloRating: number; totalDuels: number } | null = null;
        const user = await getUserFromRequest(req);
        if (user && user.stats.totalDuels >= 1) {
            const higherRanked = await User.countDocuments({
                'stats.totalDuels': { $gte: 1 },
                'stats.eloRating': { $gt: user.stats.eloRating }
            });
            you = {
                rank: higherRanked + 1,
                username: user.username,
                eloRating: user.stats.eloRating,
                totalDuels: user.stats.totalDuels
            };
        }

        return NextResponse.json({ leaderboard, totalRanked, you }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

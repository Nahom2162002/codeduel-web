import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import CodeReviewSession from '@/models/CodeReviewSession';

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

        if (user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required', requiresPro: true }, { status: 403, headers: corsHeaders });
        }

        const sessions = await CodeReviewSession.find({ userId: user._id })
            .select('problemTitle language rounds updatedAt createdAt')
            .sort({ updatedAt: -1 })
            .limit(20);

        return NextResponse.json({
            sessions: sessions.map(s => ({
                _id: s._id,
                problemTitle: s.problemTitle,
                language: s.language,
                roundCount: s.rounds.length,
                updatedAt: s.updatedAt
            }))
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

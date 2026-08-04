import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import CodeReviewSession from '@/models/CodeReviewSession';
import { isValidObjectId } from '@/lib/inputValidator';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        if (user.plan !== 'pro') {
            return NextResponse.json({ error: 'Pro plan required', requiresPro: true }, { status: 403, headers: corsHeaders });
        }

        const { id } = await params;
        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: 'Invalid session ID' }, { status: 400, headers: corsHeaders });
        }

        const session = await CodeReviewSession.findOne({ _id: id, userId: user._id });
        if (!session) return NextResponse.json({ error: 'Review session not found' }, { status: 404, headers: corsHeaders });

        return NextResponse.json({
            sessionId: session._id,
            problemTitle: session.problemTitle,
            problemDescription: session.problemDescription,
            language: session.language,
            rounds: session.rounds
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

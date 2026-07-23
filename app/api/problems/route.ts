import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
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

        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const difficulty = searchParams.get('difficulty');

        const query: any = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        // Free users only get easy arrays and strings
        if (user.plan === 'free') {
            query.isPremium = false;
        }

        const problems = await Problem.find(query, {
            title: 1,
            difficulty: 1,
            category: 1,
            isPremium: 1
        });

        return NextResponse.json(problems, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { anthropic } from '@/lib/anthropic';
import Problem from '@/models/Problem';
import FlashcardAttempt from '@/models/FlashcardAttempt';
import { isValidObjectId } from '@/lib/inputValidator';
import { isPatternCategory } from '@/lib/flashcardCategories';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const { problemId, selectedCategory } = await req.json().catch(() => ({}));

        if (!isValidObjectId(problemId)) {
            return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400, headers: corsHeaders });
        }
        if (!isPatternCategory(selectedCategory)) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400, headers: corsHeaders });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) return NextResponse.json({ error: 'Problem not found' }, { status: 404, headers: corsHeaders });

        const correct = selectedCategory === problem.category;

        const prompt = correct
            ? `A student correctly identified that "${problem.category}" is the right approach/pattern for this problem:

Title: ${problem.title}
Description: ${problem.description}

In 2-3 sentences, confirm why "${problem.category}" is the right pattern here — what in the problem signals it. Speak directly to the student. No markdown.`
            : `A student is practicing pattern recognition. For this problem:

Title: ${problem.title}
Description: ${problem.description}

The correct approach/pattern is "${problem.category}", but the student picked "${selectedCategory}" instead. In 3-4 sentences, briefly explain why "${selectedCategory}" doesn't fit as well, then explain what in the problem actually signals "${problem.category}". Speak directly to the student, be encouraging. No markdown.`;

        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 350,
            messages: [{ role: 'user', content: prompt }]
        });
        const content = message.content[0];
        const explanation = content.type === 'text' ? content.text.trim() : '';

        await FlashcardAttempt.create({
            userId: user._id,
            problemId: problem._id,
            correctCategory: problem.category,
            selectedCategory,
            correct
        });

        return NextResponse.json({
            correct,
            correctCategory: problem.category,
            explanation
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

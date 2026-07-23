import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';

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

        if (!user.stripeCustomerId) {
            return NextResponse.json({ error: 'No subscription found' }, { status: 400, headers: corsHeaders });
        }

        // Check if user is on a trial — cancel immediately
        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripeCustomerId,
            status: 'trialing',
            limit: 1
        });

        if (subscriptions.data.length > 0) {
            const sub = subscriptions.data[0];
            await stripe.subscriptions.cancel(sub.id);

            const User = (await import('@/models/User')).default;
            await User.findByIdAndUpdate(user._id, {
                plan: 'free',
                cancelAtPeriodEnd: false,
                isTrialing: false,
                trialEnd: null
            });

            return NextResponse.json({ cancelled: true }, { headers: corsHeaders });
        }

        // Regular subscription — open portal
        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
        });

        return NextResponse.json({ url: session.url }, { headers: corsHeaders });
    } catch (err: any) {
        console.log('Portal error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}
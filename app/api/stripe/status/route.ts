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

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        if (!user.stripeCustomerId) {
            return NextResponse.json({
                plan: user.plan,
                cancelAtPeriodEnd: false,
                isTrialing: false,
                trialEnd: null
            }, { headers: corsHeaders });
        }

        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripeCustomerId,
            status: 'all',
            limit: 1
        });

        const sub = subscriptions.data[0] as any;

        if (!sub || sub.status === 'canceled') {
            return NextResponse.json({
                plan: 'free',
                cancelAtPeriodEnd: false,
                isTrialing: false,
                trialEnd: null
            }, { headers: corsHeaders });
        }

        const cancelAtPeriodEnd = sub.cancel_at_period_end ||
            (sub.cancel_at !== null && sub.cancel_at !== undefined);
        const isTrialing = sub.status === 'trialing';
        const periodEnd = sub.items?.current_period_end || sub.current_period_end;
        const trialEnd = sub.trial_end
            ? new Date((sub.trial_end as number) * 1000).toISOString()
            : null;

        return NextResponse.json({
            plan: user.plan,
            cancelAtPeriodEnd,
            isTrialing,
            trialEnd,
            currentPeriodEnd: periodEnd
                ? new Date(periodEnd * 1000).toISOString()
                : null
        }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}
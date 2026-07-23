import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import User from '@/models/User';
import mongoose from 'mongoose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 });

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
        console.log('Event type:', event.type);
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
    }

    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI!);
        }

        // Trial started
        if (event.type === 'customer.subscription.created') {
            const subscription = event.data.object as any;
            if (subscription.status === 'trialing') {
                await User.findOneAndUpdate(
                    { stripeCustomerId: subscription.customer },
                    { $set: { plan: 'pro', isTrialing: true, hasHadTrial: true, trialEnd: new Date(subscription.trial_end * 1000) } }
                );
            }
        }

        // Payment succeeded
        if (event.type === 'invoice.paid') {
            const invoice = event.data.object as any;
            await User.findOneAndUpdate(
                { stripeCustomerId: invoice.customer },
                { $set: { plan: 'pro', isTrialing: false, cancelAtPeriodEnd: false } }
            );
        }

        // Subscription updated
        if (event.type === 'customer.subscription.updated') {
            const subscription = event.data.object as any;
            const latestSub = await stripe.subscriptions.retrieve(subscription.id);
            const cancelAtPeriodEnd = latestSub.cancel_at_period_end ||
                ((latestSub as any).cancel_at !== null && (latestSub as any).cancel_at !== undefined);

            await User.findOneAndUpdate(
                { stripeCustomerId: subscription.customer },
                { $set: { cancelAtPeriodEnd } }
            );
        }

        // Subscription cancelled
        if (event.type === 'customer.subscription.deleted') {
            const subscription = event.data.object as any;
            await User.findOneAndUpdate(
                { stripeCustomerId: subscription.customer },
                { $set: { plan: 'free', isTrialing: false, cancelAtPeriodEnd: false } }
            );
        }

    } catch (err: any) {
        console.log('Database error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
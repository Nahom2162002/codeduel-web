import { NextResponse } from 'next/server';
import RateLimit from '@/models/RateLimit';

interface RateLimitResult {
    allowed: boolean;
    retryAfterSeconds: number;
}

// Fixed-window rate limiter backed by MongoDB rather than in-memory state —
// an in-memory counter wouldn't be consistent across the multiple serverless
// instances a Next.js API route can run behind. Mirrors the atomic
// findOneAndUpdate-with-upsert reservation pattern already used by
// DailyDuelCount for the free-tier duel cap: the `count: { $lt: limit }`
// filter means the update only succeeds under the limit, and once a window's
// counter already exists at the cap, the upsert's insert attempt collides
// with the unique index and throws E11000 — which is how "over the limit"
// is detected without a separate read-then-write race.
export async function checkRateLimit(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs);
    const retryAfterSeconds = Math.ceil((windowStart.getTime() + windowMs - Date.now()) / 1000);

    try {
        await RateLimit.findOneAndUpdate(
            { key, windowStart, count: { $lt: limit } },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
        );
        return { allowed: true, retryAfterSeconds };
    } catch (err: any) {
        if (err.code === 11000) {
            return { allowed: false, retryAfterSeconds };
        }
        throw err;
    }
}

// Best-effort client IP extraction for rate-limit keys — trusts the
// leftmost X-Forwarded-For entry, which is what the platform's edge/proxy
// layer sets to the real client address (spoofable by the client only if
// there's no proxy in front stripping/overwriting it, same trust model the
// rest of this app already assumes for any inbound header).
export function getClientIp(req: { headers: { get(name: string): string | null } }): string {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) return forwardedFor.split(',')[0].trim();
    const realIp = req.headers.get('x-real-ip');
    if (realIp) return realIp;
    return 'unknown';
}

export function rateLimitResponse(retryAfterSeconds: number, corsHeaders: Record<string, string>) {
    const minutes = Math.ceil(retryAfterSeconds / 60);
    return NextResponse.json(
        { error: `Too many attempts. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.` },
        { status: 429, headers: { ...corsHeaders, 'Retry-After': String(retryAfterSeconds) } }
    );
}

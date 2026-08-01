import { NextRequest, NextResponse } from 'next/server';

// This runs last and its Access-Control-Allow-Origin overwrites whatever
// each individual route's own (still-wildcard) corsHeaders object set, so
// restricting it here is what actually takes effect — the per-route copies
// are dead weight left over from before this existed, harmless to leave.
const ALLOWED_ORIGINS = [
    (process.env.NEXT_PUBLIC_APP_URL || '').replace(/\/$/, ''),
    'http://localhost:3000'
].filter(Boolean);

function corsHeadersFor(origin: string | null) {
    const allowOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    return {
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Vary': 'Origin',
    };
}

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/api/stripe/webhook') {
        return NextResponse.next();
    }

    const corsHeaders = corsHeadersFor(request.headers.get('origin'));

    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 204, headers: corsHeaders });
    }

    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: '/api/:path*'
};
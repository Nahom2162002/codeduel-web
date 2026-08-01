import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkRateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

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
    const { email, password } = await req.json();

    // Reject non-string values before they ever reach a query filter or
    // bcrypt — folded into the generic credentials error so a type-check
    // failure isn't distinguishable from a wrong password.
    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400, headers: corsHeaders });
    }

    // Two layers: a tight per-account limit (the thing actually being
    // brute-forced) and a looser per-IP limit (catches one attacker spraying
    // many different email addresses from the same source).
    const ip = getClientIp(req);
    const emailLimit = await checkRateLimit(`login:email:${email.toLowerCase()}`, 8, 15 * 60 * 1000);
    if (!emailLimit.allowed) return rateLimitResponse(emailLimit.retryAfterSeconds, corsHeaders);
    const ipLimit = await checkRateLimit(`login:ip:${ip}`, 30, 15 * 60 * 1000);
    if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds, corsHeaders);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400, headers: corsHeaders });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400, headers: corsHeaders });
    }

    if (!user.isEmailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in.', needsVerification: true },
        { status: 403, headers: corsHeaders }
      );
    }

    const token = jwt.sign(
        { userId: user._id.toString(), tokenVersion: user.tokenVersion },
        process.env.JWT_SECRET!,
        { expiresIn: '30d' }
    );

    return NextResponse.json({ message: 'Login successful!', token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}
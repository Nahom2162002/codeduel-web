import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { validatePassword } from '@/lib/passwordValidator';
import { sendVerificationEmail } from '@/lib/mailer';
import { validateUsername, validateEmail } from '@/lib/inputValidator';
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

    const ip = getClientIp(req);
    const ipLimit = await checkRateLimit(`register:ip:${ip}`, 6, 60 * 60 * 1000);
    if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds, corsHeaders);

    const { username, email, password } = await req.json();

    // Validate types/format before anything derived from these values ever
    // reaches a Mongoose query filter (see lib/inputValidator.ts).
    const usernameError = validateUsername(username);
    if (usernameError) {
      return NextResponse.json({ error: usernameError }, { status: 400, headers: corsHeaders });
    }

    const emailError = validateEmail(email);
    if (emailError) {
      return NextResponse.json({ error: emailError }, { status: 400, headers: corsHeaders });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400, headers: corsHeaders });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: 'Account already exists' }, { status: 400, headers: corsHeaders });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ error: 'A user account with this email already exists' }, { status: 400, headers: corsHeaders });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = new User({
      username,
      email,
      password: hashedPassword,
      passwordHistory: [hashedPassword],
      isEmailVerified: false,
      verificationToken,
      verificationTokenExpiry: new Date(Date.now() + 24 * 3600000)
    });
    await user.save();

    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (err: any) {
      return NextResponse.json({ error: `Account created, but we couldn't send the verification email: ${err.message}` }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json({ message: "Account created! Check your email to verify your account before logging in. Don't see it? Check your spam folder.", userId: user._id });
  } catch (err: any) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern ?? {})[0];
      const message = field === 'email'
        ? 'A user account with this email already exists'
        : field === 'username'
          ? 'Account already exists'
          : 'A user account with these details already exists';
      return NextResponse.json({ error: message }, { status: 400, headers: corsHeaders });
    }
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}
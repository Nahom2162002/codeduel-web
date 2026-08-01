import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/mailer';
import { validateEmail } from '@/lib/inputValidator';

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
    const { email } = await req.json();

    const emailError = validateEmail(email);
    if (emailError) {
      return NextResponse.json({ error: emailError }, { status: 400, headers: corsHeaders });
    }

    // Same response regardless of whether the account exists or is already
    // verified — see the identical reasoning in forgot-password/route.ts.
    const successMessage = { message: "If an account with that email exists and needs verification, we've sent a new verification link." };

    const user = await User.findOne({ email });
    if (!user || user.isEmailVerified) {
      return NextResponse.json(successMessage, { headers: corsHeaders });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = new Date(Date.now() + 24 * 3600000);
    await user.save();

    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json(successMessage, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}

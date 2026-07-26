import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { transporter } from '@/lib/mailer';
import crypto from 'crypto';

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

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'No account found with that email' }, { status: 400, headers: corsHeaders });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();

    // Now points to a Next.js page instead of an Express route
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

    try {
      await transporter.sendMail({
          from: `CodeDuel <${process.env.GMAIL_USER}>`,
          to: user.email,
          subject: 'CodeDuel Password Reset',
          html: `
              <!DOCTYPE html>
              <html>
              <body style="margin: 0; padding: 0; background: #14161b;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #14161b;">
                      <tr>
                          <td align="center" style="padding: 40px 24px;">
                              <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width: 480px; width: 100%; background: #1c1f27; border: 1px solid #2a2e38; border-radius: 14px;">
                                  <tr>
                                      <td style="padding: 40px 36px;">
                                          <div style="font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 11px; letter-spacing: 0.04em; color: #7cd0f5; margin: 0 0 20px;">
                                              [ CODEDUEL ]
                                          </div>
                                          <h1 style="font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; color: #f4f5f7; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 16px;">
                                              Password Reset Request
                                          </h1>
                                          <p style="font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; color: #a8adb8; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
                                              We received a request to reset your CodeDuel password. Click the button below to choose a new one. This link expires in 1 hour.
                                          </p>
                                          <table role="presentation" cellpadding="0" cellspacing="0">
                                              <tr>
                                                  <td bgcolor="#7cd0f5" style="border-radius: 8px;">
                                                      <a href="${resetUrl}" style="display: inline-block; font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; padding: 13px 32px; color: #14161b; text-decoration: none; font-weight: 700; font-size: 15px;">
                                                          Reset Password
                                                      </a>
                                                  </td>
                                              </tr>
                                          </table>
                                          <p style="font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; color: #6b7280; font-size: 13px; line-height: 1.6; margin: 28px 0 0;">
                                              If you did not request this, you can safely ignore this email.
                                          </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="padding: 20px 36px; border-top: 1px solid #2a2e38;">
                                          <p style="font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; color: #4b5160; font-size: 12px; margin: 0;">
                                              © ${new Date().getFullYear()} CodeDuel. All rights reserved.
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </body>
              </html>
          `
      });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json({ message: 'Password reset email sent!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { transporter } from '@/lib/mailer';
import { validateEmail } from '@/lib/inputValidator';
import { checkRateLimit, rateLimitResponse, getClientIp } from '@/lib/rateLimit';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

function escapeHtml(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Public, unauthenticated form — rate-limited by IP rather than by account
// (there's no logged-in user to key on) to keep it usable for signed-out
// visitors while still blocking scripted spam.
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name, email, message } = await req.json().catch(() => ({}));

        if (typeof name !== 'string' || !name.trim() || name.length > 100) {
            return NextResponse.json({ error: 'Please enter your name' }, { status: 400, headers: corsHeaders });
        }
        const emailError = validateEmail(email);
        if (emailError) {
            return NextResponse.json({ error: emailError }, { status: 400, headers: corsHeaders });
        }
        if (typeof message !== 'string' || !message.trim() || message.length > 5000) {
            return NextResponse.json({ error: 'Please enter a message (up to 5000 characters)' }, { status: 400, headers: corsHeaders });
        }

        const ip = getClientIp(req);
        const { allowed, retryAfterSeconds } = await checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
        if (!allowed) return rateLimitResponse(retryAfterSeconds, corsHeaders);

        await transporter.sendMail({
            from: 'CodeDuel <support@duelai.dev>',
            replyTo: email,
            to: 'support@duelai.dev',
            subject: `[Contact] ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
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
                                                [ CODEDUEL CONTACT FORM ]
                                            </div>
                                            <p style="font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; color: #a8adb8; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                                                <strong style="color: #f4f5f7;">${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;
                                            </p>
                                            <p style="font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; color: #f4f5f7; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
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

        return NextResponse.json({ message: "Thanks for reaching out — we'll get back to you soon." }, { headers: corsHeaders });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
}

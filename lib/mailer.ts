import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,  // your Brevo login email
        pass: process.env.EMAIL_PASS   // your Brevo SMTP key
    }
});

export async function sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email/${token}`;

    await transporter.sendMail({
        from: `CodeDuel <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your CodeDuel email',
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
                                            Verify Your Email
                                        </h1>
                                        <p style="font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; color: #a8adb8; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
                                            Welcome to CodeDuel! Click the button below to verify your email and activate your account. This link expires in 24 hours.
                                        </p>
                                        <table role="presentation" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td bgcolor="#7cd0f5" style="border-radius: 8px;">
                                                    <a href="${verifyUrl}" style="display: inline-block; font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; padding: 13px 32px; color: #14161b; text-decoration: none; font-weight: 700; font-size: 15px;">
                                                        Verify Email
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="font-family: 'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif; color: #6b7280; font-size: 13px; line-height: 1.6; margin: 28px 0 0;">
                                            If you did not create this account, you can safely ignore this email.
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
}

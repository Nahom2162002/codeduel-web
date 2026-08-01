import type { NextConfig } from "next";

// script-src/style-src need 'unsafe-inline': Next.js's App Router streams
// hydration data through inline <script> tags, and this app renders styling
// almost entirely via React's `style={{...}}` prop (inline `style="..."`
// attributes) rather than stylesheets — blocking either would break the
// site. This still blocks the thing that actually matters here: loading a
// script/stylesheet/frame from an attacker-controlled external origin. There
// is no known inline-HTML-injection vector in this app (see the security
// audit — no dangerouslySetInnerHTML, no unsanitized HTML rendering), so
// 'unsafe-inline' isn't standing in for a gap elsewhere.
// PostHog's api_host is configured as app.posthog.com (see
// PostHogProvider.tsx), but its SDK auto-routes actual traffic to
// region-specific subdomains — confirmed by loading the app with this CSP
// and reading the real blocked-request domains from the console rather than
// guessing from the config value, which pointed at the wrong host entirely.
const POSTHOG_HOSTS = 'https://us.i.posthog.com https://us-assets.i.posthog.com';

const CSP = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${POSTHOG_HOSTS}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    `connect-src 'self' ${POSTHOG_HOSTS}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests"
].join('; ');

const securityHeaders = [
    { key: 'Content-Security-Policy', value: CSP },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    // Belt-and-suspenders with the CSP's frame-ancestors above — some older
    // clients only honor this header, not the CSP directive.
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;

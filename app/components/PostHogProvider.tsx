'use client';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

// Path segments that carry a single-use secret token (password reset,
// email verification) — these must never leave the browser as analytics
// data. sanitize_properties runs on every captured event (pageview,
// autocapture, and manual posthog.capture calls alike), so this is the one
// place that needs to catch it rather than trying to opt out per page.
const SENSITIVE_TOKEN_PATH = /\/(reset-password|verify-email)\/[^/?#]+/gi;

function redactSensitiveUrls(value: unknown): unknown {
    return typeof value === 'string' ? value.replace(SENSITIVE_TOKEN_PATH, '/$1/[redacted]') : value;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: 'https://app.posthog.com',
            capture_pageview: true,
            capture_pageleave: true,
            persistence: 'localStorage',
            sanitize_properties: (properties) => {
                for (const key of ['$current_url', '$pathname', '$referrer']) {
                    if (key in properties) properties[key] = redactSensitiveUrls(properties[key]);
                }
                return properties;
            }
        });
    }, []);

    // Identify once per app load rather than in every page that fetches
    // /api/user/me — this wrapper already mounts once for the whole session.
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('/api/user/me', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.username) {
                    posthog.identify(data.username, {
                        plan: data.plan,
                        hasHadTrial: data.hasHadTrial
                    });
                }
            })
            .catch(() => {});
    }, []);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
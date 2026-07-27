'use client';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: 'https://app.posthog.com',
            capture_pageview: true,
            capture_pageleave: true,
            persistence: 'localStorage'
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
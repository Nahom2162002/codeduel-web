import type { Metadata } from 'next';
import LeaderboardClient from './LeaderboardClient';

export const metadata: Metadata = {
    title: 'Leaderboard — Top Coders vs Claude | CodeDuel',
    description: 'The global ranking of coders who’ve gone head-to-head with Claude AI on real coding problems. See who’s outperforming AI and where you’d stand.',
    openGraph: {
        title: 'CodeDuel Leaderboard — Can you out-code Claude?',
        description: 'The global ranking of coders who’ve gone head-to-head with Claude AI. See where you stand.',
        url: 'https://duelai.dev/leaderboard',
        type: 'website'
    },
    twitter: {
        card: 'summary',
        title: 'CodeDuel Leaderboard — Can you out-code Claude?',
        description: 'The global ranking of coders who’ve gone head-to-head with Claude AI.'
    }
};

export default function LeaderboardPage() {
    return <LeaderboardClient />;
}

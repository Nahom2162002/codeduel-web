import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'CodeDuel — Compete Against AI to Stay Sharp',
    description: 'Practice coding by competing against Claude AI. Keep your skills sharp in the age of AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className} style={{ margin: 0, background: '#0a0a0f' }}>
                {children}
            </body>
        </html>
    );
}
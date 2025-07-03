import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AI Chatbot with Ant Design X & Grok',
    description: 'Next.js 15 chatbot with Ant Design X and Grok AI',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers >{children}</Providers>
            </body>
        </html>
    );
}

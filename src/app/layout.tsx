import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/lib/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Energy Management Dashboard',
  description: 'Real-time energy monitoring and management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
import RootProviders from '@/components/providers/RootProviders';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Budget tracker',
  description: 'Manage your expences easily',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html
        lang="en"
        className="light"
        style={{
          colorScheme: 'dark',
        }}
      >
        <body className={inter.className}>
          <Toaster position="top-center" richColors />
          <RootProviders>{children}</RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}

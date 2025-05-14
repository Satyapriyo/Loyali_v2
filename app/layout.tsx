import { Suspense } from 'react';
import { WalletProviders } from "@/app/WalletProvider"
import { Inter } from 'next/font/google';

import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from "@/components/ui/sonner"

import Header from '@/components/Header';
import Banner from '@/components/Banner';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: {
    default: 'Loyali',
    template: '%s | Loyali',
  },
  description: 'Loyali is a decentralized platform that empowers creators and brands to build lasting communities through loyalty rewards in the form of compressed NFTs (cNFTs) on Solana.',
  icons: {
    icon: '/favicon.png', // or '/favicon.png' or array of sizes if needed
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="transition-colors duration-300">
      {/* Add className here to support fallback styling */}
      <body className={`${inter.className} bg-background text-foreground`}>
        {/* ThemeProvider must wrap the entire app */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<div>Loading wallet...</div>}>
            <WalletProviders>
              <div className="min-h-screen">
                {/* <Navbar /> */}
                <Header />
                <main className="pt-20">
                  <Banner />
                  {/* Main content */}
                  {children}
                  <Toaster />
                  <Analytics />
                </main>
              </div>

            </WalletProviders>

          </Suspense>
        </ThemeProvider>

      </body>
    </html>
  )
}

"use client";

import Link from "next/link";
import WalletButton from "./WalletButton";

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50   backdrop-blur-lg border-b border-gray-100/50 dark:border-gray-800/50 max-h-[100px]">
            <div className="container mx-auto px-4 lg:px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo and Brand */}
                    <Link href="/" className="flex items-center space-x-3 shrink-0">
                        <img src="/punks/punk1.svg" alt="Logo" width={36} height={36} className="rounded-lg ring-1 ring-gray-800/50" />
                        <span className="text-lg font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent whitespace-nowrap">
                            SolanaPunks
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8">
                        <Link href="/" className="  transition-colors duration-200 text-sm font-medium">Home</Link>
                        <Link href="/dashboard" className=" transition-colors duration-200 text-sm font-medium">Dashboard</Link>
                        <Link href="/rewards" className="  transition-colors duration-200 text-sm font-medium">Rewards</Link>
                        <Link href="/claim" className="  transition-colors duration-200 text-sm font-medium">Claim NFTs</Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-3 lg:gap-4 shrink-0">
                        {mounted && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="relative"
                            >
                                <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        )}
                        <WalletButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}

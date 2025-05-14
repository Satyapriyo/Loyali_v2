"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Github, Menu, X } from 'lucide-react';
import WalletButton from './WalletButton';

import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-40 bg-white transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">Loyali</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/dashboard" className="text-slate-700 hover:text-loyali-primary transition-colors">Create Drop</Link>
                    <Link href="/rewards" className="text-slate-700 hover:text-loyali-primary transition-colors">Collections</Link>
                    <Link href="/claim" className="text-slate-700 hover:text-loyali-primary transition-colors">Claim NFTS</Link>
                    {/* {/* <Link href="#pricing" className="text-slate-700 hover:text-loyali-primary transition-colors">Pricing</Link> */}
                    <Link href="/docs" className="text-slate-700 hover:text-loyali-primary transition-colors">Docs</Link>
                </nav>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center space-x-4 mt-2">
                    {/* <Button variant="outline" className="border-loyali-primary text-loyali-primary hover:bg-loyali-primary hover:text-white">
                        Claim Badge
                    </Button>
                    <Button className="bg-loyali-primary hover:bg-loyali-secondary text-white">
                        Create Drop
                    </Button> */}
                    <Link href="https://github.com/Satyapriyo/Loyali">
                        {/* <Github /> */}
                        <Image src="/github-brands.svg" width={20} height={20} alt='giticon' />
                    </Link>
                    <WalletButton />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-700"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute w-full py-4 px-4 animate-slide-up">
                    <nav className="flex flex-col space-y-4 mb-4">
                        <Link href="/dashboard" className="text-slate-700 hover:text-loyali-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Create Drop</Link>
                        <Link href="/rewards" className="text-slate-700 hover:text-loyali-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
                        <Link href="/claim" className="text-slate-700 hover:text-loyali-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Claim NFTS</Link>
                        <Link href="/docs" className="text-slate-700 hover:text-loyali-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Docs</Link>
                    </nav>
                    <div className="flex flex-col space-y-2">
                        {/* <Button variant="outline" className="w-full border-loyali-primary text-loyali-primary hover:bg-loyali-primary hover:text-white">
                            Claim Badge
                        </Button>
                        <Button className="w-full bg-loyali-primary hover:bg-loyali-secondary text-white">
                            Create Drop
                        </Button> */}
                        <div className='flex justify-around '>
                            <Link href="https://github.com/Satyapriyo/Loyali">
                                <Image src="/github-brands.svg" width={20} height={20} alt='giticon' />

                            </Link>
                            <WalletButton />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
// 
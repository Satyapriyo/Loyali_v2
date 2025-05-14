import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">Loyali</span>
                        </Link>
                        <p className="text-slate-300 mb-4">
                            Reward your community with on-chain loyalty badges powered by Solana cNFTs.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#"  className="text-slate-300 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="/#features" className="text-slate-300 hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/#how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</Link></li>
                            
                            <li><Link href="/docs" className="text-slate-300 hover:text-white transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="/docs" className="text-slate-300 hover:text-white transition-colors">Documentation</Link></li>
                            <li><Link href="/docs" className="text-slate-300 hover:text-white transition-colors">Guides</Link></li>
                            <li><Link href="/docs" className="text-slate-300 hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="text-slate-300 hover:text-white transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-slate-300 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="text-slate-300 hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-slate-400 text-sm flex flex-col md:flex-row justify-between">
                    <p>© {new Date().getFullYear()} Loyali. All rights reserved.</p>
                    <p>Built with ❤️ for the Solana community</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

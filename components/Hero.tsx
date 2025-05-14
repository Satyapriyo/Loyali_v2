import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="pt-32 pb-20 md:pt-36 md:pb-24 bg-gradient-to-tr from-loyali-light to-loyali-secondary -mt-4 ">
            <div className="container mx-auto px-4 ">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                    {/* Left content */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
                            Create & Share Loyalty Badges with the Power of
                            <span className="bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent"> Solana</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-700">
                            Turn your fans into loyal followers. Use Solana cNFTs to drop exclusive digital rewards, effortlessly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/dashboard">
                                <Button size="lg" className="bg-loyali-primary cursor-pointer hover:bg-loyali-secondary text-white">
                                    Create a Drop
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button></Link>
                            <Link href="/claim">
                                <Button size="lg" variant="outline" className="border-loyali-primary cursor-pointer text-loyali-primary hover:bg-loyali-primary hover:text-white">
                                    Claim a Badge
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right content - NFT Badge Preview */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-loyali-primary to-loyali-secondary rounded-3xl blur-xl opacity-20 animate-pulse-gentle" />
                            <div className="relative bg-white p-6 rounded-3xl border border-slate-200 shadow-lg animate-float">
                             <div className="aspect-square w-64 mx-auto mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-loyali-primary to-loyali-secondary flex items-center justify-center text-white text-6xl font-bold">
                                    <Image src="/hero.png" width={250} height={250} alt='nft_image' />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-xl text-black">Loyali Genesis Badge</h3>
                                    <p className="text-slate-600">Early Adopter Reward</p>
                                    <div className="mt-3 inline-block badge-gradient text-white px-3 py-1 rounded-full text-sm">
                                        Solana cNFT
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

// <div className="aspect-square w-64 mx-auto mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-loyali-primary to-loyali-secondary flex items-center justify-center text-white text-6xl font-bold">
// L
// </div>
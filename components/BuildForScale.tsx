import React from 'react';

const BuildForScale = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    {/* Left Side */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">Built for Scale</span>
                        </h2>
                        <p className="text-xl text-slate-700 mb-6">
                            Loyali uses <span className="font-semibold">Solana compressed NFTs</span>, making it possible to mint <span className="font-semibold">1 million+ NFTs</span> at a fraction of the cost of traditional NFTs.
                        </p>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6">
                            <div className="flex justify-between mb-3">
                                <span className="font-medium text-black">Traditional NFTs</span>
                                <span className="text-red-500">~$1-2 per NFT</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-black">Compressed NFTs</span>
                                <span className="text-green-500">~$0.0001 per cNFT</span>
                            </div>
                        </div>
                        <div className="p-4 bg-loyali-light rounded-lg">
                            <p className="font-medium text-loyali-primary">
                                10,000 traditional NFTs ≈ $10,000-20,000<br />
                                10,000 compressed NFTs ≈ $1
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Illustration */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-loyali-primary/20 to-loyali-secondary/20 rounded-3xl blur-xl" />
                            <div className="relative p-6 bg-white rounded-2xl border border-slate-200 shadow-lg">
                                <div className="flex gap-6 flex-wrap justify-center">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="w-12 h-12 rounded-lg bg-gradient-to-br from-loyali-primary to-loyali-secondary flex items-center justify-center text-white font-bold text-xs">
                                            cNFT
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-slate-500 text-sm">And thousands more for pennies...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuildForScale;
import React from 'react';

const WhatIsLoyali = () => {
    return (
        <section className="py-20 bg-white" id="about">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">
                        What is Loyali?
                    </h2>

                    <p className="text-xl text-slate-700 leading-relaxed">
                        Loyali is a <span className="font-semibold">no-code platform</span> that lets creators, influencers,
                        and brands distribute unique rewards and experiences to their communities — powered by
                        <span className="font-semibold"> Solana compressed NFTs (cNFTs)</span>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhatIsLoyali;
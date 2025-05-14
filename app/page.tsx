"use client";

import React from 'react';

import Hero from '@/components/Hero';
import WhatIsLoyali from '@/components/WhatIsLoyali';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import BuildForScale from '@/components/BuildForScale';
import ForWhoSection from '@/components/ForWhoSection';
import CtaSection from '@/components/CtaSection';

import Footer from "@/components/Footer";
import VideoSection from '@/components/VideoSection';

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <Hero />
        <WhatIsLoyali />
        <Features />
        <HowItWorks />
        <ForWhoSection />
        <VideoSection />
        <BuildForScale />
        <CtaSection />
        <Footer />
      </div>
    </>

    // <main className="min-h-screen ">
    //   {/* Hero Section */}
    //   <section className="relative h-screen flex items-center justify-center text-center px-4">
    //     <div className="absolute inset-0 bg-gradient-to-b from-[var(--foreground)] to-violet-900 dark:from-[var(--foreground)] dark:to-violet-90 z-0"></div>
    //     <div className="relative z-10 max-w-6xl mx-auto">
    //       <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-indigo-500 text-transparent bg-clip-text">
    //         The project that inspired the modern CryptoArt movement
    //       </h1>
    //       <p className="text-xl text-gray-300 mb-8">
    //         10,000 unique collectible characters with proof of ownership stored on the Solana blockchain.
    //       </p>
    //       <div className=" flex justify-around">
    //         <WalletButton />
    //       </div>
    //     </div>
    //   </section>

    //   {/* Meet the Punks Section */}
    //   <section className="py-20 px-4">
    //     <div className="max-w-6xl mx-auto">
    //       <h2 className="text-4xl font-bold mb-12">Meet the Punks</h2>
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //         {punks.map((punk) => (
    //           <div
    //             key={punk.id}
    //             className="bg-gradient-to-b from-black to-gray-900 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105"
    //           >
    //             <div className="aspect-square relative">
    //               <Image
    //                 src={punk.image}
    //                 alt={punk.name}
    //                 layout="fill"
    //                 objectFit="cover"
    //                 className="p-4"
    //               />
    //             </div>
    //             <div className="p-6">
    //               <h3 className="text-xl font-semibold text-white">{punk.name}</h3>
    //               <p className="text-violet-400 font-medium">{punk.price}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Largest Sales Section */}
    //   <section className="py-20 px-4 bg-gradient-to-b from-black to-violet-700">
    //     <div className="max-w-6xl mx-auto">
    //       <h2 className="text-4xl font-bold mb-12">Largest Sales</h2>
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //         {transactions.map((tx) => (
    //           <div key={tx.id} className="bg-gradient-to-b from-black to-gray-900 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
    //             <div className="aspect-square relative">
    //               <Image
    //                 src={tx.image}
    //                 alt={tx.name}
    //                 layout="fill"
    //                 objectFit="cover"
    //                 className="p-4"
    //               />
    //             </div>
    //             <div className="p-6">
    //               <h3 className="text-xl font-semibold text-white">{tx.name}</h3>
    //               <p className="text-violet-400">{tx.price}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* <div className="min-h-screen w-full bg-gradient-to-br from-black to-violet-900 text-white px-6 py-12">
    //     <div className="max-w-5xl mx-auto text-center space-y-6">
    //       <h1 className="text-4xl md:text-6xl font-bold">Create & Share Loyalty Badges with the Power of Solana</h1>
    //       <p className="text-lg md:text-xl text-gray-300">
    //         Turn your fans into loyal followers. Use Solana cNFTs to drop exclusive digital rewards, effortlessly.
    //       </p>
    //       <div className="flex justify-center gap-4 flex-wrap">
    //         <Button variant="default">Create a Drop</Button>
    //         <Button variant="secondary">Claim a Badge</Button>
    //       </div>
    //     </div>

    //     <section className="max-w-4xl mx-auto mt-24 space-y-6 text-center">
    //       <h2 className="text-3xl font-semibold">What is Loyali?</h2>
    //       <p className="text-gray-300">
    //         Loyali is a no-code platform that lets creators, influencers, and brands distribute unique rewards and
    //         experiences to their communities — powered by Solana compressed NFTs (cNFTs).
    //       </p>
    //     </section>

    //     <section className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 gap-6">
    //       {[
    //         { title: "Easy Setup", desc: "No code, no crypto knowledge needed." },
    //         { title: "Fast & Cheap", desc: "Built on Solana, claim thousands of cNFTs for pennies." },
    //         { title: "Secure & Scalable", desc: "Backed by Merkle Trees and Metaplex cNFT standards." },
    //         { title: "Unique Rewards", desc: "Fans receive verifiable, on-chain collectibles." },
    //         { title: "You Control the Cost", desc: "Creators pay for minting; fans claim for free." },
    //       ].map(({ title, desc }) => (
    //         <Card key={title} className="bg-violet-950/30 backdrop-blur border-violet-800">
    //           <CardContent className="p-6 space-y-2">
    //             <h3 className="text-xl font-bold text-white">{title}</h3>
    //             <p className="text-gray-300">{desc}</p>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </section>

    //     <section className="max-w-4xl mx-auto mt-24 text-center space-y-4">
    //       <h2 className="text-3xl font-semibold">How it Works</h2>
    //       <ol className="text-left text-gray-300 space-y-2 list-decimal list-inside">
    //         <li>Connect Wallet – We support Phantom, Backpack, and more.</li>
    //         <li>Create Your Drop – Upload artwork, set supply, define title.</li>
    //         <li>Pay & Mint – You cover the cost. We handle the rest.</li>
    //         <li>Share Claim Link – Fans claim your loyalty badge instantly.</li>
    //       </ol>
    //     </section>

    //     <section className="max-w-4xl mx-auto mt-24 text-center space-y-4">
    //       <h2 className="text-3xl font-semibold">Who is Loyali For?</h2>
    //       <div className="text-gray-300 space-y-1">
    //         <p>🎙️ Influencers – Reward your true fans.</p>
    //         <p>🎨 Artists – Give exclusive content or airdrops.</p>
    //         <p>🎮 Game Devs – Use it for in-game badges or skins.</p>
    //         <p>🛍️ Brands – Drop coupons or gated access tokens.</p>
    //       </div>
    //     </section>

    //     <section className="max-w-4xl mx-auto mt-24 text-center space-y-4">
    //       <h2 className="text-3xl font-semibold">Built for Scale</h2>
    //       <p className="text-gray-300">
    //         Loyali uses Solana compressed NFTs, making it possible to mint 1 million+ NFTs at a fraction of the cost
    //         of traditional NFTs.
    //       </p>
    //     </section>

    //     <section className="max-w-4xl mx-auto mt-24 text-center space-y-4">
    //       <h2 className="text-3xl font-semibold">Trusted. Secure. Decentralized.</h2>
    //       <p className="text-gray-300">
    //         All drops are verifiable on-chain. No custody. Your assets stay in your wallet.
    //       </p>
    //     </section>

    //     <section className="max-w-4xl mx-auto mt-24 text-center space-y-6">
    //       <h2 className="text-3xl font-semibold">Get Started Today</h2>
    //       <p className="text-gray-300 text-lg">
    //         Create your first drop in under 2 minutes. Your fans are waiting — make them feel seen.
    //       </p>
    //       <div className="flex justify-center gap-4">
    //         <Button variant="default">Create a Drop</Button>
    //         <Button variant="secondary">Claim a Badge</Button>
    //       </div>
    //     </section>
    //   </div> */}

    //   <Footer />
    // </main>
  );
}
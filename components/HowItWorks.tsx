import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const StepCard = ({ number, title, description }: { number: number, title: string, description: string }) => {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-12 h-12 -mt-2 -ml-2 rounded-full bg-loyali-primary text-white flex items-center justify-center text-xl font-bold">
                {number}
            </div>
            <div className="pl-8 pt-8">
                <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
                <p className="text-slate-600">{description}</p>
            </div>
        </div>
    );
};

const HowItWorks = () => {
    const steps = [
        {
            title: "Connect Wallet",
            description: "We support Phantom, Backpack, and more. Just click and connect securely."
        },
        {
            title: "Create Your Drop",
            description: "Upload artwork, set supply, define title. Design your perfect loyalty badge."
        },
        {
            title: "Pay & Mint",
            description: "You cover the cost. We handle the technical details and minting process."
        },
        {
            title: "Share Claim Link",
            description: "Fans claim your loyalty badge instantly. No payment required to claim , no gas fees."
        }
    ];

    return (
        <section className="py-20 bg-white" id="how-it-works">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                        How It <span className="bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">Works</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Four simple steps to launch your on-chain loyalty program
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {steps.map((step, index) => (
                            <StepCard
                                key={index}
                                number={index + 1}
                                title={step.title}
                                description={step.description}
                            />
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-loyali-primary cursor-pointer hover:bg-loyali-secondary text-white">
                                Create Your First Drop
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

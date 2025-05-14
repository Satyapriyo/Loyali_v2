import React from 'react';
import { Zap, Shield, Package, Award, DollarSign } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
    return (
        <div className="feature-card shadow-md p-4">
            <div className="mb-5 inline-block p-3 rounded-lg bg-loyali-light">
                <Icon className="h-6 w-6 text-loyali-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
            <p className="text-slate-600">{description}</p>
        </div>
    );
};

const Features = () => {
    const features = [
        {
            icon: Package,
            title: "Easy Setup",
            description: "No code, no crypto knowledge needed. Launch your loyalty program in minutes."
        },
        {
            icon: Zap,
            title: "Fast & Cheap",
            description: "Built on Solana, claim thousands of cNFTs for pennies with lightning-fast transactions."
        },
        {
            icon: Shield,
            title: "Secure & Scalable",
            description: "Backed by Merkle Trees and Metaplex cNFT standards for ultimate security."
        },
        {
            icon: Award,
            title: "Unique Rewards",
            description: "Fans receive verifiable, on-chain collectibles they can truly own."
        },
        {
            icon: DollarSign,
            title: "You Control the Cost",
            description: "Creators pay for minting; fans claim for free. Transparent pricing, no hidden fees."
        }
    ];

    return (
        <section className="py-20 bg-slate-50" id="features">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                        Why Use <span className="bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">Loyali</span>?
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Build stronger connections with your audience through exclusive digital rewards
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

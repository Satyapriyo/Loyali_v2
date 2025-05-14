import React from 'react';
import { Users, Rocket, Palette, ShoppingBag } from 'lucide-react';

const AudienceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
    return (
        <div className="feature-card text-center">
            <div className="mx-auto mb-5 inline-block p-3 rounded-lg bg-loyali-light">
                <Icon className="h-6 w-6 text-loyali-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
            <p className="text-slate-600">{description}</p>
        </div>
    );
};

const ForWhoSection = () => {
    const audiences = [
        {
            icon: Users,
            title: "Influencers",
            description: "Reward your true fans with exclusive badges and perks that recognize their loyalty."
        },
        {
            icon: Palette,
            title: "Artists",
            description: "Give exclusive content or early access to new releases through collectible badges."
        },
        {
            icon: Rocket,
            title: "Game Devs",
            description: "Create in-game badges, skins, or achievement tokens with blockchain verification."
        },
        {
            icon: ShoppingBag,
            title: "Brands",
            description: "Drop coupons, access tokens, or VIP status badges to your most loyal customers."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                        Who is <span className="bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">Loyali</span> For?
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Perfect for anyone looking to build stronger connections with their audience
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {audiences.map((audience, index) => (
                        <AudienceCard
                            key={index}
                            icon={audience.icon}
                            title={audience.title}
                            description={audience.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ForWhoSection;

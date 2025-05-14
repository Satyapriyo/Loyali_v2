import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface PlanFeature {
    included: boolean;
    text: string;
}

interface PricingPlan {
    name: string;
    price: string;
    description: string;
    features: PlanFeature[];
    buttonText: string;
    isPopular?: boolean;
}

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
    return (
        <div className={`pricing-card ${plan.isPopular ? 'pricing-popular' : ''}`}>
            {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-loyali-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    MOST POPULAR
                </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.price !== "Free" && <span className="text-slate-500">/month</span>}
            </div>
            <p className="text-slate-600 mb-6">{plan.description}</p>

            <div className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                        <div className="mr-3 pt-1">
                            {feature.included ? (
                                <Check className="h-5 w-5 text-loyali-primary" />
                            ) : (
                                <div className="h-5 w-5 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                </div>
                            )}
                        </div>
                        <span className={feature.included ? "text-slate-700" : "text-slate-400"}>
                            {feature.text}
                        </span>
                    </div>
                ))}
            </div>

            <Button
                className={plan.isPopular ? "w-full bg-loyali-primary hover:bg-loyali-secondary text-white" : "w-full bg-white hover:bg-slate-50 text-loyali-primary border border-loyali-primary"}>
                {plan.buttonText}
            </Button>
        </div>
    );
};

const Pricing = () => {
    const plans: PricingPlan[] = [
        {
            name: "Basic",
            price: "Free",
            description: "Perfect for getting started with loyalty rewards",
            features: [
                { included: true, text: "Up to 100 cNFTs per month" },
                { included: true, text: "Basic badge templates" },
                { included: true, text: "Standard support" },
                { included: false, text: "Custom designs" },
                { included: false, text: "Analytics dashboard" }
            ],
            buttonText: "Start Free"
        },
        {
            name: "Growth",
            price: "$49",
            description: "For creators ready to scale their community",
            features: [
                { included: true, text: "Up to 10,000 cNFTs per month" },
                { included: true, text: "Premium badge templates" },
                { included: true, text: "Priority support" },
                { included: true, text: "Custom designs" },
                { included: false, text: "Analytics dashboard" }
            ],
            buttonText: "Choose Growth",
            isPopular: true
        },
        {
            name: "Enterprise",
            price: "$199",
            description: "For brands and large communities",
            features: [
                { included: true, text: "Unlimited cNFTs" },
                { included: true, text: "All premium templates" },
                { included: true, text: "Dedicated support" },
                { included: true, text: "Custom designs" },
                { included: true, text: "Advanced analytics dashboard" }
            ],
            buttonText: "Contact Us"
        }
    ];

    return (
        <section className="py-20 bg-white" id="pricing">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Simple, <span className="bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">Transparent</span> Pricing
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Choose the plan that fits your community size and needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;

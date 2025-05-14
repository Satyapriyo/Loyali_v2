import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CtaSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-loyali-primary to-loyali-secondary text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Get Started Today
                    </h2>
                    <p className="text-xl mb-8 text-white/90">
                        Create your first drop in under 2 minutes.<br />
                        Your fans are waiting — make them feel seen.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-white text-loyali-primary cursor-pointer hover:bg-loyali-light">
                                Create a Drop
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/claim">
                            <Button size="lg" variant="outline" className="border-white cursor-pointer text-white hover:bg-white/10">
                                Claim a Badge
                            </Button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
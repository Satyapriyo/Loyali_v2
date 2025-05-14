"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { getActiveDrops } from "@/lib/db";
import { useWallet } from '@solana/wallet-adapter-react';

interface Drop {
    id: string;
    metadataUrl: string;
}

interface Metadata {
    name: string;
    description: string;
    image: string;
}

const DropsPage = () => {
    const { connected } = useWallet();
    const [drops, setDrops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [metadata, setMetadata] = useState<{ [key: string]: Metadata }>({});

    useEffect(() => {
        const fetchDrops = async () => {
            try {
                // Get active drops
                const Drop = await getActiveDrops();
                setDrops(Drop); // Set drops
                console.log(Drop);
            } catch (err) {
                console.error("Failed to fetch drops", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDrops();
    }, []);

    useEffect(() => {
        const fetchMetadata = async () => {
            const metadataPromises = drops.map(async (drop) => {
                try {
                    const metadataRes = await fetch(drop.metadata_url);
                    const metadataData: Metadata = await metadataRes.json();
                    return { [drop.id]: metadataData };
                } catch (error) {
                    console.error(`Failed to fetch metadata for drop ${drop.id}`, error);
                    return { [drop.id]: { name: "Unknown", description: "Failed to load", image: "" } };
                }
            });

            const metadataResults = await Promise.all(metadataPromises);
            const metadataObject = Object.assign({}, ...metadataResults);
            setMetadata(metadataObject);
        };

        if (drops.length > 0) {
            fetchMetadata();
        }
    }, [drops]);

    return (
        <div className="w-[99vw] bg-gradient-to-r from-purple-100 to-purple-200 -mt-4 pt-4 min-h-screen ">
            {!connected && (
                <div className="text-center text-red-500 font-medium mt-2 mb-4">
                    Please connect your wallet to continue.
                </div>
            )}
            <div className="p-6 space-y-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mt-10 bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">Active Drops</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
                    </div>
                ) : drops.length === 0 ? (
                    <p className="text-muted-foreground">No active drops available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {drops.map((drop) => {
                            const dropMetadata = metadata[drop.id];
                            return (
                                <Card key={drop.id} className="flex flex-col border-none hover:shadow-md duration-100 justify-between bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-black">{dropMetadata?.name || "Loading..."}</CardTitle>
                                        <CardDescription className="text-sm text-black">{dropMetadata?.description || "Loading..."}</CardDescription>
                                    </CardHeader>
                                    <div className="flex justify-center mt-4">
                                        <img
                                            src={dropMetadata?.image || "/default-image.png"}
                                            alt={dropMetadata?.name || "Drop Image"}
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                    <CardContent className="flex justify-between items-center pt-4">
                                        <Link href={`/claim/${drop.id}`}>
                                            <Button className="bg-purple-400 text-white hover:bg-purple-300 cursor-pointer">Claim</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropsPage;

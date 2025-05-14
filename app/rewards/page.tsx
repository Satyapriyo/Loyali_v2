"use client";


import { fetchUserCNFTs } from "@/lib/cnfts";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Rewards() {
    const { publicKey, connected } = useWallet();
    const [cnfts, setCnfts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!publicKey) return;
        setLoading(true);
        fetchUserCNFTs(publicKey.toString())
            .then(setCnfts)
            .finally(() => setLoading(false));
    }, [publicKey]);
    console.log(cnfts);

    return (
        <div className="min-h-screen px-6 -mt-4 py-20 bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200">
            <div className="text-center mb-16">
                {!connected && (
                    <div className="text-center text-red-500 font-medium mb-4">
                        Please connect your wallet to continue.
                    </div>
                )}
                <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-violet-400 to-indigo-500 text-transparent bg-clip-text"> Your NFTs </h1>
                <p className="text-gray-800 mt-4 text-lg"> A collection of your compressed NFTs </p> </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
                </div>
            ) : cnfts.length === 0 ? (
                <p className="text-white text-center text-lg">No cNFTs found in your wallet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {cnfts.map((cnft) => (
                        <Card key={cnft.id} className="rounded-2xl bg-white/10 backdrop-blur-md hover:shadow-md cursor-pointer  transition-transform duration-300 border border-violet-500/20 overflow-hidden" >
                            <CardHeader className="p-0">
                                <img src={cnft.content.links.image} alt={cnft.content.metadata.name} className="w-full h-52 object-cover" />
                            </CardHeader>
                            <CardContent className="p-4 space-y-1">
                                <CardTitle className="text-lg font-semibold text-gray-800 truncate">
                                    {cnft.content.metadata.name}
                                </CardTitle>
                                <p className="text-sm text-gray-400 truncate">
                                    {cnft.content.metadata.symbol || "Loyalty cNFT"}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

        </div>

    );
}

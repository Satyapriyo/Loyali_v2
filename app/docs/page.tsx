import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BookOpen, Calendar, Info, ExternalLink } from "lucide-react";

const Documentation = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
            {/* Navigation Bar */}


            {/* Hero Section */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r  from-purple-600 to-blue-500 text-transparent bg-clip-text">
                        📚 Loyali Documentation
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto ">
                        The comprehensive guide to creating and claiming NFT drops on the Solana blockchain.
                        Connect, create, and engage with your community.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-4"><Link className="cursor-pointer" href="/dashboard">
                        <Button className="bg-gradient-to-r from-purple-600 cursor-pointer to-blue-500 hover:from-purple-700 hover:to-blue-600">
                            <BookOpen className="mr-2 h-4 w-4" />Get Started
                        </Button></Link>
                        <Link href="/#tutorial">
                            <Button variant="outline" className="border-purple-200 hover:text-black text-black cursor-pointer">
                                <ExternalLink className="mr-2 h-4 w-4" /> View Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-5xl mx-auto pb-20 px-4">
                <Tabs defaultValue="guide" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8 text-black">
                        <TabsTrigger value="guide" className="cursor-pointer">📖 User Guide</TabsTrigger>
                        <TabsTrigger value="faq" className="cursor-pointer">❓ FAQ</TabsTrigger>
                        <TabsTrigger value="roadmap" className="cursor-pointer">🗺️ Roadmap</TabsTrigger>
                    </TabsList>

                    {/* User Guide Tab */}
                    <TabsContent value="guide">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Getting Started Card */}
                            <Card className="border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="bg-gradient-to-r text-black from-purple-50 to-blue-50 rounded-t-lg">
                                    <CardTitle className="flex items-center text-black">
                                        <span className="text-2xl mr-2 ">🛠️</span> Getting Started
                                    </CardTitle>
                                    <CardDescription>First steps to using Loyali</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <p className="text-gray-700">
                                        <strong className="text-purple-700">Connect Your Wallet:</strong> Click on &quot;Connect Wallet&quot; (top right).
                                        We support Phantom, Solflare, Backpack, and others. You&lsquo;ll need some SOL on devnet or mainnet.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Creating a Drop Card */}
                            <Card className="border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="bg-gradient-to-r text-black from-purple-50 to-blue-50 rounded-t-lg">
                                    <CardTitle className="flex items-center text-black">
                                        <span className="text-2xl mr-2">🎁</span> Creating a Drop
                                    </CardTitle>
                                    <CardDescription>For Creators</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start">
                                            <span className="text-purple-600 font-bold mr-2">1.</span>
                                            <span><strong className="text-purple-700">Upload Assets:</strong> Upload image, name, description. We use IPFS via Pinata.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-purple-600 font-bold mr-2">2.</span>
                                            <span><strong className="text-purple-700">Define Drop Parameters:</strong> Set max supply, description, and optionally whitelist wallets.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-purple-600 font-bold mr-2">3.</span>
                                            <span><strong className="text-purple-700">Review & Confirm:</strong> Preview and click &quot;Create Drop&quot;. We&apos;ll handle Merkle tree, collection NFT, metadata, and claim logic.</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Claiming a Drop Card */}
                            <Card className="border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="bg-gradient-to-r text-black from-purple-50 to-blue-50 rounded-t-lg">
                                    <CardTitle className="flex items-center text-black">
                                        <span className="text-2xl mr-2">🧾</span> Claiming a Drop
                                    </CardTitle>
                                    <CardDescription>For Fans</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start">
                                            <span className="text-purple-600 font-bold mr-2">1.</span>
                                            <span><strong className="text-purple-700">Access Claim Page:</strong> Get the drop link from a creator or browse active drops.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-purple-600 font-bold mr-2">2.</span>
                                            <span><strong className="text-purple-700">Connect Wallet:</strong> Make sure you&apos;re on devnet .</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-purple-600 font-bold mr-2">3.</span>
                                            <span><strong className="text-purple-700">Claim:</strong> Click &quot;Claim NFT&quot; — if eligible and supply exists, you&apos;ll receive your cNFT instantly.</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Wallet Safety Card */}
                            <Card className="border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="bg-gradient-to-r text-black from-purple-50 to-blue-50 rounded-t-lg">
                                    <CardTitle className="flex items-center text-black">
                                        <span className="text-2xl mr-2">🔐</span> Wallet Safety
                                    </CardTitle>
                                    <CardDescription>Security information</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <p className="text-gray-700">
                                        We use trusted wallet adapters. Loyali never stores or accesses your private keys.
                                        All transactions are verified on-chain for maximum security and transparency.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* FAQ Tab */}
                    <TabsContent value="faq">
                        <Card className=" text-black">
                            <CardHeader>
                                <CardTitle>Frequently Asked Questions</CardTitle>
                                <CardDescription>Common questions about using the Loyali platform</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>What is Test Mode?</AccordionTrigger>
                                        <AccordionContent>
                                            The platform is currently on <strong>Solana Devnet</strong> for testing.
                                            Creators can simulate the full flow using devnet SOL at zero cost.
                                            This allows you to test the platform before deploying to mainnet.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>How do I get devnet SOL?</AccordionTrigger>
                                        <AccordionContent>
                                            You can get devnet SOL from various faucets available online.
                                            Simply search for &quot;Solana devnet faucet&quot; and follow the instructions
                                            to send SOL to your wallet address.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>What wallets are supported?</AccordionTrigger>
                                        <AccordionContent>
                                            We support most Solana wallets including Phantom, Solflare, Backpack, and others.
                                            Any wallet that implements the Solana Wallet Adapter standard should work with our platform.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>How much does it cost to create a drop?</AccordionTrigger>
                                        <AccordionContent>
                                            On devnet, drops are free to create and claim. On mainnet,
                                            there will be nominal transaction fees for creating drops but claiming NFTs are free no gas fees required.
                                            We&apos;re working to keep these costs as low as possible by utilizing Compressed NFTs.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Roadmap Tab */}
                    <TabsContent value="roadmap">
                        <Card>
                            <CardHeader className="text-black">
                                <CardTitle>Roadmap & Coming Soon</CardTitle>
                                <CardDescription>What&apos;s next for the Loyali platform</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="relative border-l-2 border-purple-200 pl-8 pb-8 space-y-10">
                                    <div className="relative">
                                        <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center">
                                            <Calendar className="h-3 w-3 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-purple-700">Mainnet Launch</h3>
                                        <p className="text-gray-600 mt-2">
                                            Full launch on Solana mainnet with production-ready infrastructure and support for high-volume drops.
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                                            <Calendar className="h-3 w-3 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-blue-700">Creator Analytics Dashboard</h3>
                                        <p className="text-gray-600 mt-2">
                                            Comprehensive analytics for creators to track engagement, claims, and community growth.
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                                            <Calendar className="h-3 w-3 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-indigo-700">Mobile-friendly UX</h3>
                                        <p className="text-gray-600 mt-2">
                                            Optimized mobile experience for creating and claiming drops on the go.
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-pink-500 flex items-center justify-center">
                                            <Calendar className="h-3 w-3 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-pink-700">NFT Rarity Support</h3>
                                        <p className="text-gray-600 mt-2">
                                            Advanced support for NFT collections with different rarity tiers and traits.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>

            {/* Footer */}

        </div>
    );
};

export default Documentation;

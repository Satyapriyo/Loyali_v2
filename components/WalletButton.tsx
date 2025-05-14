"use client"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useWallet } from "@solana/wallet-adapter-react"
import { cn } from "@/lib/utils"
import "@/app/globals.css";

const WalletMultiButtonDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false },
)

export default function WalletButton() {
    const { connected, connecting, publicKey, wallet, select, connect } = useWallet()
    const [copied, setCopied] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setMounted(true)
        const initializeWallet = async () => {
            try {
                if (wallet && !connected) {
                    await connect()
                }
            } catch (err) {
                console.error('Wallet connection error:', err)
                setError('Failed to connect wallet. Please try again.')
            }
        }
        initializeWallet()
    }, [wallet, connect, connected])

    const truncatedAddress = mounted && publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : null

    const copyAddress = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (mounted && publicKey) {
            navigator.clipboard.writeText(publicKey.toString())
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    if (!mounted) return <div className="relative group"><div className="h-[40px] w-[180px] bg-gradient-to-r from-violet-500/50 to-indigo-500/50 rounded-xl animate-pulse"></div></div>

    if (error) {
        return (
            <div className="relative group">
                <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                    {error}
                    <button
                        onClick={() => {
                            setError(null);
                            if (wallet) connect();
                        }}
                        className="ml-2 underline"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center h-4 gap-3">
            <WalletMultiButtonDynamic
                className={cn(
                    "relative !bg-gradient-to-r !from-violet-500 !to-indigo-500",
                    "hover:!from-violet-600 hover:!to-indigo-600",
                    "!text-white !font-semibold !rounded-xl",
                    "!px-4 !py-2 !h-auto !min-h-[40px]",
                    "!transition-all !duration-300 !ease-out",
                    "!shadow-[0_4px_12px_-4px_rgba(79,70,229,0.3)] hover:!shadow-[0_8px_16px_-4px_rgba(79,70,229,0.4)]",
                    "active:!scale-[0.98] !border-0",
                    "!flex !items-center !justify-center !gap-2",
                    "disabled:!opacity-70 disabled:!cursor-not-allowed",
                    "disabled:!from-slate-400 disabled:!to-slate-500",
                    "hover:!translate-y-[-1px]"
                )}
                startIcon={undefined}
                endIcon={undefined}
            >
                {connecting ? (
                    <div className="flex items-center gap-3">
                        <LoadingSpinner />
                        <span className="tracking-wide">Connecting...</span>
                    </div>
                ) : connected ? (
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-200/50" />
                        <span className="font-mono tracking-wide">{truncatedAddress}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 w-full justify-center">
                        <WalletIcon />
                        <span className="tracking-wide font-medium">Connect Wallet</span>
                    </div>
                )}
            </WalletMultiButtonDynamic>
            {connected && (
                <button
                    onClick={copyAddress}
                    className={cn(
                        "p-2 rounded-lg transition-all duration-200",
                        "bg-violet-500/10  hover:bg-violet-500/20 active:bg-violet-500/30",
                        "group/copy relative"
                    )}
                >
                    {copied ? (
                        <div className="text-black"> <CheckIcon /></div>

                    ) : (
                        <div className="text-black"><CopyIcon /></div>
                    )}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/copy:opacity-100 transition-opacity duration-200">
                        {copied ? 'Copied!' : 'Copy address'}
                    </span>
                </button>
            )}
        </div>
    )
}

const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
)

const WalletIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        fill="none"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
        />
    </svg>
)

const CopyIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
)

const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-emerald-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
)

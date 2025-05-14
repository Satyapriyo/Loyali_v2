"use client";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    LedgerWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { AlphaWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { ReactNode, useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@/app/globals.css"
import { CivicAuthProvider } from "@civic/auth-web3/nextjs";
export function WalletProviders({ children }: { children: ReactNode }) {
    const network = WalletAdapterNetwork.Devnet; // Or Mainnet
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new LedgerWalletAdapter(),
            new AlphaWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <CivicAuthProvider>
                    <WalletModalProvider>
                        {children}
                    </WalletModalProvider>
                </CivicAuthProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
"use client";

import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";


// 1. Better connection handling with fallbacks
const getConnection = () => {
  try {
    if (process.env.NEXT_PUBLIC_HELIUS_API_KEY) {
      const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet";
      const url =
        network === "mainnet-beta"
          ? `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`
          : `https://devnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;

      return new Connection(url, { commitment: "confirmed" });
    }
    return new Connection(clusterApiUrl("devnet"), { commitment: "confirmed" });
  } catch (error) {
    console.error("Connection error:", error);
    throw error;
  }
};

// 2. Initialize Metaplex with proper storage
export const initializeMetaplex = (wallet: any) => {
  if (!wallet) {
    throw new Error("Wallet not connected");
  }

  const connection = getConnection();
  return Metaplex.make(connection).use(walletAdapterIdentity(wallet));
};

// Export connection for other modules
export const connection = getConnection();

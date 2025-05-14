import { Connection, clusterApiUrl } from "@solana/web3.js";

// Choose your preferred cluster: 'mainnet-beta', 'testnet', or 'devnet'
const RPC_ENDPOINT = process.env.RPC_ENDPOINT || clusterApiUrl("devnet");

// Create a new connection instance to interact with Solana
export const connection = new Connection(RPC_ENDPOINT, 'confirmed');

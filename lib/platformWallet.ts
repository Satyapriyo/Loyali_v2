"use server";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
const secretKey = process.env.PLATFORM_WALLET!;
const decoded = bs58.decode(secretKey);
const solanaKeypair = Keypair.fromSecretKey(decoded);
const umiKeypair = fromWeb3JsKeypair(solanaKeypair);

export const getPlatformWallet = async () => {
  return decoded;
};

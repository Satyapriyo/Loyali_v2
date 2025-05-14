import { NextRequest, NextResponse } from "next/server";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  publicKey,
  signerIdentity,
  generateSigner,
  keypairIdentity,
} from "@metaplex-foundation/umi";
import { Keypair } from "@solana/web3.js";
import {
  mintToCollectionV1,
  parseLeafFromMintV1Transaction,
  findLeafAssetIdPda,
  mplBubblegum,
} from "@metaplex-foundation/mpl-bubblegum";
import { findCollectionAuthorityRecordPda } from "@metaplex-foundation/mpl-token-metadata";
import {
  WalletAdapter,
  walletAdapterIdentity,
} from "@metaplex-foundation/umi-signer-wallet-adapters";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {
  findMetadataPda,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import bs58 from "bs58";
import { createSignerFromKeypair } from "@metaplex-foundation/umi";
import { getDrop } from "@/lib/db";
import { Connection, clusterApiUrl } from "@solana/web3.js";

import { getPlatformWallet } from "./platformWallet";
export const claimCnfts = async (
  wallet: WalletAdapter,
  merkle_tree: string,
  metadataUrl: string,
  creator_address: string
) => {
  try {
    // Load platform signer key
    const secretKey =await getPlatformWallet();
    console.log("SecretKey", secretKey);
    const solanaKeypair = Keypair.fromSecretKey(secretKey);
    const umiKeypair = fromWeb3JsKeypair(solanaKeypair);

    const connection = new Connection(clusterApiUrl("devnet"));

    // Create Umi instance with the signer
    const umi = createUmi("https://api.devnet.solana.com")
      .use(keypairIdentity(umiKeypair))
      .use(mplBubblegum())
      .use(mplTokenMetadata())
      .use(irysUploader({ address: "https://devnet.irys.xyz" }));

    

    if (!wallet?.publicKey) {
      throw new Error("Wallet must be connected to use Umi");
    }

    const newOwner = publicKey(wallet.publicKey);

    const metadataRes = await fetch(metadataUrl);
    if (!metadataRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch metadata" },
        { status: 500 }
      );
    }
    const metadata = await metadataRes.json();
    console.log(metadata);
    const collectionMint = process.env.NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS!;
    const collectionMetadataPda = findMetadataPda(umi, {
      mint: publicKey(collectionMint),
    });
    const collectionAuthority = publicKey(umiKeypair.publicKey);
    const collectionAuthorityRecordPda = findCollectionAuthorityRecordPda(umi, {
      mint: publicKey(collectionMint),
      collectionAuthority,
    });
    const { signature } = await mintToCollectionV1(umi, {
      leafOwner: newOwner,
      merkleTree: publicKey(merkle_tree),
      collectionMint: publicKey(collectionMint),
      collectionMetadata: collectionMetadataPda,
      // 🔑 must match who was delegated
      collectionAuthorityRecordPda, // 🔑 required if using delegated authority
      metadata: {
        name: metadata.name ?? "Compressed NFT",
        uri: metadataUrl,
        sellerFeeBasisPoints: 500,
        collection: { key: publicKey(collectionMint), verified: true }, // ✅ now valid
        creators: [
          {
            address: publicKey(creator_address),
            verified: true,
            share: 100,
          },
        ],
      },
    }).sendAndConfirm(umi, { send: { commitment: "finalized" } });

    const signatureBase58 = bs58.encode(signature);

    const leaf = await parseLeafFromMintV1Transaction(umi, signature);
    const assetId = findLeafAssetIdPda(umi, {
      merkleTree: publicKey(merkle_tree),
      leafIndex: leaf.nonce,
    });

    return {
      success: true,
      assetId: assetId.toString(),
      signature: signatureBase58,
    };
  } catch (err) {
    console.error("Claim error:", err);
  }
};

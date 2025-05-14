
import {
  mplBubblegum,
  mintToCollectionV1,
  parseLeafFromMintV1Transaction,
  findLeafAssetIdPda,
} from "@metaplex-foundation/mpl-bubblegum";
import { NextRequest, NextResponse } from "next/server";

import {
  mplTokenMetadata,
  // findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";

import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {
  keypairIdentity,
  publicKey as umiPublicKey,
} from "@metaplex-foundation/umi";
import bs58 from "bs58";
import { Connection, clusterApiUrl  } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";

// Load platform signer key
const secretKey = process.env.PLATFORM_WALLET!;
const decoded = bs58.decode(secretKey);
const solanaKeypair = Keypair.fromSecretKey(decoded);

const umiKeypair = fromWeb3JsKeypair(solanaKeypair);

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ dropId: string }> }
) {
  const dropId = (await params).dropId;
  console.log("DropId ", dropId);
  const body = await req.json();
  const recipient = body.recipient;
  const merkle_tree = body.merkle_tree;
  const metadata_url = body.metadataUrl;

  const collectionMint = body.collectionMint;
  const collectionMetadata = body.collectionMetadata;

  console.log("Recipient:", recipient);
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!recipient) {
    return new Response(
      JSON.stringify({ error: "Recipient wallet is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // const { data: drop, error } = await getDrop(dropId);

    // if (error || !drop) {
    //   return new Response(JSON.stringify({ error: "Drop not found" }), {
    //     status: 404,
    //     headers: { "Content-Type": "application/json" },
    //   });
    // }

    const connection = new Connection(clusterApiUrl("devnet"));
    const umi = createUmi("https://api.devnet.solana.com")
      .use(keypairIdentity(umiKeypair))
      .use(mplBubblegum())
      .use(mplTokenMetadata())
      .use(irysUploader({ address: "https://devnet.irys.xyz" }));
    // const umiSigner = createSignerFromKeypair(umi, solanaKeypair);

    // const collectionMetadataPda = findMetadataPda(umi, {
    //   mint: collectionMint,
    // });
    // const collectionAuthority = umiPublicKey(umiKeypair.publicKey);
    // const collectionAuthorityRecordPda = findCollectionAuthorityRecordPda(umi, {
    //   mint: umiPublicKey(collectionMint),
    //   collectionAuthority,
    // });
    const { name } = await (await fetch(metadata_url)).json();

    const { signature } = await mintToCollectionV1(umi, {
      leafOwner: umiPublicKey(recipient),
      merkleTree: umiPublicKey(merkle_tree),
      collectionMint: umiPublicKey(collectionMint),
      collectionMetadata: collectionMetadata,
      // 🔑 must match who was delegated  // 🔑 required if using delegated authority
      metadata: {
        name: name ?? "Compressed NFT",
        uri: metadata_url,
        sellerFeeBasisPoints: 500,
        collection: { key: umiPublicKey(collectionMint), verified: false }, // ✅ now valid
        creators: [
          {
            address: umi.identity.publicKey,
            verified: true,
            share: 100,
          },
        ],
      },
    }).sendAndConfirm(umi, { send: { commitment: "finalized" } });

    const signatureBase58 = bs58.encode(signature);
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    await connection.confirmTransaction(
      {
        signature: signatureBase58,
        blockhash,
        lastValidBlockHeight,
      },
      "finalized"
    );

    const leaf = await parseLeafFromMintV1Transaction(umi, signature);
    const assetId = findLeafAssetIdPda(umi, {
      merkleTree: umiPublicKey(merkle_tree),
      leafIndex: leaf.nonce,
    });

    return NextResponse.json(
      {
        success: true,
        assetId: assetId.toString(),
        signature: signatureBase58,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Claim error:", err);
    return NextResponse.json({ error: "Claim failed" }, { status: 500 });
  }
}

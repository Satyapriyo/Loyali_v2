import {
  createTree,
  mplBubblegum,
  setTreeDelegate,
} from "@metaplex-foundation/mpl-bubblegum";
import { Keypair } from "@solana/web3.js";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import {
  createNft,
  verifyCollection,
  verifyCollectionV1,
  findMetadataPda,
  findMasterEditionPda, // ✅ Import this
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { delegateCollectionV1 } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
  generateSigner,
  percentAmount,
  publicKey as umiPublicKey,
  sol,
  keypairIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {
  WalletAdapter,
  walletAdapterIdentity,
} from "@metaplex-foundation/umi-signer-wallet-adapters";
import { TokenStandard } from "@metaplex-foundation/mpl-token-metadata";

import { getPlatformWallet } from "@/lib/platformWallet";

async function checkBalance(umi: any, minBalance = sol(0.5)) {
  const balance = await umi.rpc.getBalance(umi.identity.publicKey);
  if (balance < minBalance) {
    throw new Error(
      `Insufficient balance. Current: ${balance.toString()}, Minimum required: ${minBalance.toString()}`
    );
  }
  return balance;
}

export const createCnft = async (
  wallet: WalletAdapter,
  metadataUrl: string,
  platformWalletAddress: string
) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const platformWalletReal = await getPlatformWallet();
    const solanaKeypair = Keypair.fromSecretKey(platformWalletReal);
    const umiKeypair = fromWeb3JsKeypair(solanaKeypair);
    const umi = createUmi("https://api.devnet.solana.com")
      .use(keypairIdentity(umiKeypair))
      .use(mplBubblegum())
      .use(mplTokenMetadata())
      .use(irysUploader({ address: "https://devnet.irys.xyz" }));

    if (!wallet?.publicKey) {
      throw new Error("Wallet must be connected to use Umi");
    }

    await checkBalance(umi);

    const response = await fetch(metadataUrl);
    const metadataJson = await response.json();
    const { name, description, image, collection_image } = metadataJson;

    // Step 1: Create Merkle Tree
    const merkleTree = generateSigner(umi);
    const createTreeTx = await createTree(umi, {
      merkleTree,
      maxDepth: 3,
      maxBufferSize: 8,
      canopyDepth: 0,
    });
    await createTreeTx.sendAndConfirm(umi);

    // Step 2: Create Collection NFT
    const collectionSigner = generateSigner(umi);
    const collectionMint = collectionSigner.publicKey;
    const collectionMetadata = {
      name,
      description,
      image: collection_image,
      properties: {
        files: [{ uri: image, type: "image/png" }],
      },
    };

    const collectionMetadataUri = await umi.uploader.uploadJson(
      collectionMetadata
    );

    await createNft(umi, {
      mint: collectionSigner,
      name,
      uri: collectionMetadataUri,
      isCollection: true,
      collection: undefined,
      sellerFeeBasisPoints: percentAmount(0),
    }).sendAndConfirm(umi);

    const collectionMetadataPda = findMetadataPda(umi, {
      mint: collectionSigner.publicKey,
    });
    const [metadataPublicKey] = collectionMetadataPda;
    const acc = await umi.rpc.getAccount(metadataPublicKey);
    console.log("Metadata account owner:", acc.publicKey.toString());
    const mintAcc = await umi.rpc.getAccount(collectionSigner.publicKey);
    console.log("Mint account owner:", mintAcc.publicKey.toString());
    // await verifyCollectionV1(umi, {
    //   metadata: collectionMetadataPda,
    //   collectionMint: collectionSigner.publicKey,
    //   authority: umi.identity,
    //   collectionMetadata: collectionMetadataPda,
    // }).sendAndConfirm(umi);

    // ✅ Also get the master edition PDA
    const masterEditionPda = findMasterEditionPda(umi, {
      mint: collectionSigner.publicKey,
    });

    // Step 3: Delegate tree authority
    const platformWallet = umiPublicKey(platformWalletAddress);

    const metadataPda = findMetadataPda(umi, { mint: collectionMint });

    // await setTreeDelegate(umi, {
    //   merkleTree: merkleTree.publicKey,
    //   treeCreator: umi.identity,
    //   newTreeDelegate: platformWallet,
    // }).sendAndConfirm(umi);
    // console.log(process.env.NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS!);

    // await delegateCollectionV1(umi, {
    //   mint: collectionSigner.publicKey,
    //   metadata: metadataPda,
    //   masterEdition: masterEditionPda,
    //   delegate: umiPublicKey(platformWalletAddress),
    //   updateAuthority: umi.identity.publicKey, // Wallet creating the NFT is the update authority
    //   tokenStandard: TokenStandard.NonFungible,
    // }).sendAndConfirm(umi);

    return {
      success: true,
      merkleTree: merkleTree.publicKey.toString(),
      collectionMint: collectionMint.toString(),
      collectionMetadata: collectionMetadataPda.toString(),
      collectionMasterEdition: masterEditionPda.toString(), // ✅ Add this // ✅ Add this
      metadataUrl,
    };
  } catch (error) {
    console.error("Error in createCnft:", error);
    throw error;
  }
};

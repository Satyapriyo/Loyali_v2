import {
  approveCollectionAuthority,
  delegateStandardV1,
  findMetadataPda,
  findCollectionAuthorityRecordPda,
  MPL_TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { publicKey as umiPublicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { web3JsRpc } from "@metaplex-foundation/umi-rpc-web3js";
import { useWallet } from "@solana/wallet-adapter-react";
import { TokenStandard } from "@metaplex-foundation/mpl-token-metadata";

/**
 * Delegates collection authority to a platform wallet.
 *
 * @param {string} collectionMintAddress - The mint address of the collection NFT.
 * @param {string} platformWalletAddress - The public key of the platform wallet.
 * @param {('mainnet-beta' | 'devnet' | 'testnet')} network - The Solana network to connect to.
 */
export async function delegateCollectionAuthority(
  collectionMintAddress: string,
  platformWalletAddress: string,
  network = "devnet"
) {
  try {
    // Initialize connection
    const connection = new Connection(clusterApiUrl("devnet"));
    const umi = createUmi("https://api.devnet.solana.com").use(
      web3JsRpc("https://api.devnet.solana.com")
    );
    // Convert addresses to PublicKey
    const collectionMint = umiPublicKey(collectionMintAddress);
    const platformWallet = umiPublicKey(platformWalletAddress);

    // Prompt the creator to connect their wallet
    const provider = window.solana;
    if (!provider) {
      throw new Error(
        "Solana provider not found. Please install a wallet like Phantom."
      );
    }

    await provider.connect();
    const creatorPublicKey = provider.publicKey;
    const wallet = useWallet();
    umi.use(walletAdapterIdentity(wallet));
    // Derive PDAs
    const metadataPda = findMetadataPda(umi, { mint: collectionMint });
    // const collectionAuthorityRecordPda = findCollectionAuthorityRecordPda(
    //     collectionMint,
    //   {
    //     mint: collectionMintAddress,
    //     collectionAuthority: platformWalletAddress,
    //   }
    // );

    // Create the instruction
    const instruction = await delegateStandardV1(umi, {
      mint: collectionMint,
      delegate: platformWallet,
      authority: umi.identity,
      tokenStandard: TokenStandard.NonFungible,
    }).sendAndConfirm(umi);

    // Create and send the transaction
    // const transaction = new Transaction().add(instruction);
    // transaction.feePayer = creatorPublicKey;
    // const { blockhash } = await connection.getRecentBlockhash();
    // transaction.recentBlockhash = blockhash;

    // const signedTransaction = await provider.signTransaction(transaction);
    // const signature = await connection.sendRawTransaction(
    //   signedTransaction.serialize()
    // );
    // await connection.confirmTransaction(signature, "processed");

    console.log(
      "✅ Collection authority delegated successfully. Transaction signature:"
    );
  } catch (error) {
    console.error("❌ Error delegating collection authority:", error);
  }
}

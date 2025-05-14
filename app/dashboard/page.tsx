"use client";
import { useState, useCallback, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDropzone } from "react-dropzone";
import { createCnft } from "@/lib/umi";
import { toast } from "sonner"
import { createDrop } from "@/lib/db";

import { PublicKey, Transaction, SystemProgram, Connection } from '@solana/web3.js';
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/Spinner";
import { useRouter } from 'next/navigation';


export default function Dashboard() {
  const { publicKey, sendTransaction, signTransaction, connected, wallet } = useWallet();
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [claimLink, setClaimLink] = useState<string | null>(null);

  const [collectionImageFile, setCollectionImageFile] = useState<File | null>(null);
  const [cnftImageFile, setCnftImageFile] = useState<File | null>(null);
  const [collectionPreview, setCollectionPreview] = useState<string | undefined>();
  const [cnftPreview, setCnftPreview] = useState<string | undefined>();
  const [approving, setApproving] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isApproved, setIsApproved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadings, setIsUploadings] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const makePaymet = async () => {
    if (!publicKey) {
      toast.error('Connect your wallet first.');
      throw new Error('Wallet not connected.');
    }

    setApproving(true);
    const walletAddress = process.env.NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS!;

    try {
      const platformWalletPublicKey = new PublicKey(walletAddress);
      const connection = new Connection('https://api.devnet.solana.com');

      const latestBlockhash = await connection.getLatestBlockhash();

      // Estimate 0.005 SOL per NFT
      const lamportsPerNFT = 100_000; //  0.0001 SOL = 1000000000 lamports
      const totalLamports = quantity * lamportsPerNFT;

      const tx = new Transaction({
        feePayer: publicKey,
        recentBlockhash: latestBlockhash.blockhash,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: platformWalletPublicKey,
          lamports: totalLamports,
        })
      );

      if (!signTransaction) {
        toast.error('Wallet is not connected properly. Please reconnect.')
        throw new Error('signTransaction not available.');
      }

      const signedTx = await signTransaction(tx);
      const txId = await connection.sendRawTransaction(signedTx.serialize());

      // ✅ Wait for confirmation
      const confirmation = await connection.confirmTransaction(
        {
          signature: txId,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        'confirmed'
      );

      if (confirmation.value.err) {
        console.error('Transaction failed:', confirmation.value.err);
        toast.error('Payment transaction failed.')
        throw new Error('Payment failed');
      }

      console.log('Funding transaction confirmed. Tx ID:', txId);
      setIsApproved(true);
      toast.success(`Platform funded with ${(totalLamports / 1e9).toFixed(6)} SOL successfully!`)
    } catch (error) {
      console.error('Error during funding/approval:', error);
      toast.error('Failed to approve and fund the platform wallet.')
      throw error; // rethrow so mintCNFT() can catch it
    } finally {
      setApproving(false);
    }
  };


  const uploadMetadataToPinata = async (metadata: Record<string, any>) => {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`, // or use a secure backend route
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) throw new Error("Failed to upload metadata to Pinata");

    const data = await response.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  };
  const handleUploadToPinata = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to upload image to Pinata");

    const data = await response.json();
    return data.url; // URL to access the image from IPFS
  };

  const onDropCollection = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setIsUploadings(true);
    const url = await handleUploadToPinata(file);
    setCollectionImageFile(file);
    setCollectionPreview(url);
    setIsUploadings(false);
  }, []);

  const onDropCnft = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setIsUploading(true);

    const url = await handleUploadToPinata(file);
    setCnftImageFile(file);
    setCnftPreview(url);
    setIsUploading(false);
  }, []);

  const mintCNFT = async () => {
    try {
      if (!wallet || !publicKey || !connected || !publicKey) {
        throw new Error("Wallet not connected.");
      }

      if (!collectionPreview || !cnftPreview) {
        throw new Error("Please upload both collection and CNFT images.");
      }

      setIsMinting(true);
      if (!wallet) {
        console.error("Wallet not connected");
        return;
      }
      await makePaymet();

      const metadata = {
        name: nftName,
        symbol: nftSymbol,
        description: nftDescription,
        image: cnftPreview, // IPFS link
        collection_image: collectionPreview, // optional
        attributes: [],
        properties: {},
      }
      const metadataUrl = await uploadMetadataToPinata(metadata);
      const platformWalletAddress = process.env.NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS!;
      console.log(metadata);
      const result = await createCnft(
        wallet.adapter,
        metadataUrl,
        platformWalletAddress
      );
      // toast("CNFT minted successfully!", {
      //   description: "Your CNFT has been minted successfully.",
      //   action: {
      //     label: "Close",
      //     onClick: () => console.log("Closed"),
      //   }
      // })
      console.log("CNFT Minted:", result);
      const { collectionMint, merkleTree, collectionMetadata, collectionMasterEdition } = result;
      const data = await createDrop({
        metadata_url: metadataUrl,
        collection_mint: collectionMint.toString(),
        merkle_tree: merkleTree.toString(),
        creator_address: publicKey.toString(),
        collection_metadata: collectionMetadata.toString(),
        collection_master_edition: collectionMasterEdition.toString(),
        name: nftName,
      });
      if (!data) {
        toast.error("Drop creation failed");
        return;
      } else {
        toast.success("Drop created successfully!");
        console.log(data);
      }
      const linkToClaim = `${window.location.origin}/claim/${data.id}`;
      setClaimLink(linkToClaim);
    } catch (error) {
      console.error("Minting error:", error);
    } finally {
      setIsMinting(false);
    }
  };

  const {
    getRootProps: getRootCollectionProps,
    getInputProps: getInputCollectionProps,
  } = useDropzone({
    onDrop: onDropCollection,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const {
    getRootProps: getRootCnftProps,
    getInputProps: getInputCnftProps,
  } = useDropzone({
    onDrop: onDropCnft,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200 px-4 -mt-2 py-12"> <h1 className="text-5xl sm:text-6xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text mb-12"> Creator Dashboard </h1>
      {!connected && (
        <div className="text-center text-red-500 font-medium mb-4">
          Please connect your wallet to continue.
        </div>
      )}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-200">
        {/* Image Uploads */} <div className="space-y-8">
          {/* Collection Image Upload */} <div>
            <h2 className="text-lg font-semibold text-black mb-2">Upload Collection Image</h2>
            <div {...getRootCollectionProps()} className="border-2 border-dashed border-purple-300 bg-white/60 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition" >
              <input {...getInputCollectionProps()} />
              {collectionPreview ?
                (<img src={collectionPreview} alt="Collection Preview" className="w-full h-48 object-contain rounded-lg" />) :
                (
                  isUploadings ? (
                    <Spinner />
                  ) : collectionPreview ? (
                    <img src={collectionPreview} alt="Collection Preview" className="w-full h-48 object-contain rounded-lg" />
                  ) : (
                    <p className="text-purple-500">Drag & drop or click to select</p>
                  )
                )}
            </div>
          </div>
          {/* CNFT Image Upload */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-2">Upload cNFT Image</h2>
            <div
              {...getRootCnftProps()}
              className="border-2 border-dashed border-purple-300 bg-white/60 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition"
            >
              <input {...getInputCnftProps()} />
              {cnftPreview ? (
                <img
                  src={cnftPreview}
                  alt="CNFT Preview"
                  className="w-full h-48 object-contain rounded-lg"
                />
              ) : (
                isUploading ? (
                  <Spinner />
                ) : cnftPreview ? (
                  <img src={cnftPreview} alt="CNFT Preview" className="w-full h-48 object-contain rounded-lg" />
                ) : (
                  <p className="text-purple-500">Drag & drop or click to select</p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Form + Mint */}
        <div className="space-y-5 md:mt-8">
          <input
            type="text"
            placeholder="NFT Name"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            className="w-full p-3 rounded-xl bg-purple-50 text-gray-800 placeholder-gray-400 border border-purple-200 focus:ring-2 focus:ring-loyali-secondary"
          />
          <input
            type="text"
            placeholder="NFT Symbol"
            value={nftSymbol}
            onChange={(e) => setNftSymbol(e.target.value)}
            className="w-full p-3 rounded-xl bg-purple-50 text-gray-800 placeholder-gray-400 border border-purple-200 focus:ring-2 focus:ring-loyali-secondary"
          />
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => {
              const parsed = parseInt(e.target.value);
              if (!isNaN(parsed)) {
                setQuantity(parsed);
              }
            }}
            className="w-full p-3 rounded-xl bg-purple-50 text-gray-800 placeholder-purple-400 border border-purple-200 focus:ring-2 focus:ring-loyali-secondary"
          />
          <p className="text-sm text-gray-400">
            Estimated cost: {(quantity * 0.0001).toFixed(6)} SOL will be paid to the platform for minting.
          </p>
          <textarea
            placeholder="NFT Description"
            value={nftDescription}
            onChange={(e) => setNftDescription(e.target.value)}
            className="w-full p-3 h-32 rounded-xl bg-purple-50 text-gray-800 placeholder-gray-400 border border-purple-200 focus:ring-2 focus:ring-loyali-secondary"
          />
          <button
            onClick={mintCNFT}
            disabled={isUploading || !collectionPreview || !cnftPreview}
            className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${isUploading || !collectionPreview || !cnftPreview
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-indigo-600 hover:to-purple-600"
              }`}
          >
            {isMinting ? (<div className="flex justify-center items-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Minting...
            </div>) : "Create Drop"}
          </button>

          {claimLink && (
            <div className="mt-1 p-4 bg-green-50 text-green-800 border border-green-200 rounded-xl space-y-2">
              <p className="font-semibold">🎉 Drop created successfully!</p>
              <p>
                Share this claim link:{" "}
                <a href={claimLink} target="_blank" rel="noopener noreferrer" className="underline text-green-600">
                  {claimLink}
                </a>
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(claimLink)}
                className="text-sm text-green-700 underline"
              >
                📋 Copy Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

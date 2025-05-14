"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useParams } from "next/navigation";

export default function ClaimPage() {
  const { wallet, connected, publicKey } = useWallet();
  const params = useParams();
  const dropId = params?.dropId as string;

  const [dropInfo, setDropInfo] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchDropInfo = async () => {
      try {
        const res = await fetch(`/api/claim/${dropId}/info`);
        const data = await res.json();
        setDropInfo(data);

        const metadataRes = await fetch(data.metadataUrl);
        const metadataJson = await metadataRes.json();
        setMetadata(metadataJson);
      } catch (error) {
        console.error("Error fetching drop info:", error);
      } finally {
        setFetching(false);
      }
    };

    if (dropId) fetchDropInfo();
  }, [dropId]);

  const handleClaim = async () => {
    if (!wallet || !dropInfo || !metadata) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/claim/${dropId}`, {
        method: "POST",
        body: JSON.stringify({
          recipient: publicKey!.toString(),
          merkle_tree: dropInfo.merkleTree,
          collectionMint: dropInfo.collectionMint,
          collectionmetadata: dropInfo.collectionMetadata,
          metadataUrl: dropInfo.metadataUrl,
          collectionMasterEdition: dropInfo.collectionMasterEdition,
          creator_address: dropInfo.creatorAddress,
        }),
      }).then((res) => res.json());

      if (res?.signature) {
        setResult({ success: true, signature: res.signature });
      } else {
        setResult({ success: false, error: res?.error || "Unknown error" });
      }
    } catch (err) {
      setResult({ success: false, error: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200 text-gray-900 p-6 flex flex-col items-center justify-center -mt-4 "> <div className="w-full max-w-xl bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-purple-200">
      <h1 className="text-3xl font-bold mb-4 text-center text-purple-800">🎁 Claim Your cNFT</h1>

      {!connected && (
        <p className="text-red-600 text-center mb-4">
          Please connect your wallet to continue.
        </p>
      )}

      {fetching ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
        </div>
      ) : metadata ? (
        <div className="border border-purple-200 p-4 rounded-lg shadow mb-4 text-center bg-white/70">
          <img
            src={metadata.image}
            alt="NFT"
            className="mx-auto w-48 h-48 object-cover rounded-lg mb-3"
          />
          <h2 className="text-xl font-semibold text-purple-800">{metadata.name}</h2>
          <p className="text-sm text-gray-700 mt-1">{metadata.description}</p>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Failed to load metadata.</p>
      )}

      <button
        disabled={!connected || loading || fetching}
        onClick={handleClaim}
        className="w-full mt-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white transition px-4 py-2 rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? (
          <div className="flex justify-center items-center gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            Minting...
          </div>
        ) : (
          "Claim Now"
        )}
      </button>

      {result && (
        <div className="mt-6 text-center">
          {result.success ? (
            <p className="text-green-600">
              ✅ Success!{" "}
              <a
                href={`https://explorer.solana.com/tx/${result.signature}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                className="underline text-purple-700"
              >
                View on Solana Explorer
              </a>
            </p>
          ) : (
            <p className="text-red-600">
              ❌ Error: {result.error || "An error occurred."}
            </p>
          )}
        </div>
      )}
    </div>
    </div>
  );
}

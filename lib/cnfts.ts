import { connection } from "./metaplex";

export const fetchUserCNFTs = async (walletAddress: string) => {
  const response = await fetch(
    `https://devnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: walletAddress,
          page: 1,
          limit: 100,
        },
      }),
    }
  );
  const { result } = await response.json();
  console.log(result);
  return result.items;
};

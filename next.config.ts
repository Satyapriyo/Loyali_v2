import type { NextConfig } from "next";

import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false, // Exclude 'child_process' from client-side builds
        fs: false, // Exclude 'fs' as well
        readline: false, // Exclude 'readline' from client-side builds
        "stream/promises": false,
      };
    }
    return config;
  },
  images: {
    domains: ["gateway.pinata.cloud"],
  },
};
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const withCivicAuth = createCivicAuthPlugin({
  clientId: `${process.env.NEXT_PUBLIC_ClIENT_ID}`,
  // oauthServer is not necessary for production.
  oauthServer: process.env.AUTH_SERVER || "https://auth.civic.com/oauth",
  ...(process.env.WEBPACK_ENABLE_SOLANA_WALLET_ADAPTER === "true"
    ? { enableSolanaWalletAdapter: true }
    : {}),
});
export default withCivicAuth(nextConfig);

# Loyali 🪙

Loyali is a no-code loyalty drop platform built on Solana using compressed NFTs (cNFTs). It enables creators to mint and distribute loyalty rewards to their fans — seamlessly, securely, and at scale.

## 🌟 Features

- 🎨 **No-code NFT creation**  
  Easily upload artwork and metadata to create loyalty badges with zero code.

- 🪙 **Compressed NFTs (cNFTs)**  
  Mint at scale with reduced costs using Solana’s state compression technology.

- 🔐 **Secure wallet integration**  
  Built with `@solana/wallet-adapter` to ensure safe and easy wallet connections.

- ⚡ **Fast & Cheap**  
  Mint 1 million cNFTs for just a few SOL — perfect for viral campaigns and massive fanbases.

- 🌲 **Merkle Tree-based Drops**  
  Scalable architecture for claimable rewards.

## 🚀 How It Works

1. **Creators create a drop** by uploading metadata and setting the max supply.
2. A **collection NFT** and **Merkle tree** are initialized on-chain.
3. **Fans claim** their cNFTs via a simple wallet connect interface.
4. First-come, first-served — no whitelist needed!

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Civic Auth](https://www.civic.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Solana](https://solana.com/)
- [Umi SDK](https://docs.metaplex.com/umi/)
- [mpl-bubblegum](https://github.com/metaplex-foundation/mpl-bubblegum)
- [Pinata](https://www.pinata.cloud/) for media & metadata hosting
- [Supabase](https://supabase.com/) for drop metadata & claim tracking

## 📦 Getting Started

Clone the repo:

```bash
git clone https://github.com/Satyapriyo/Loyali.git
cd Loyali
npm install
npm run dev

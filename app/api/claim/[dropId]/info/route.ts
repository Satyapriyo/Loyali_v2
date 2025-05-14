// /app/api/claim/[dropId]/info/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getDrop } from "@/lib/db"; // fetch from Supabase or your DB

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ dropId: string }> }
) {
  try {
    const dropId = (await params).dropId;
    const drop = await getDrop(dropId);

    if (!drop) {
      return NextResponse.json({ error: "Drop not found" }, { status: 404 });
    }

    return NextResponse.json({
      dropId,
      metadataUrl: drop.metadata_url,
      collectionMetadata: drop.collection_metadata,
      collectionMint: drop.collection_mint,
      merkleTree: drop.merkle_tree,
      collectionMasterEdition: drop.collection_master_edition,
      creatorAddress: drop.creator_address,
    });
  } catch (err) {
    console.error("Error fetching drop info:", err);
    return NextResponse.json(
      { error: "Failed to fetch drop info" },
      { status: 500 }
    );
  }
}

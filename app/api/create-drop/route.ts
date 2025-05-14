// /app/api/create-drop/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createDrop } from "@/lib/db";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    metadata_url,
    collection_mint,
    merkle_tree,
    creator_address,
    collection_metadata,
    name,
    collection_master_edition,
  } = body;
  const data = await createDrop({
    metadata_url,
    collection_mint,
    merkle_tree,
    creator_address,
    collection_metadata,
    collection_master_edition,
    name,
  });
  if (!data) {
    return NextResponse.json({ success: false, error: "Drop creation failed" });
  }
  return NextResponse.json({ success: true, dropId: data.id });
}

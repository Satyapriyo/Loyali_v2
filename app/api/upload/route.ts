import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: (() => {
      const form = new FormData();
      form.append("file", new Blob([buffer]), file.name);
      return form;
    })(),
  });

  const result = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "Pinata upload failed", details: result },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ipfsHash: result.IpfsHash,
    url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
  });
}

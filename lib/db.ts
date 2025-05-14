import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to create a drop
export async function createDrop({
  metadata_url,
  collection_mint,
  merkle_tree,
  creator_address,
  collection_metadata,
  collection_master_edition,
  name,
}: {
  metadata_url: string;
  collection_mint: string;
  merkle_tree: string;
  creator_address: string;
  name: string;
  collection_master_edition: string;
  collection_metadata: string;
}) {
  const { data, error } = await supabase
    .from("drops")
    .insert({
      metadata_url,
      collection_mint,
      merkle_tree,
      creator_address,
      name,
      collection_master_edition,
      collection_metadata,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error("Drop creation failed");
  }

  return data;
}

export const getActiveDrops = async () => {
  try {
    // Query for active drops only

    const { data, error } = await supabase
      .from("drops")
      .select("id, metadata_url");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching active drops:", error);
    return [];
  }
};
export async function getDrop(dropId: string) {
  const { data, error } = await supabase
    .from("drops")
    .select("*")
    .eq("id", dropId)
    .single();

  if (error) {
    throw new Error("Drop not found");
  }

  return data;
}

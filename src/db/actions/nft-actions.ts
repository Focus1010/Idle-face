"use server";

import { db } from "@/neynar-db-sdk/db";
import { nftOwnership } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { generateNFTImage } from "@/config/constants";

export interface NFTItem {
  id: string;
  tokenId: number;
  imageUrl: string;
  mintedAt: Date;
}

/**
 * Get all NFTs owned by a user
 */
export async function getUserNFTs(fid: number): Promise<NFTItem[]> {
  const results = await db
    .select()
    .from(nftOwnership)
    .where(eq(nftOwnership.fid, fid))
    .orderBy(desc(nftOwnership.mintedAt));

  // Always regenerate image URL from tokenId to ensure we use the current gateway
  return results.map((r) => ({
    id: r.id,
    tokenId: r.tokenId,
    imageUrl: generateNFTImage(r.tokenId),
    mintedAt: r.mintedAt,
  }));
}

/**
 * Get count of NFTs owned by a user
 */
export async function getUserNFTCount(fid: number): Promise<number> {
  const results = await db
    .select()
    .from(nftOwnership)
    .where(eq(nftOwnership.fid, fid));

  return results.length;
}

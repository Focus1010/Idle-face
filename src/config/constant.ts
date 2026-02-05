/**
 * Idle Face NFT Collection Constants
 * Static configuration values that don't change at runtime
 */

/** Mint configuration */
export const MINT_CONFIG = {
  totalSupply: 555,
  priceUSDC: 1.5,
  prizePercentage: 50,
  topHoldersCount: 5,
  randomHoldersCount: 10,
} as const;

/** Prize pool configuration (derived from MINT_CONFIG) */
export const PRIZE_POOL = {
  percentageOfRevenue: MINT_CONFIG.prizePercentage,
  topHoldersCount: MINT_CONFIG.topHoldersCount,
  randomHoldersCount: MINT_CONFIG.randomHoldersCount,
} as const;

/** IPFS CID for NFT images */
export const IMAGES_CID = 'bafybeib6ioy5sr67x3tr3lx6ry5gbqhnt3viz7ma2um6ay2jdffxutvuwm';

/** IPFS CID for NFT metadata */
export const METADATA_CID = 'bafybeiecfjiqjukthudrsggaxnraofelvqqfjylh6r76436xtbovrh42hm';

/** Generate a unique NFT image URL based on token ID */
export function generateNFTImage(tokenId: number): string {
  // Use dweb.link IPFS gateway (reliable subdomain-based gateway)
  return https://${IMAGES_CID}.ipfs.dweb.link/idleface-${tokenId}.png;
}

/** Generate NFT metadata URL based on token ID */
export function generateNFTMetadataUrl(tokenId: number): string {
  return https://gateway.pinata.cloud/ipfs/${METADATA_CID}/${tokenId}.json;
}

/** Target username for follow gate */
export const FOLLOW_TARGET_USERNAME = 'web3focus';

/** Launch cast for like/recast gate */
export const LAUNCH_CAST_HASH = '0x73dc392b';
export const LAUNCH_CAST_URL = 'https://warpcast.com/web3focus/0x73dc392b';

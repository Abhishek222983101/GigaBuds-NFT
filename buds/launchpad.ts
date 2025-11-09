import { useMintBudsUmi } from "../config/mintchain.js";
import { storeAsset } from "../upload/uploadBuds.js";
import { packageMetadata, type BudsAttributes } from "../upload/buildMetadata.js";
import { issueCollectible } from "./mintbuds.js";

export async function mintBuds(options?: {
  picPath?: string;
  picLabel?: string;
  displayName?: string;
  info?: string;
  referenceUrl?: string;
  traits?: BudsAttributes[];
}) {
  const umi = useMintBudsUmi();

  const imgLoc = await storeAsset(umi, options?.picPath, options?.picLabel);

  const details: {
    displayName?: string;
    info?: string;
    referenceUrl?: string;
    traits?: BudsAttributes[];
  } = {};

  if (options?.displayName) details.displayName = options.displayName;
  if (options?.info) details.info = options.info;
  if (options?.referenceUrl) details.referenceUrl = options.referenceUrl;
  if (options?.traits) details.traits = options.traits;

  const metaLoc = await packageMetadata(imgLoc, umi, details);

  const { txnId, collectibleKey } = await issueCollectible(metaLoc, umi, options?.displayName);

  console.log("Minted Buds NFT");
  console.log("Solana Explorer:");
  console.log(`https://explorer.solana.com/tx/${txnId}?cluster=devnet\n`);
  console.log("Metaplex Core:");
  console.log(`https://core.metaplex.com/explorer/${collectibleKey}?env=devnet`);

  return {
    txnId,
    collectibleKey,
    imgLoc,
    metaLoc,
  };
}

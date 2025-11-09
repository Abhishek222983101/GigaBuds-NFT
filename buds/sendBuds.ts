import { transfer as solTransfer, fetchAsset as getAsset } from "@metaplex-foundation/mpl-core";
import { publicKey, type Umi, type PublicKey } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";

export async function sendBudsNft(
  assetKey: PublicKey,
  recipient: string,
  umi: Umi
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for on-chain availability

  let asset;
  let attempts = 5;
  let waitTime = 1000;

  while (attempts > 0) {
    try {
      asset = await getAsset(umi, assetKey);
      break;
    } catch {
      attempts--;
      if (attempts === 0) throw new Error("Asset retrieval failed after retries");
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      waitTime *= 2;
    }
  }

  if (!asset) throw new Error("Unable to fetch asset");

  const newOwner = publicKey(recipient);

  const tx = await solTransfer(umi, {
    asset,
    newOwner,
  }).sendAndConfirm(umi);

  const signature = base58.deserialize(tx.signature)[0];

  console.log("NFT sent");
  console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);

  return signature;
}

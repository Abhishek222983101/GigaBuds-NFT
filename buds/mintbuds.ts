import { create } from "@metaplex-foundation/mpl-core";
import { generateSigner, type Umi } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";

export interface DropMintResult {
  txnId: string;
  collectibleKey: string;
}

export async function issueCollectible(
  metadataLink: string,
  umi: Umi,
  title: string = "Buds Genesis"
): Promise<DropMintResult> {
  const drop = generateSigner(umi);

  const tx = await create(umi, {
    asset: drop,
    name: title,
    uri: metadataLink,
  }).sendAndConfirm(umi);

  const txnId = base58.deserialize(tx.signature)[0];

  return {
    txnId,
    collectibleKey: drop.publicKey,
  };
}

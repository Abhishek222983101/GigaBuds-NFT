import type { Umi } from "@metaplex-foundation/umi";

export interface BudsAttribute {
  trait_type: string;
  value: string;
}

interface BudsMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: BudsAttribute[];
  properties: {
    files: Array<{
      uri: string;
      type: string;
    }>;
    category: string;
  };
}

export async function packageMetadata(
  imgUri: string,
  umi: Umi,
  opts?: {
    name?: string;
    description?: string;
    externalUrl?: string;
    traits?: BudsAttribute[];
  }
): Promise<string> {
  const metadata: BudsMetadata = {
    name: opts?.name ?? "Angry Tiger Buds",
    description: opts?.description ?? "Angry Tiger Buds NFT",
    image: imgUri,
    external_url: opts?.externalUrl ?? "https://example.com",
    attributes: opts?.traits ?? [
      { trait_type: "Fierceness", value: "Maximum" },
      { trait_type: "Unstoppable", value: "True" },
    ],
    properties: {
      files: [
        {
          uri: imgUri,
          type: "image/jpeg",
        },
      ],
      category: "image",
    },
  };

  const metaUri = await umi.uploader.uploadJson(metadata).catch((e) => {
    throw new Error(`Metadata upload failed: ${e}`);
  });

  return metaUri;
}

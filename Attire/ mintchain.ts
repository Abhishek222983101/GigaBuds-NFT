

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { mplCore } from "@metaplex-foundation/mpl-core";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import type { Umi } from "@metaplex-foundation/umi";


import mintbudsKey from "/home/joemama/.config/solana/mintbuds-key.json" with { type: "json" };

export function useMintBudsUmi(): Umi {
  const umi = createUmi("https://api.devnet.solana.com")
    .use(mplCore())
    .use(irysUploader());

  const signer = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(mintbudsKey));
  umi.use(keypairIdentity(signer));
  return umi;
}

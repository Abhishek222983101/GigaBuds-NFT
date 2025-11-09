import { createGenericFile, type Umi } from "@metaplex-foundation/umi";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

export async function storeBudsImage(
  umi: Umi,
  imgPath: string = "./opal-logo.png",
  imgName: string = "opa-logo.png"
): Promise<string> {
  const fullPath = path.isAbsolute(imgPath)
    ? imgPath
    : path.resolve(rootDir, imgPath);

  const fileData = fs.readFileSync(fullPath);

  const genericFile = createGenericFile(fileData, imgName, {
    tags: [
      {
        name: "contentType",
        value: "image/png",
      },
    ],
  });

  const [imgUri] = await umi.uploader.upload([genericFile]).catch((err) => {
    console.error("Upload error:", err);
    throw err;
  });

  if (!imgUri) throw new Error("Image upload failed");

  return imgUri;
}

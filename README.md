# BudsNFT Mint

A straightforward tool to mint NFTs on the Solana blockchain using Metaplex Core, simplifying the whole process from image upload to NFT creation and transfer.

## Project Overview

This app handles uploading your NFT image files, creating metadata, minting your NFT, and transferring it securely — all coded in TypeScript for clarity and safety.

## Example Usage

import { mintBuds } from "./buds/mintBuds.js";

mintBuds({
picPath: "./src/assets/cool-bear-cash.png",
picLabel: "cool-bear-cash.png",
displayName: "Cool Bear #001",
info: "A flashy pink bear dripping in love and cash.",
externalUrl: "https://cool-bear.com",
traits: [
{ trait_type: "Background", value: "Pink" },
{ trait_type: "Fur Color", value: "Bubblegum Pink" },
{ trait_type: "Mood", value: "Playful" },
],
});


---

## After Minting

You'll receive transaction signatures and links to Solana Explorer and Metaplex Core to view your NFT and transaction.


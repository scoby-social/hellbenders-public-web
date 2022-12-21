import { PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

export const getEdition = async (mint: PublicKey, tokenMetadata: PublicKey) => {
  const [edition] = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      tokenMetadata.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    tokenMetadata
  );

  return edition;
};

import { PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

export const getMetadata = async (
  mint: PublicKey,
  tokenProgramId: PublicKey
) => {
  const [metadata] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("metadata"), tokenProgramId.toBuffer(), mint.toBuffer()],
    tokenProgramId
  );

  return metadata;
};

import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import {
  Commitment,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

import { getAccountInfo } from "./getAccountInfo";

export async function getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
  signTransaction: SignerWalletAdapterProps["signTransaction"],
  allowOwnerOffCurve = false,
  commitment?: Commitment,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
) {
  const associatedToken = await getAssociatedTokenAddress(mint, owner);
  let instruction;
  try {
    const info = await getAccountInfo(
      connection,
      associatedToken,
      commitment,
      programId
    );
  } catch (error: any) {
    if (
      error.message === "TokenAccountNotFoundError" ||
      error.message === "TokenInvalidAccountOwnerError"
    ) {
      // As this isn't atomic, it's possible others can create associated accounts meanwhile.
      try {
        instruction = createAssociatedTokenAccountInstruction(
          payer,
          associatedToken,
          owner,
          mint,
          programId,
          associatedTokenProgramId
        );

        new Transaction().add(instruction);
      } catch (error: unknown) {
        // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
        // instruction error if the associated account exists already.
      }
    } else {
      throw error;
    }
  }

  return [associatedToken, instruction] as any[];
}

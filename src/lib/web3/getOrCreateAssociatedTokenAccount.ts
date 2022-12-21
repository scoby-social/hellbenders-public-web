import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import {
  Commitment,
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { getAccountInfo } from "./getAccountInfo";
import { getAssociatedTokenAddress } from "./getAssociatedTokenAddress";

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
  const associatedToken = await getAssociatedTokenAddress(
    mint,
    owner,
    allowOwnerOffCurve,
    programId,
    associatedTokenProgramId
  );
  console.log(associatedToken);
  // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
  // Sadly we can't do this atomically.
  let instruction;
  try {
    await getAccountInfo(connection, associatedToken, commitment, programId);
  } catch (error: any) {
    if (
      error.message === "TokenAccountNotFoundError" ||
      error.message === "TokenInvalidAccountOwnerError"
    ) {
      // As this isn't atomic, it's possible others can create associated accounts meanwhile.
      try {
        new Transaction().add(
          createAssociatedTokenAccountInstruction(
            payer,
            associatedToken,
            owner,
            mint,
            programId,
            associatedTokenProgramId
          )
        );
        instruction = createAssociatedTokenAccountInstruction(
          payer,
          associatedToken,
          owner,
          mint,
          programId,
          associatedTokenProgramId
        );
        // const blockHash = await connection.getRecentBlockhash()
        // transaction.feePayer = await payer
        // transaction.recentBlockhash = await blockHash.blockhash
        // const signed = await signTransaction(transaction)

        // const signature = await connection.sendRawTransaction(signed.serialize())

        // await connection.confirmTransaction(signature)
      } catch (error: unknown) {
        // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
        // instruction error if the associated account exists already.
      }

      // Now this should always succeed
      // account = await getAccountInfo(connection, associatedToken, commitment, programId)
    } else {
      throw error;
    }
  }

  // if (!account.mint.equals(mint.toBuffer())) throw Error('TokenInvalidMintError')
  // if (!account.owner.equals(owner.toBuffer())) throw new Error('TokenInvalidOwnerError')

  // return account
  return [associatedToken, instruction] as any[];
}

function createAssociatedTokenAccountInstruction(
  payer: PublicKey,
  associatedToken: PublicKey,
  owner: PublicKey,
  mint: PublicKey,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
): TransactionInstruction {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedToken, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: false, isWritable: false },
    { pubkey: mint, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    { pubkey: programId, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
  ];

  return new TransactionInstruction({
    keys,
    programId: associatedTokenProgramId,
    data: Buffer.alloc(0),
  });
}

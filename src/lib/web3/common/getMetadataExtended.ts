import { Metadata } from "@metaplex-foundation/js";
import { AnchorProvider } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import * as anchor from "@project-serum/anchor";
import {
  ConfirmOptions,
  Connection,
  Keypair,
  PublicKey,
} from "@solana/web3.js";

export async function getMetadataExtended(
  parentMembership: Metadata,
  contractIdl: any,
  contractAddress: PublicKey,
  pool: PublicKey,
  conn: Connection
) {
  const confirmOption: ConfirmOptions = {
    commitment: "finalized",
    preflightCommitment: "finalized",
    skipPreflight: false,
  };

  const randWallet = new NodeWallet(Keypair.generate());
  const provider = new AnchorProvider(conn, randWallet, confirmOption);
  const program = new anchor.Program(contractIdl, contractAddress, provider);

  const [metadataExtended] = await PublicKey.findProgramAddress(
    [parentMembership.mintAddress.toBuffer(), pool.toBuffer()],
    contractAddress
  );

  const extendedData = await program.account.metadataExtended.fetch(
    metadataExtended
  );

  return extendedData;
}

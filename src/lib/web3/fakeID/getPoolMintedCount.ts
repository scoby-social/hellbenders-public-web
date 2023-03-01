import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import FakeIDNFTIdl from "./usdc-fake-id.json";

const FakeIDNFTProgramId = new PublicKey(
  process.env.NEXT_PUBLIC_FAKE_ID_PROGRAM_ID!
);
// meta data for scoby nft
const FakeIDNFTPOOL = new PublicKey(process.env.NEXT_PUBLIC_FAKE_ID_NFT_POOL!);

export async function getPoolMintedCount(wallet: any): Promise<number> {
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);

  const provider = new anchor.AnchorProvider(conn, wallet, {
    commitment: "processed",
  });

  const program = new anchor.Program(
    FakeIDNFTIdl as any,
    FakeIDNFTProgramId,
    provider
  );

  const poolData = (await program.account.pool.fetch(FakeIDNFTPOOL)) as any;

  return poolData.countMinting;
}

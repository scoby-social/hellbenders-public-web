import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import FakeIDNFTIdl from "./usdc-fake-id.json";

const FakeIDNFTProgramId = new PublicKey(
  "8S18mGzHyNGur85jAPoEjad8P8rywTpjyABbBEdmj2gb"
);
// meta data for scoby nft
const FakeIDNFTPOOL = new PublicKey(
  "6TVrWdVQAegLFUewKJLeZ7qsB43qXXwWxJmAu6ztsDmV"
);

const conn = new Connection(clusterApiUrl("devnet"));

export async function getPoolMintedCount(wallet: any): Promise<number> {
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

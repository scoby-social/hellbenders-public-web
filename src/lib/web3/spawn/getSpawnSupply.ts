import { AnchorProvider } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import SpawnNFTIdl from "./hellbenders-spawn.json";
import { ConfirmOptions, Connection, PublicKey } from "@solana/web3.js";

export async function getSpawnMintedCount(wallet: any) {
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
  const confirmOption: ConfirmOptions = {
    commitment: "finalized",
    preflightCommitment: "finalized",
    skipPreflight: false,
  };

  const SpawnNFTPOOL = new PublicKey(process.env.NEXT_PUBLIC_SPAWN_NFT_POOL!);
  const SpawnNFTProgramId = new PublicKey(
    process.env.NEXT_PUBLIC_SPAWN_NFT_PROGRAM_ID!
  );

  const provider = new AnchorProvider(conn, wallet as any, confirmOption);

  const spawnProgram = new anchor.Program(
    SpawnNFTIdl as any,
    SpawnNFTProgramId,
    provider
  );

  const spawnPoolData = await spawnProgram.account.pool.fetch(SpawnNFTPOOL);

  return {
    legendary: spawnPoolData.countGroup1,
    gold: spawnPoolData.countGroup2,
    steel: spawnPoolData.countGroup3,
    black: spawnPoolData.countGroup4,
    fake: spawnPoolData.countGroup5,
    open: spawnPoolData.countGroup6,
  };
}

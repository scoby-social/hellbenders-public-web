import { AnchorProvider } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import { ConfirmOptions, Connection, PublicKey } from "@solana/web3.js";

import { getOrCreateAssociatedTokenAccount } from "../common/getOrCreateAssociatedTokenAccount";
import SpawnNFTIdl from "./hellbenders-spawn.json";

export async function checkIfUserHasRedlistTokens(wallet: any): Promise<any> {
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
  const SpawnNFTProgramId = new PublicKey(
    process.env.NEXT_PUBLIC_SPAWN_NFT_PROGRAM_ID!
  );

  const SpawnNFTPOOL = new PublicKey(process.env.NEXT_PUBLIC_SPAWN_NFT_POOL!);

  const confirmOption: ConfirmOptions = {
    commitment: "finalized",
    preflightCommitment: "finalized",
    skipPreflight: false,
  };

  const provider = new AnchorProvider(conn, wallet as any, confirmOption);

  const spawnProgram = new anchor.Program(
    SpawnNFTIdl as any,
    SpawnNFTProgramId,
    provider
  );

  const spawnPoolData = await spawnProgram.account.pool.fetch(SpawnNFTPOOL);
  const legendaryToken = new PublicKey(spawnPoolData.legendary);
  const redlistGoldToken = new PublicKey(spawnPoolData.redlistGold);
  const redlistSteelToken = new PublicKey(spawnPoolData.redlistSteel);
  const redlistBlackToken = new PublicKey(spawnPoolData.redlistBlack);

  const [
    legendaryTokenAcc,
    redlistGoldTokenAcc,
    redlistSteelTokenAcc,
    redlistBlackTokenAcc,
  ] = await Promise.all([
    await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.pubkey,
      legendaryToken,
      wallet.publicKey,
      wallet.signedTransaction
    ),
    await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.pubkey,
      redlistGoldToken,
      wallet.publicKey,
      wallet.signedTransaction
    ),
    await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.pubkey,
      redlistSteelToken,
      wallet.publicKey,
      wallet.signedTransaction
    ),
    await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.pubkey,
      redlistBlackToken,
      wallet.publicKey,
      wallet.signedTransaction
    ),
  ]);

  return {
    legendary: !legendaryTokenAcc[1] ? legendaryTokenAcc[0] : null,
    gold: !redlistGoldTokenAcc[1] ? redlistGoldTokenAcc[0] : null,
    steel: !redlistSteelTokenAcc[1] ? redlistSteelTokenAcc[0] : null,
    black: !redlistBlackTokenAcc[1] ? redlistBlackTokenAcc[0] : null,
  };
}

import { clusterApiUrl, Connection } from "@solana/web3.js";
import { getNftsForOwner } from "./getNftsForOwner";

export async function checkIfUserHasFakeID(wallet: any): Promise<boolean> {
  const conn = new Connection(clusterApiUrl("devnet"));
  const FakeIDNFTSYMBOL = "HELLPASS";

  const fakeIDs = await getNftsForOwner(
    FakeIDNFTSYMBOL,
    wallet.publicKey,
    conn
  );

  return fakeIDs.length > 0;
}

import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";
import { getNftsForOwner } from "./getNftsForOwner";

export async function checkIfUserHasFakeID(wallet: any): Promise<boolean> {
  const conn = new Connection(
    clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA_CLUSTER! as Cluster)
  );
  const FakeIDNFTSYMBOL = "HELLPASS";

  const fakeIDs = await getNftsForOwner(
    FakeIDNFTSYMBOL,
    wallet.publicKey,
    conn
  );

  return fakeIDs.length > 0;
}

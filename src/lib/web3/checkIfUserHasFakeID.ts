import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getNftsForOwner } from "./getNftsForOwner";
import FakeIDNFTIdl from "./usdc-fake-id.json";

export async function checkIfUserHasFakeID(wallet: any): Promise<boolean> {
  const conn = new Connection(clusterApiUrl("devnet"));
  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );
  const FakeIDNFTProgramId = new PublicKey(
    "8S18mGzHyNGur85jAPoEjad8P8rywTpjyABbBEdmj2gb"
  );
  const FakeIDNFTPOOL = new PublicKey(
    "6TVrWdVQAegLFUewKJLeZ7qsB43qXXwWxJmAu6ztsDmV"
  );
  const FakeIDNFTSYMBOL = "HELLPASS";

  const fakeIDs = await getNftsForOwner(
    FakeIDNFTProgramId,
    FakeIDNFTIdl,
    FakeIDNFTPOOL,
    FakeIDNFTSYMBOL,
    wallet.publicKey,
    TOKEN_METADATA_PROGRAM_ID,
    conn,
    wallet
  );

  return fakeIDs.length > 0;
}

import { Connection } from "@solana/web3.js";
import { getNftsForOwnerBySymbol } from "../common/getNftsForOwner";

export async function checkIfUserHasFakeID(wallet: any): Promise<boolean> {
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
  const FakeIDNFTSYMBOL = "HELLPASS";

  const fakeIDs = await getNftsForOwnerBySymbol(
    FakeIDNFTSYMBOL,
    wallet.publicKey,
    conn
  );

  return fakeIDs.length > 0;
}

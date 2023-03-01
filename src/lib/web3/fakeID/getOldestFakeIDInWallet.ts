import { JsonMetadata, Metadata } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { getNftsForOwnerBySymbol } from "../common/getNftsForOwner";

export async function getOldestFakeIDInWallet(
  wallet: PublicKey
): Promise<Metadata<JsonMetadata<string>> | null> {
  let oldestFakeID: Metadata<JsonMetadata<string>> | null = null;

  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
  const fakeIDs = await getNftsForOwnerBySymbol("HELLPASS", wallet, conn);

  fakeIDs.forEach((fakeID) => {
    if (!oldestFakeID) oldestFakeID = fakeID;

    const oldestNumber = Number(oldestFakeID.name.split("#")[1]);
    const currentNumber = Number(fakeID.name.split("#")[1]);

    if (currentNumber < oldestNumber) oldestFakeID = fakeID;
  });

  return oldestFakeID;
}

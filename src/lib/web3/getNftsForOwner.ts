import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { Wallet } from "@project-serum/anchor";

export async function getNftsForOwner(
  contractAddress: PublicKey,
  contractIdl: any,
  collectionPool: PublicKey,
  symbol: string,
  owner: PublicKey,
  TOKEN_METADATA_PROGRAM_ID: PublicKey,
  conn: Connection,
  wallet: Wallet
) {
  const allTokens: any[] = [];

  const metaplex = new Metaplex(conn);
  const nfts = await metaplex.nfts().findAllByOwner({ owner });

  nfts.forEach((val) => {
    if (val.symbol === symbol) {
      allTokens.push(val);
    }
  });

  return allTokens;
}

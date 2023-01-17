import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

export async function getNftsForOwner(
  symbol: string,
  owner: PublicKey,
  conn: Connection
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

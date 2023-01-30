import { Connection, PublicKey } from "@solana/web3.js";
import { JsonMetadata, Metadata, Metaplex } from "@metaplex-foundation/js";

export async function getNftsForOwnerBySymbol(
  symbol: string,
  owner: PublicKey,
  conn: Connection
) {
  if (!owner) return [];
  const allTokens: Array<Metadata<JsonMetadata<string>>> = [];

  const metaplex = new Metaplex(conn);

  const nfts = await metaplex.nfts().findAllByOwner({ owner });

  nfts.forEach((val) => {
    if (val.symbol === symbol) {
      allTokens.push(val as Metadata<JsonMetadata<string>>);
    }
  });

  return allTokens;
}

import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

export async function getNFTWithMetadata(
  nftAddress: string,
  retries = 0
): Promise<any> {
  try {
    const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
    const mintAddress = new PublicKey(nftAddress);

    const metaplex = new Metaplex(conn);

    return await metaplex.nfts().findByMint({ mintAddress });
  } catch (err) {
    if (retries < 5) {
      return await getNFTWithMetadata(nftAddress, retries + 1);
    }
    throw err;
  }
}

import { Metaplex } from "@metaplex-foundation/js";
import { Cluster, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export async function getNFTWithMetadata(nftAddress: string) {
  const conn = new Connection(
    clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA_CLUSTER! as Cluster)
  );
  const mintAddress = new PublicKey(nftAddress);

  const metaplex = new Metaplex(conn);

  return await metaplex.nfts().findByMint({ mintAddress });
}

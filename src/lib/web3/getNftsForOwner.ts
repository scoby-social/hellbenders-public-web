import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  ConfirmOptions,
  Connection,
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { programs } from "@metaplex/js";
import { getMetadata } from "./getMetadata";

const {
  metadata: { Metadata },
} = programs;

const confirmOption: ConfirmOptions = {
  commitment: "finalized",
  preflightCommitment: "finalized",
  skipPreflight: false,
};

export async function getNftsForOwner(
  contractAddress: PublicKey,
  contractIdl: any,
  collectionPool: PublicKey,
  symbol: string,
  owner: PublicKey,
  TOKEN_METADATA_PROGRAM_ID: PublicKey,
  conn: Connection
) {
  let allTokens: any[] = [];
  const tokenAccounts = await conn.getParsedTokenAccountsByOwner(
    owner,
    { programId: TOKEN_PROGRAM_ID },
    "finalized"
  );
  const randWallet = new anchor.Wallet(Keypair.generate());
  const provider = new anchor.Provider(conn, randWallet, confirmOption);
  const program = new anchor.Program(contractIdl, contractAddress, provider);

  for (let index = 0; index < tokenAccounts.value.length; index++) {
    try {
      const tokenAccount = tokenAccounts.value[index];
      const tokenAmount = tokenAccount.account.data.parsed.info.tokenAmount;

      if (tokenAmount.amount == "1" && tokenAmount.decimals == "0") {
        let nftMint = new PublicKey(tokenAccount.account.data.parsed.info.mint);
        let pda = await getMetadata(nftMint, TOKEN_METADATA_PROGRAM_ID);
        const accountInfo: any = await conn.getParsedAccountInfo(pda);
        let metadata: any = new Metadata(owner.toString(), accountInfo.value);

        if (metadata.data.data.symbol == symbol) {
          let [metadataExtended] = await PublicKey.findProgramAddress(
            [nftMint.toBuffer(), collectionPool.toBuffer()],
            contractAddress
          );

          if ((await conn.getAccountInfo(metadataExtended)) == null) continue;
          let extendedData = await program.account.metadataExtended.fetch(
            metadataExtended
          );

          allTokens.push({
            mint: nftMint,
            metadata: pda,
            tokenAccount: tokenAccount.pubkey,
            metadataExtended: metadataExtended,
            extendedData: extendedData,
            data: metadata.data.data,
          });
        }
      }
    } catch (err) {
      continue;
    }
  }

  allTokens.sort(function (a: any, b: any) {
    if (a.extendedData.number < b.extendedData.number) {
      return -1;
    }
    if (a.extendedData.number > b.extendedData.number) {
      return 1;
    }
    return 0;
  });
  return allTokens;
}

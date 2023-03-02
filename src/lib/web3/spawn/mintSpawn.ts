import * as anchor from "@project-serum/anchor";
import { AnchorProvider } from "@project-serum/anchor";
import {
  AccountLayout,
  createMintToCheckedInstruction,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  ConfirmOptions,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { createAssociatedTokenAccountInstruction } from "../common/createAssociatedTokenAccountInstruction";
import { createMint } from "../common/createMint";
import { getEdition } from "../common/getEdition";
import { getMetadata } from "../common/getMetadata";
import { getMetadataExtended } from "../common/getMetadataExtended";
import { getNftsForOwnerBySymbol } from "../common/getNftsForOwner";
import { getTokenWallet } from "../common/getTokenWallet";
import { sendTransaction } from "../common/sendTransaction";

import FakeIDNFTIdl from "../fakeID/usdc-fake-id.json";
import SpawnNFTIdl from "./hellbenders-spawn.json";

export async function mintSpawn(
  wallet: any,
  redlist: PublicKey | null,
  withFakeID: boolean
) {
  const FakeIDNFTProgramId = new PublicKey(
    process.env.NEXT_PUBLIC_FAKE_ID_PROGRAM_ID!
  );

  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    process.env.NEXT_PUBLIC_TOKEN_METADATA_PROGRAM_ID!
  );

  const FakeIDNFTPOOL = new PublicKey(
    process.env.NEXT_PUBLIC_FAKE_ID_NFT_POOL!
  );

  const SpawnNFTProgramId = new PublicKey(
    process.env.NEXT_PUBLIC_SPAWN_NFT_PROGRAM_ID!
  );

  const SpawnNFTPOOL = new PublicKey(process.env.NEXT_PUBLIC_SPAWN_NFT_POOL!);

  const FakeIDNFTSYMBOL = "HELLPASS";

  const confirmOption: ConfirmOptions = {
    commitment: "finalized",
    preflightCommitment: "finalized",
    skipPreflight: false,
  };

  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);

  const provider = new AnchorProvider(conn, wallet as any, confirmOption);

  const fakeIDProgram = new anchor.Program(
    FakeIDNFTIdl as any,
    FakeIDNFTProgramId,
    provider
  );

  const fakeIDPoolData = await fakeIDProgram.account.pool.fetch(FakeIDNFTPOOL);

  const spawnProgram = new anchor.Program(
    SpawnNFTIdl as any,
    SpawnNFTProgramId,
    provider
  );

  const spawnPoolData = await spawnProgram.account.pool.fetch(SpawnNFTPOOL);

  const transaction = new Transaction();
  const instructions: TransactionInstruction[] = [];
  const signers: Keypair[] = [];
  const mintRent = await conn.getMinimumBalanceForRentExemption(
    MintLayout.span
  );

  const mintKey = createMint(
    instructions,
    wallet.publicKey,
    mintRent,
    0,
    wallet.publicKey,
    wallet.publicKey,
    signers
  );

  const recipientKey = await getTokenWallet(wallet.publicKey, mintKey);

  createAssociatedTokenAccountInstruction(
    instructions,
    recipientKey,
    wallet.publicKey,
    wallet.publicKey,
    mintKey
  );

  // NOT PRETTY SURE ABOUT THIISS
  instructions.push(
    createMintToCheckedInstruction(
      mintKey,
      recipientKey,
      wallet.publicKey,
      1,
      0
    )
  );
  // THISSS

  instructions.forEach((item) => transaction.add(item));
  const metadata = await getMetadata(mintKey, TOKEN_METADATA_PROGRAM_ID);
  const masterEdition = await getEdition(mintKey, TOKEN_METADATA_PROGRAM_ID);

  const [metadataExtended, bump] = await PublicKey.findProgramAddress(
    [mintKey.toBuffer(), SpawnNFTPOOL.toBuffer()],
    SpawnNFTProgramId
  );

  const creatorMint = fakeIDPoolData.rootNft;
  const creatorResp = await conn.getTokenLargestAccounts(
    creatorMint,
    "finalized"
  );

  if (
    creatorResp == null ||
    creatorResp.value == null ||
    creatorResp.value.length == 0
  )
    throw new Error("Invalid creator");

  const creatorNftAccount = creatorResp.value[0].address;
  const creatorInfo = await conn.getAccountInfo(creatorNftAccount, "finalized");
  if (creatorInfo == null) throw new Error("Creator NFT info failed");

  const accountCreatorInfo = AccountLayout.decode(creatorInfo.data);
  if (Number(accountCreatorInfo.amount) == 0)
    throw new Error("Invalid Creator Info");

  const creatorWallet = new PublicKey(accountCreatorInfo.owner);

  // check if parent wallet is holding fake id nft
  const memberships = await getNftsForOwnerBySymbol(
    FakeIDNFTSYMBOL,
    wallet.publicKey,
    conn
  );

  const parentMembership = memberships[0];

  // without fake ID case
  let parentMembershipAccount = creatorNftAccount;

  let parentMembershipOwner = creatorWallet;
  let grandParentMembershipOwner = creatorWallet;
  let grandGrandParentMembershipOwner = creatorWallet;
  let grandGrandGrandParentMembershipOwner = creatorWallet;
  let holdingFakeID = false;

  if (parentMembership) {
    const parentMembershipMetadata = await getMetadataExtended(
      parentMembership,
      FakeIDNFTIdl,
      FakeIDNFTProgramId,
      FakeIDNFTPOOL,
      conn
    );

    // with fake ID case
    holdingFakeID = true;
    // parent
    const parentMembershipResp = await conn.getTokenLargestAccounts(
      parentMembershipMetadata.parentNfp,
      "finalized"
    );

    if (
      parentMembershipResp != null &&
      parentMembershipResp.value != null &&
      parentMembershipResp.value.length != 0
    ) {
      parentMembershipAccount = parentMembershipResp.value[0].address;
      let info = await conn.getAccountInfo(
        parentMembershipAccount,
        "finalized"
      );

      if (info != null) {
        let accountInfo = AccountLayout.decode(info.data);
        if (Number(accountInfo.amount) != 0) {
          parentMembershipOwner = new PublicKey(accountInfo.owner);
        }
      }
    }

    // grand parent
    const grandParentMembershipResp = await conn.getTokenLargestAccounts(
      parentMembershipMetadata.grandParentNfp,
      "finalized"
    );
    if (
      grandParentMembershipResp != null &&
      grandParentMembershipResp.value != null &&
      grandParentMembershipResp.value.length != 0
    ) {
      const grandParentMembershipAccount =
        grandParentMembershipResp.value[0].address;
      let info = await conn.getAccountInfo(
        grandParentMembershipAccount,
        "finalized"
      );
      if (info != null) {
        let accountInfo = AccountLayout.decode(info.data);
        if (Number(accountInfo.amount) != 0) {
          grandParentMembershipOwner = new PublicKey(accountInfo.owner);
        }
      }
    }

    // grand grand parent
    const grandGrandParentMembershipResp = await conn.getTokenLargestAccounts(
      parentMembershipMetadata.grandGrandParentNfp,
      "finalized"
    );
    if (
      grandGrandParentMembershipResp != null &&
      grandGrandParentMembershipResp.value != null &&
      grandGrandParentMembershipResp.value.length != 0
    ) {
      const grandGrandParentMembershipAccount =
        grandGrandParentMembershipResp.value[0].address;
      let info = await conn.getAccountInfo(
        grandGrandParentMembershipAccount,
        "finalized"
      );
      if (info != null) {
        let accountInfo = AccountLayout.decode(info.data);
        if (Number(accountInfo.amount) != 0) {
          grandGrandParentMembershipOwner = new PublicKey(accountInfo.owner);
        }
      }
    }

    const grandGrandGrandParentMembershipResp =
      await conn.getTokenLargestAccounts(
        parentMembershipMetadata.grandGrandGrandParentNfp,
        "finalized"
      );
    if (
      grandGrandGrandParentMembershipResp != null &&
      grandGrandGrandParentMembershipResp.value != null &&
      grandGrandGrandParentMembershipResp.value.length != 0
    ) {
      const grandGrandGrandParentMembershipAccount =
        grandGrandGrandParentMembershipResp.value[0].address;

      let info = await conn.getAccountInfo(
        grandGrandGrandParentMembershipAccount,
        "finalized"
      );

      if (info != null) {
        let accountInfo = AccountLayout.decode(info.data);

        if (Number(accountInfo.amount) != 0) {
          grandGrandGrandParentMembershipOwner = new PublicKey(
            accountInfo.owner
          );
        }
      }
    }
  }

  // const legendaryToken = new PublicKey(spawnPoolData.legendary);

  // let redlistTokenAccount = await getOrCreateAssociatedTokenAccount(
  // conn,
  // wallet.pubkey,
  // legendaryToken,
  // wallet.publicKey,
  // wallet.signedTransaction
  // );

  // if (redlistTokenAccount[1]) {
  // const redlistGoldToken = new PublicKey(spawnPoolData.redlistGold);
  // redlistTokenAccount = await getOrCreateAssociatedTokenAccount(
  // conn,
  // wallet.pubkey,
  // redlistGoldToken,
  // wallet.publicKey,
  // wallet.signedTransaction
  // );

  // if (redlistTokenAccount[1]) {
  // const redlistSteelToken = new PublicKey(spawnPoolData.redlistSteel);
  // redlistTokenAccount = await getOrCreateAssociatedTokenAccount(
  // conn,
  // wallet.pubkey,
  // redlistSteelToken,
  // wallet.publicKey,
  // wallet.signedTransaction
  // );
  // if (redlistTokenAccount[1]) {
  // const redlistBlackToken = new PublicKey(spawnPoolData.redlistSteel);
  // redlistTokenAccount = await getOrCreateAssociatedTokenAccount(
  // conn,
  // wallet.pubkey,
  // redlistBlackToken,
  // wallet.publicKey,
  // wallet.signedTransaction
  // );
  // }
  // }
  // }

  console.log("Redlist token: ", redlist?.toString());
  console.log("Has Fake iD: ", withFakeID);

  if (!redlist) {
    console.log("Sending transaction without redlist token");
    transaction.add(
      spawnProgram.instruction.mint(new anchor.BN(bump), withFakeID, {
        accounts: {
          owner: wallet.publicKey,
          pool: SpawnNFTPOOL,
          config: spawnPoolData.config,
          nftMint: mintKey,
          nftAccount: recipientKey,
          metadata: metadata,
          masterEdition: masterEdition,
          metadataExtended: metadataExtended,
          parentNftAccount: parentMembershipAccount,
          parentNftOwner: parentMembershipOwner,
          grandParentNftOwner: grandParentMembershipOwner,
          grandGrandParentNftOwner: grandGrandParentMembershipOwner,
          grandGrandGrandParentNftOwner: grandGrandGrandParentMembershipOwner,
          scobyWallet: spawnPoolData.scobyWallet,
          creatorNftAccount: creatorNftAccount,
          creatorWallet: creatorWallet,
          tokenProgram: TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        },
      })
    );
  } else {
    console.log("Sending transaction with redlist token");
    transaction.add(
      spawnProgram.instruction.mintWithRedlist(
        new anchor.BN(bump),
        withFakeID,
        {
          accounts: {
            owner: wallet.publicKey,
            pool: SpawnNFTPOOL,
            config: spawnPoolData.config,
            nftMint: mintKey,
            nftAccount: recipientKey,
            metadata: metadata,
            masterEdition: masterEdition,
            metadataExtended: metadataExtended,
            parentNftAccount: parentMembershipAccount,
            parentNftOwner: parentMembershipOwner,
            grandParentNftOwner: grandParentMembershipOwner,
            grandGrandParentNftOwner: grandGrandParentMembershipOwner,
            grandGrandGrandParentNftOwner: grandGrandGrandParentMembershipOwner,
            scobyWallet: spawnPoolData.scobyWallet,
            creatorNftAccount: creatorNftAccount,
            creatorWallet: creatorWallet,
            redlistTokenAccount: redlist,
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
          },
        }
      )
    );
  }

  await sendTransaction(conn, wallet, transaction, signers);
}

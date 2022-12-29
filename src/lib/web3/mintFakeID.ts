import {
  clusterApiUrl,
  ConfirmOptions,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

const conn = new Connection(clusterApiUrl("devnet"));

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// membership kind smart contract address and IDL
const FakeIDNFTProgramId = new PublicKey(
  "8S18mGzHyNGur85jAPoEjad8P8rywTpjyABbBEdmj2gb"
);
import FakeIDNFTIdl from "./usdc-fake-id.json";
import {
  AccountLayout,
  MintLayout,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { getOrCreateAssociatedTokenAccount } from "./getOrCreateAssociatedTokenAccount";
import { createAssociatedTokenAccountInstruction } from "./createAssociatedTokenAccountInstruction";
import { getTokenWallet } from "./getTokenWallet";
import { getMetadata } from "./getMetadata";
import { getEdition } from "./getEdition";
import { createMint } from "./createMint";
import { getNftsForOwner } from "./getNftsForOwner";
import { sendTransaction } from "./sendTransaction";
import { AnchorProvider } from "@project-serum/anchor";

const ParentWallet = new PublicKey(
  "4NCF6k76LThBY5Kx6jUBFeY5b7rLULoFugmGDX9Jx77B"
);

// meta data for scoby nft
const FakeIDNFTPOOL = new PublicKey(
  "6TVrWdVQAegLFUewKJLeZ7qsB43qXXwWxJmAu6ztsDmV"
);
const FakeIDNFTSYMBOL = "HELLPASS";

const confirmOption: ConfirmOptions = {
  commitment: "finalized",
  preflightCommitment: "finalized",
  skipPreflight: false,
};

export const mintFakeID = async (wallet: any) => {
  //  try {
    // get provider from connection
    // const provider = new anchor.Provider(conn, wallet as any, confirmOption);
    console.log("kkk", process.env.BROWSER);
    const provider = new AnchorProvider(
      conn, wallet, { commitment: 'processed' }
    );
    
    // get fake id nft program
    const program = new anchor.Program(
      FakeIDNFTIdl as any,
      FakeIDNFTProgramId,
      provider
    );

    console.log("kk", program);

    // get fake id nft pool
    const poolData = (await program.account.pool.fetch(FakeIDNFTPOOL)) as any;

    // get config data of above pool

    const transaction = new Transaction();
    const createTokenAccountTransaction = new Transaction();
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
    instructions.push(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        mintKey,
        recipientKey,
        wallet.publicKey,
        [],
        1
      )
    );
    instructions.forEach((item) => transaction.add(item));
    const metadata = await getMetadata(mintKey, TOKEN_METADATA_PROGRAM_ID);
    const masterEdition = await getEdition(mintKey, TOKEN_METADATA_PROGRAM_ID);
    const [metadataExtended, bump] = await PublicKey.findProgramAddress(
      [mintKey.toBuffer(), FakeIDNFTPOOL.toBuffer()],
      FakeIDNFTProgramId
    );
    const royaltyList: String[] = [];

    const formData = {
      name: "first fake ID",
      uri: `https://gateway.pinata.cloud/ipfs/QmYk9gvH54WW6ZTpvjVDuCkhRXiZEwxjk7YhCxq3zYFxCY/1.json`,
    };
    const usdcToken = new PublicKey(
      "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
    );

    const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.publicKey,
      usdcToken,
      wallet.publicKey,
      wallet.signTransaction
    );

    if (sourceTokenAccount[1]) {
      console.log("transaction source", transaction);
      royaltyList.push(wallet.publicKey.toString());
      createTokenAccountTransaction.add(sourceTokenAccount[1]);
    }

    const scobyUsdcTokenAccount = await getOrCreateAssociatedTokenAccount(
      conn,
      wallet.publicKey,
      usdcToken,
      poolData.scobyWallet as PublicKey,
      wallet.signTransaction
    );

    if (scobyUsdcTokenAccount[1]) {
      console.log("transaction scoby", transaction);
      if (
        royaltyList.findIndex(
          (item) => item == (poolData.scobyWallet as PublicKey).toString()
        ) == -1
      ) {
        royaltyList.push((poolData.scobyWallet as PublicKey).toString());
        createTokenAccountTransaction.add(scobyUsdcTokenAccount[1]);
      }
    }

    // check if this wallet is holding the fake id nft
    let memberships = await getNftsForOwner(
      FakeIDNFTProgramId,
      FakeIDNFTIdl,
      FakeIDNFTPOOL,
      FakeIDNFTSYMBOL,
      wallet.publicKey,
      TOKEN_METADATA_PROGRAM_ID,
      conn,
      wallet
    );
    if (memberships.length != 0)
      throw new Error("Creator Already Have and Fake ID NFT");

    if (poolData.countMinting == 0) {
      transaction.add(
        program.instruction.mintRoot(new anchor.BN(bump), formData, {
          accounts: {
            owner: wallet.publicKey,
            pool: FakeIDNFTPOOL,
            config: poolData.config,
            nftMint: mintKey,
            nftAccount: recipientKey,
            metadata: metadata,
            masterEdition: masterEdition,
            metadataExtended: metadataExtended,
            sourceTokenAccount: sourceTokenAccount[0],
            scobyUsdcTokenAccount: scobyUsdcTokenAccount[0],

            scobyWallet: poolData.scobyWallet,
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
          },
        } as any)
      );
    } else {
      // check if parent wallet is holding fake id nft
      memberships = await getNftsForOwner(
        FakeIDNFTProgramId,
        FakeIDNFTIdl,
        FakeIDNFTPOOL,
        FakeIDNFTSYMBOL,
        ParentWallet,
        TOKEN_METADATA_PROGRAM_ID,
        conn
      );

      let parentMembership = memberships[0];

      const creatorMint = poolData.rootNft as PublicKey;
      console.log(creatorMint.toString());
      const creatorResp = await conn.getTokenLargestAccounts(
        creatorMint,
        "finalized"
      );
      console.log("creator response", creatorResp);
      if (
        creatorResp == null ||
        creatorResp.value == null ||
        creatorResp.value.length == 0
      )
        throw new Error("Invalid creator");
      const creatorNftAccount = creatorResp.value[0].address;
      const creatorInfo = await conn.getAccountInfo(
        creatorNftAccount,
        "finalized"
      );
      if (creatorInfo == null) throw new Error("Creator NFT info failed");
      const accountCreatorInfo = AccountLayout.decode(creatorInfo.data);
      if (Number(accountCreatorInfo.amount) == 0)
        throw new Error("Invalid Creator Info");
      const creatorWallet = new PublicKey(accountCreatorInfo.owner);

      const creatorUsdcTokenAccount = await getOrCreateAssociatedTokenAccount(
        conn,
        wallet.publicKey,
        usdcToken,
        creatorWallet,
        wallet.signTransaction
      );

      if (creatorUsdcTokenAccount[1]) {
        console.log("transaction creator", transaction);
        createTokenAccountTransaction.add(creatorUsdcTokenAccount[1]);
      }

      const parentMembershipResp = await conn.getTokenLargestAccounts(
        parentMembership.extendedData.mint,
        "finalized"
      );
      if (
        parentMembershipResp == null ||
        parentMembershipResp.value == null ||
        parentMembershipResp.value.length == 0
      )
        throw new Error("Invalid NFP");
      const parentMembershipAccount = parentMembershipResp.value[0].address;
      let info = await conn.getAccountInfo(
        parentMembershipAccount,
        "finalized"
      );
      if (info == null) throw new Error("parent membership info failed");
      let accountInfo = AccountLayout.decode(info.data);
      if (Number(accountInfo.amount) == 0)
        throw new Error("Invalid Parent Membership Nft info");
      console.log(accountInfo.owner);
      const parentMembershipOwner = new PublicKey(accountInfo.owner);

      const parentMembershipUsdcTokenAccount =
        await getOrCreateAssociatedTokenAccount(
          conn,
          wallet.publicKey,
          usdcToken,
          parentMembershipOwner,
          wallet.signTransaction
        );

      if (parentMembershipUsdcTokenAccount[1]) {
        console.log("transaction parent", transaction);
        if (royaltyList.findIndex((item) => item == accountInfo.owner) == -1) {
          royaltyList.push(accountInfo.owner);
          createTokenAccountTransaction.add(
            parentMembershipUsdcTokenAccount[1]
          );
        }
      }

      // grand parent
      const grandParentMembershipResp = await conn.getTokenLargestAccounts(
        parentMembership.extendedData.parentNfp,
        "finalized"
      );
      if (
        grandParentMembershipResp == null ||
        grandParentMembershipResp.value == null ||
        grandParentMembershipResp.value.length == 0
      )
        throw new Error("Invalid NFP");
      const grandParentMembershipAccount =
        grandParentMembershipResp.value[0].address;
      info = await conn.getAccountInfo(
        grandParentMembershipAccount,
        "finalized"
      );
      if (info == null) throw new Error("grand parent membership info failed");
      accountInfo = AccountLayout.decode(info.data);
      if (Number(accountInfo.amount) == 0)
        throw new Error("Invalid Grand Parent Membership Nft info");
      console.log(accountInfo.owner);
      const grandParentMembershipOwner = new PublicKey(accountInfo.owner);

      const grandParentMembershipUsdcTokenAccount =
        await getOrCreateAssociatedTokenAccount(
          conn,
          wallet.publicKey,
          usdcToken,
          grandParentMembershipOwner,
          wallet.signTransaction
        );

      if (grandParentMembershipUsdcTokenAccount[1]) {
        console.log("transaction grand parent", transaction);
        if (royaltyList.findIndex((item) => item == accountInfo.owner) == -1) {
          royaltyList.push(accountInfo.owner);
          createTokenAccountTransaction.add(
            grandParentMembershipUsdcTokenAccount[1]
          );
        }
      }

      // grand grand parent
      const grandGrandParentMembershipResp = await conn.getTokenLargestAccounts(
        parentMembership.extendedData.grandParentNfp,
        "finalized"
      );
      if (
        grandGrandParentMembershipResp == null ||
        grandGrandParentMembershipResp.value == null ||
        grandGrandParentMembershipResp.value.length == 0
      )
        throw new Error("Invalid NFP");
      const grandGrandParentMembershipAccount =
        grandGrandParentMembershipResp.value[0].address;
      info = await conn.getAccountInfo(
        grandGrandParentMembershipAccount,
        "finalized"
      );
      if (info == null) throw new Error("grand parent membership info failed");
      accountInfo = AccountLayout.decode(info.data);
      if (Number(accountInfo.amount) == 0)
        throw new Error("Invalid Grand Parent Membership Nft info");
      const grandGrandParentMembershipOwner = new PublicKey(accountInfo.owner);

      const grandGrandParentMembershipUsdcTokenAccount =
        await getOrCreateAssociatedTokenAccount(
          conn,
          wallet.publicKey,
          usdcToken,
          grandGrandParentMembershipOwner,
          wallet.signTransaction
        );

      if (grandGrandParentMembershipUsdcTokenAccount[1]) {
        console.log("transaction grand parent", transaction);
        if (royaltyList.findIndex((item) => item == accountInfo.owner) == -1) {
          royaltyList.push(accountInfo.owner);
          createTokenAccountTransaction.add(
            grandGrandParentMembershipUsdcTokenAccount[1]
          );
        }
      }

      const grandGrandGrandParentMembershipResp =
        await conn.getTokenLargestAccounts(
          parentMembership.extendedData.grandGrandParentNfp,
          "finalized"
        );
      if (
        grandGrandGrandParentMembershipResp == null ||
        grandGrandGrandParentMembershipResp.value == null ||
        grandGrandGrandParentMembershipResp.value.length == 0
      )
        throw new Error("Invalid NFP");
      const grandGrandGrandParentMembershipAccount =
        grandGrandGrandParentMembershipResp.value[0].address;
      info = await conn.getAccountInfo(
        grandGrandGrandParentMembershipAccount,
        "finalized"
      );
      if (info == null) throw new Error("grand parent membership info failed");
      accountInfo = AccountLayout.decode(info.data);
      if (Number(accountInfo.amount) == 0)
        throw new Error("Invalid Grand Parent Membership Nft info");
      const grandGrandGrandParentMembershipOwner = new PublicKey(
        accountInfo.owner
      );

      const grandGrandGrandParentMembershipUsdcTokenAccount =
        await getOrCreateAssociatedTokenAccount(
          conn,
          wallet.publicKey,
          usdcToken,
          grandGrandGrandParentMembershipOwner,
          wallet.signTransaction
        );

      if (grandGrandGrandParentMembershipUsdcTokenAccount[1]) {
        console.log("transaction grand parent", transaction);
        if (royaltyList.findIndex((item) => item == accountInfo.owner) == -1) {
          royaltyList.push(accountInfo.owner);
          createTokenAccountTransaction.add(
            grandGrandGrandParentMembershipUsdcTokenAccount[1]
          );
        }
      }

      transaction.add(
        program.instruction.mint(new anchor.BN(bump), formData, {
          accounts: {
            owner: wallet.publicKey,
            pool: FakeIDNFTPOOL,
            config: poolData.config,
            nftMint: mintKey,
            nftAccount: recipientKey,
            metadata: metadata,
            masterEdition: masterEdition,
            metadataExtended: metadataExtended,
            parentNftAccount: parentMembershipAccount,
            parentNftMetadataExtended: parentMembership.metadataExtended,
            grandParentNftAccount: grandParentMembershipAccount,
            grandGrandParentNftAccount: grandGrandParentMembershipAccount,
            grandGrandGrandParentNftAccount:
              grandGrandGrandParentMembershipAccount,
            creatorNftAccount: creatorNftAccount,
            sourceTokenAccount: sourceTokenAccount[0],
            scobyUsdcTokenAccount: scobyUsdcTokenAccount[0],
            creatorUsdcTokenAccount: creatorUsdcTokenAccount[0],
            parentNftUsdcTokenAccount: parentMembershipUsdcTokenAccount[0],
            grandParentNftUsdcTokenAccount:
              grandParentMembershipUsdcTokenAccount[0],
            grandGrandParentNftUsdcTokenAccount:
              grandGrandParentMembershipUsdcTokenAccount[0],
            grandGrandGrandParentNftUsdcTokenAccount:
              grandGrandGrandParentMembershipUsdcTokenAccount[0],
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
          },
        } as any)
      );
    }
    // await sendTransaction(tx,[])

    console.log("transaction", transaction);
    console.log(royaltyList);
    if (createTokenAccountTransaction.instructions.length > 0) {
      console.log(createTokenAccountTransaction);
      const blockHash = await conn.getRecentBlockhash();
      createTokenAccountTransaction.feePayer = await wallet.publicKey;
      createTokenAccountTransaction.recentBlockhash = blockHash.blockhash;
      const signed = await wallet.signTransaction(
        createTokenAccountTransaction
      );
      await conn.sendRawTransaction(await signed.serialize());
      console.log("kkk");
    }
    await sendTransaction(conn, wallet, transaction, signers);
  //  } catch (err) {
  //    console.log(err);
  //  }
};

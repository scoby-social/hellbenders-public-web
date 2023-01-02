import { Connection, Keypair, Transaction } from "@solana/web3.js";

export async function sendTransaction(
  conn: Connection,
  wallet: any,
  transaction: Transaction,
  signers: Keypair[]
) {
  transaction.feePayer = wallet.publicKey;
  transaction.recentBlockhash = (
    await conn.getRecentBlockhash("max")
  ).blockhash;
  transaction.setSigners(wallet.publicKey, ...signers.map((s) => s.publicKey));
  if (signers.length != 0) transaction.partialSign(...signers);
  const signedTransaction = await wallet.signTransaction(transaction);
  let hash = await conn.sendRawTransaction(await signedTransaction.serialize());
  await conn.confirmTransaction(hash);
  return hash;
}

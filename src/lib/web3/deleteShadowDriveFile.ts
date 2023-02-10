import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import nacl from "tweetnacl";

const shdwDrivePrivateKey = process.env
  .NEXT_PUBLIC_SHDW_DRIVE_ACC_SECRET_KEY!.split(",")
  .map((val) => Number(val));

const SECRET_KEY_ARR = Keypair.fromSecretKey(
  new Uint8Array(shdwDrivePrivateKey)
);

const SHDW_DRIVE_ENDPOINT = "https://shadow-storage.genesysgo.net";

export async function deleteShadowDriveFile(url: string) {
  const storageAccount = new PublicKey(
    process.env.NEXT_PUBLIC_SHDW_STORE_ACCOUNT!
  );

  const keypair = SECRET_KEY_ARR;

  const message = `Shadow Drive Signed Message:\nStorageAccount: ${storageAccount}\nFile to delete: ${url}`;

  const encodedMessage = new TextEncoder().encode(message);
  const signedMessage = nacl.sign.detached(encodedMessage, keypair.secretKey);

  // Convert the byte array to a bs58-encoded string
  const signature = bs58.encode(signedMessage);
  const deleteRequestBody = {
    signer: keypair.publicKey.toString(),
    message: signature,
    location: url,
  };
  await fetch(`${SHDW_DRIVE_ENDPOINT}/delete-file`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deleteRequestBody),
  });
}

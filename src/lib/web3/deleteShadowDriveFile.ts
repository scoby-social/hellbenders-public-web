import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import nacl from "tweetnacl";

const SECRET_KEY_ARR = Keypair.fromSecretKey(
  new Uint8Array([
    190, 232, 206, 101, 230, 160, 211, 224, 30, 255, 242, 75, 134, 10, 124, 110,
    199, 156, 114, 92, 170, 20, 125, 3, 139, 15, 140, 192, 182, 222, 130, 136,
    221, 207, 66, 143, 19, 206, 1, 193, 85, 49, 200, 177, 99, 194, 186, 162, 52,
    249, 76, 152, 55, 113, 189, 82, 15, 97, 228, 34, 60, 24, 159, 48,
  ])
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

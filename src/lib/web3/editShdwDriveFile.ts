import { Keypair, PublicKey } from "@solana/web3.js";
import axios from "axios";
import bs58 from "bs58";
import nacl from "tweetnacl";
import crypto from "crypto";

const SHDW_DRIVE_ENDPOINT = "https://shadow-storage.genesysgo.net";

const shdwDrivePrivateKey = process.env
  .NEXT_PUBLIC_SHDW_DRIVE_ACC_SECRET_KEY!.split(",")
  .map((val) => Number(val));

const SECRET_KEY_ARR = Keypair.fromSecretKey(
  new Uint8Array(shdwDrivePrivateKey)
);

export async function editSeniorityInJsonMetadata(
  fileUrl: string,
  userSeniority: number,
  username: string
) {
  const file = await axios.get(fileUrl);
  const json = file.data;
  const filename = `${username}.json`;

  json.seniority = userSeniority;

  const storageAccount = new PublicKey(
    process.env.NEXT_PUBLIC_SHDW_STORE_ACCOUNT!
  );

  const keypair = SECRET_KEY_ARR;

  const contentType = "application/json;charset=utf-8;";

  const blob = new Blob(
    [decodeURIComponent(encodeURI(JSON.stringify({ ...json })))],
    { type: contentType }
  );

  const _filename = filename;
  const fileHashSum = crypto.createHash("sha256");
  const fileNameHashSum = crypto.createHash("sha256");
  fileHashSum.update(Buffer.isBuffer(file) ? file : Buffer.from(fileUrl));
  fileNameHashSum.update(_filename);
  const fileNameHash = fileNameHashSum.digest("hex");

  const msg = `Shadow Drive Signed Message:\n StorageAccount: ${storageAccount.toString()}\nFile to edit: ${filename}\nNew file hash: ${fileNameHash}`;
  const encodedMessage = new TextEncoder().encode(msg);
  const signedMessage = nacl.sign.detached(encodedMessage, keypair.secretKey);
  const signature = bs58.encode(signedMessage);

  const fd = new FormData();
  fd.append("file", blob, _filename);
  fd.append("message", signature.toString());
  fd.append("signer", keypair.publicKey.toString());
  fd.append("storage_account", storageAccount.toString());
  fd.append("url", fileUrl);

  await axios.post(`${SHDW_DRIVE_ENDPOINT}/edit`, fd, {
    maxBodyLength: -1,
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });
}

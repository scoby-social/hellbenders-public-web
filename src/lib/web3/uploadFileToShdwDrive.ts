import bs58 from "bs58";
import nacl from "tweetnacl";
import crypto from "crypto";
import axios, { AxiosError } from "axios";
import { Keypair, PublicKey } from "@solana/web3.js";

const SHDW_DRIVE_ENDPOINT = "https://shadow-storage.genesysgo.net";

const SECRET_KEY_ARR = Keypair.fromSecretKey(
  new Uint8Array([
    190, 232, 206, 101, 230, 160, 211, 224, 30, 255, 242, 75, 134, 10, 124, 110,
    199, 156, 114, 92, 170, 20, 125, 3, 139, 15, 140, 192, 182, 222, 130, 136,
    221, 207, 66, 143, 19, 206, 1, 193, 85, 49, 200, 177, 99, 194, 186, 162, 52,
    249, 76, 152, 55, 113, 189, 82, 15, 97, 228, 34, 60, 24, 159, 48,
  ])
);

export async function saveMetadataImage(
  fileUrl: string,
  fileName: string
): Promise<string> {
  const storageAccount = new PublicKey(
    process.env.NEXT_PUBLIC_SHDW_STORE_ACCOUNT!
  );
  const data = new FormData();

  const fileBlob = await (await fetch(fileUrl)).blob();
  const fileBuffer = await fileBlob.arrayBuffer();

  const keypair = SECRET_KEY_ARR;

  const owner_storageAccount = new PublicKey(keypair.publicKey);
  const _filename = fileName;
  const fileHashSum = crypto.createHash("sha256");
  const fileNameHashSum = crypto.createHash("sha256");
  fileHashSum.update(Buffer.from(fileBuffer));
  fileNameHashSum.update(_filename);
  const fileNameHash = fileNameHashSum.digest("hex");

  const msg = `Shadow Drive Signed Message:\nStorage Account: ${storageAccount.toString()}\nUpload files with hash: ${fileNameHash}`;
  const encodedMessage = new TextEncoder().encode(msg);
  const signedMessage = nacl.sign.detached(encodedMessage, keypair.secretKey);
  const signature = bs58.encode(signedMessage);

  data.append("file", fileBlob, _filename);
  data.append("fileNames", _filename);
  data.append("message", signature.toString());
  data.append("storage_account", storageAccount.toString());
  data.append("signer", owner_storageAccount.toString());

  return axios
    .post(`${SHDW_DRIVE_ENDPOINT}/upload`, data, {
      maxBodyLength: -1,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then(function (response: any) {
      return response.data.finalized_locations[0];
    })
    .catch(function (error: AxiosError) {
      throw new Error(error.message);
    });
}

export async function saveJsonMetadata(
  fileBlob: Blob,
  fileUrl: string,
  fileName: string
): Promise<string> {
  const storageAccount = new PublicKey(
    process.env.NEXT_PUBLIC_SHDW_STORE_ACCOUNT!
  );

  const data = new FormData();

  const file = fileBlob;

  const keypair = SECRET_KEY_ARR;

  let ownerStorageAccount = new PublicKey(keypair.publicKey);
  const _filename = fileName;
  const fileHashSum = crypto.createHash("sha256");
  const fileNameHashSum = crypto.createHash("sha256");
  fileHashSum.update(Buffer.isBuffer(file) ? file : Buffer.from(fileUrl));
  fileNameHashSum.update(_filename);
  const fileNameHash = fileNameHashSum.digest("hex");

  const msg = `Shadow Drive Signed Message:\nStorage Account: ${storageAccount.toString()}\nUpload files with hash: ${fileNameHash}`;
  const encodedMessage = new TextEncoder().encode(msg);
  const signedMessage = nacl.sign.detached(encodedMessage, keypair.secretKey);
  const signature = bs58.encode(signedMessage);

  data.append("file", file, _filename);
  data.append("fileNames", _filename);
  data.append("message", signature.toString());
  data.append("storage_account", storageAccount.toString());
  data.append("signer", ownerStorageAccount.toString());

  return axios
    .post(`${SHDW_DRIVE_ENDPOINT}/upload`, data, {
      maxBodyLength: -1,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then(function (response: any) {
      return response.data.finalized_locations[0];
    })
    .catch(function (error: AxiosError) {
      console.log("Error here: ", JSON.stringify(error, null, 4));
      throw new Error(error.message);
    });
}

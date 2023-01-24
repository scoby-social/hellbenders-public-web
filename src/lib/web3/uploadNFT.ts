import { filterLayersToCheckNewExceptions } from "components/Profile/PhotoBooth/LayerBuilder/utils/filterLayersToCheckNewExceptions";
import { deleteShadowDriveFile } from "./deleteShadowDriveFile";
import { mintFakeID } from "./mintFakeID";
import { MetadataAttributes, Metadata } from "./types/metadata";
import { UploadNftParams } from "./types/uploadNftParams";
import { UploadNFTReturnType } from "./types/uploadNFTReturnType";
import { saveJsonMetadata, saveMetadataImage } from "./uploadFileToShdwDrive";

export async function uploadNFT({
  selectedLayers,
  resultingLayer,
  formResult,
  leaderWalletAddress,
  wallet,
  parentNftAddress,
  seniority,
  updateMessage,
}: UploadNftParams): Promise<UploadNFTReturnType> {
  const attributes: MetadataAttributes[] = [];

  const today = new Date();
  const UTCDate = today.toJSON();
  const splittedDate = UTCDate.split("T");
  const splittedTime = splittedDate[1].split(".");

  const quarter = Math.floor((today.getMonth() + 3) / 3);
  const year = today.getFullYear();

  const name = `${formResult.username} the ${formResult.amplifierRole} ${formResult.superpowerRole}`;
  const croppedName = name.slice(0, 28);

  const metadata: Metadata = {
    name: croppedName,
    symbol: "HELLPASS",
    description: formResult.bio,
    image: resultingLayer.image,
    seniority,
    pronouns: formResult.pronouns,
    external_link: `www.hellbenders.world/${formResult.username}`,
    collection_name: "Hellbenders Fake ID",
    family_name: "Mapshifting",
    parent: leaderWalletAddress,
    mint_wallet: wallet.publicKey!.toString(),
    twitter_handle: formResult.twitterHandle,
    discord_handle: formResult.discordHandle,
    telegram_handle: formResult.telegramHandle,
    username: formResult.username,
    birthday: splittedDate[0],
    time_of_birth: `${splittedTime[0]} UTC`,
    season: `Q${quarter} ${year}`,
  };

  const filteredLayers = [...selectedLayers];

  filterLayersToCheckNewExceptions(filteredLayers);

  filteredLayers.forEach((layer) => {
    if (layer && !layer.skipped) {
      attributes.push({
        trait_type: layer.type.toString(),
        value: layer.name.split(".")[0],
      });
    }
  });

  updateMessage("Your image is being deployed to the blockchain.");

  metadata.image = await saveMetadataImage(
    metadata.image,
    `${metadata.username}.png`
  );

  const contentType = "application/json;charset=utf-8;";

  const blob = new Blob(
    [
      decodeURIComponent(
        encodeURI(JSON.stringify({ ...metadata, attributes }))
      ),
    ],
    { type: contentType }
  );

  const blobUri = URL.createObjectURL(blob);

  updateMessage("Your identity is being concealed from the authorities.");

  const metadataShdwUrl = await saveJsonMetadata(
    blob,
    blobUri,
    `${metadata.username}.json`
  );

  let nftAddress = "";

  updateMessage("Your Fake ID is being minted.");

  try {
    nftAddress = await mintFakeID(
      wallet,
      metadataShdwUrl,
      metadata.name,
      parentNftAddress
    );
  } catch (err) {
    deleteShadowDriveFile(metadataShdwUrl);
    deleteShadowDriveFile(metadata.image);
    throw err;
  }

  URL.revokeObjectURL(blobUri);

  return { image: metadata.image, nftAddress, metadataUrl: metadataShdwUrl };
}

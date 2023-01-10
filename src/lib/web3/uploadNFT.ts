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
}: UploadNftParams): Promise<UploadNFTReturnType> {
  const attributes: MetadataAttributes[] = [];
  const metadata: Metadata = {
    name: `#${0} ${formResult.username} the ${formResult.amplifier_role} ${
      formResult.superpower_role
    }`,
    symbol: "HELLPASS",
    description: formResult.bio,
    image: resultingLayer.image,
    seniority: 0,
    pronouns: formResult.pronouns,
    external_link: formResult.externalLink,
    collection_name: "Hellbenders Fake ID",
    family_name: "Mapshifting",
    parent: leaderWalletAddress,
    mint_wallet: wallet.publicKey!.toString(),
    twitter_handle: "",
    discord_handle: "",
    username: formResult.username,
  };

  selectedLayers.forEach((layer) => {
    if (layer && !layer.skipped) {
      attributes.push({
        trait_type: layer.type.toString(),
        value: layer.name.split(".")[0],
      });
    }
  });

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

  const metadataShdwUrl = await saveJsonMetadata(
    blob,
    blobUri,
    `${metadata.username}.json`
  );

  console.info("Metadata JSON: ", metadataShdwUrl);

  const nftAddress = await mintFakeID(
    wallet,
    metadataShdwUrl,
    metadata.name,
    parentNftAddress
  );

  URL.revokeObjectURL(blobUri);

  return { image: metadata.image, nftAddress };
}

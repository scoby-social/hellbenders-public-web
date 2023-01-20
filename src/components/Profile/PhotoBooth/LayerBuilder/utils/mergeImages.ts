import { LayerInBuilder } from "../types";
import { convertToBlob } from "./convertToBlob";

export async function mergeImages(
  firstImage: LayerInBuilder | null,
  secondImage: LayerInBuilder
): Promise<string> {
  if (!firstImage) return secondImage.image;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const [fetchedImage, fetchedImage2] = await Promise.all([
    fetch(firstImage.image),
    fetch(secondImage.image),
  ]);

  const [image1, image2] = await Promise.all([
    fetchedImage.blob(),
    fetchedImage2.blob(),
  ]);

  const bitmap1 = await createImageBitmap(image1);
  const bitmap2 = await createImageBitmap(image2);

  canvas.width = bitmap2.width;
  canvas.height = bitmap2.height;

  context!.drawImage(bitmap1, 0, 0, bitmap1.width, bitmap1.height);

  context!.drawImage(bitmap2, 0, 0, bitmap2.width, bitmap2.height);

  const canvasBlob = await convertToBlob(canvas);

  return URL.createObjectURL(canvasBlob);
}

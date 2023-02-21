import { convertToBlob } from "./convertToBlob";

export async function cropImage(blobImageUri: string): Promise<string> {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 512;

  const image = await (await fetch(blobImageUri)).blob();
  const bitmap = await createImageBitmap(image);

  context!.drawImage(
    bitmap,
    125,
    25,
    280,
    280,
    0,
    0,
    bitmap.width,
    bitmap.height
  );

  const blob = await convertToBlob(canvas);

  return URL.createObjectURL(blob);
}

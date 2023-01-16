import { convertToBlob } from "./convertToBlob";

export async function cropImage(blobImageUri: string): Promise<string> {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 5100;
  canvas.height = 5100;

  const image = await (await fetch(blobImageUri)).blob();
  const bitmap = await createImageBitmap(image);

  context!.drawImage(
    bitmap,
    1100,
    400,
    3000,
    3100,
    0,
    0,
    bitmap.width,
    bitmap.height
  );

  const blob = await convertToBlob(canvas);

  return URL.createObjectURL(blob);
}

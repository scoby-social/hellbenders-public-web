import { LayerInBuilder } from "../types";

export async function mergeImages(
  firstImage: LayerInBuilder | undefined,
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

  canvas.width = bitmap1.width;
  canvas.height = bitmap1.height;

  context?.drawImage(bitmap1, 0, 0, bitmap1.width, bitmap1.height);
  context?.drawImage(bitmap2, 0, 0, bitmap2.width, bitmap2.height);

  const canvasBlob = await convertToBlob(canvas);

  return URL.createObjectURL(canvasBlob);
}

export async function mergeImageWithException(
  exception: LayerInBuilder,
  selectedLayer: LayerInBuilder,
  buildedLayers: LayerInBuilder[]
): Promise<string> {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const selectedLayerBlob = await (await fetch(selectedLayer.image)).blob();
  const selectedLayerBitmap = await createImageBitmap(selectedLayerBlob);

  canvas.width = selectedLayerBitmap.width;
  canvas.height = selectedLayerBitmap.height;

  let pendingLayer;

  for await (const layer of buildedLayers) {
    if (exception.reverse && layer.name === exception.name) {
      pendingLayer = layer;
      continue;
    }

    if (layer.name !== exception.name && layer.type !== selectedLayer.type) {
      const layerToCombine = await (await fetch(layer.image)).blob();
      const layerBitmap = await createImageBitmap(layerToCombine);

      context?.drawImage(
        layerBitmap,
        0,
        0,
        layerBitmap.width,
        layerBitmap.height
      );
    }
  }

  context?.drawImage(
    selectedLayerBitmap,
    0,
    0,
    selectedLayerBitmap.width,
    selectedLayerBitmap.height
  );

  if (pendingLayer) {
    const layerToCombine = await (await fetch(pendingLayer.image)).blob();
    const layerBitmap = await createImageBitmap(layerToCombine);

    context?.drawImage(
      layerBitmap,
      0,
      0,
      layerBitmap.width,
      layerBitmap.height
    );
  }

  const canvasBlob = await convertToBlob(canvas);

  return URL.createObjectURL(canvasBlob);
}

async function convertToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    });
  });
}

import { LayerInBuilder, MergeImageWithExceptionReturnValues } from "../types";
import { convertToBlob } from "./convertToBlob";

export async function mergeImageWithException(
  exceptions: Array<LayerInBuilder | null>,
  selectedLayer: LayerInBuilder,
  buildedLayers: LayerInBuilder[]
): Promise<MergeImageWithExceptionReturnValues> {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const selectedLayerBlob = await (await fetch(selectedLayer.image)).blob();
  const selectedLayerBitmap = await createImageBitmap(selectedLayerBlob);

  canvas.width = selectedLayerBitmap.width;
  canvas.height = selectedLayerBitmap.height;

  const pendingLayers: LayerInBuilder[] = [];
  let reversedLayerKey: string | null = null;

  const filteredLayers = buildedLayers.filter((layer) => {
    return !Boolean(
      exceptions.find((exception) => {
        if (!exception) return false;
        if (exception.reverse && exception.name === layer.name) {
          pendingLayers.push(layer);
          reversedLayerKey = layer.key;
          return false;
        }

        if (layer.reverse) {
          pendingLayers.push(layer);
          return false;
        }

        return exception.name === layer.name && exception.type === layer.type;
      })
    );
  });

  for await (const layer of filteredLayers) {
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

  context?.drawImage(
    selectedLayerBitmap,
    0,
    0,
    selectedLayerBitmap.width,
    selectedLayerBitmap.height
  );

  if (pendingLayers.length > 0) {
    for await (const pendingLayer of pendingLayers) {
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
  }

  const canvasBlob = await convertToBlob(canvas);

  return { resultingImage: URL.createObjectURL(canvasBlob), reversedLayerKey };
}

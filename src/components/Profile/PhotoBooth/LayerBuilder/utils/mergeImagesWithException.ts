import { LayerType } from "lib/models/layer";
import { LayerInBuilder, MergeImageWithExceptionReturnValues } from "../types";
import { convertToBlob } from "./convertToBlob";

export async function mergeImageWithException(
  exceptions: Array<LayerInBuilder | null>,
  selectedLayer: LayerInBuilder,
  buildedLayers: LayerInBuilder[]
): Promise<MergeImageWithExceptionReturnValues> {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 5100;
  canvas.height = 5100;

  const firstLayers: LayerInBuilder[] = [];
  const pendingLayers: LayerInBuilder[] = [];
  const filteredLayers: LayerInBuilder[] = [];
  let reversedLayerKey: string | null = null;

  buildedLayers.forEach((layer) => {
    if (
      layer.type === LayerType.BACKGROUND ||
      [
        LayerType.MALE_BODY,
        LayerType.FEMALE_BODY,
        LayerType.MALE_SHIRT,
        LayerType.FEMALE_TOP,
      ].includes(layer.type)
    ) {
      firstLayers.push(layer);
      return;
    }

    if (layer.reverse) {
      pendingLayers.push(layer);
      return;
    }

    const hasException = !!exceptions.find((exception) => {
      if (!exception) return false;

      if (exception.reverse && exception.name === layer.name) {
        pendingLayers.push(layer);
        reversedLayerKey = layer.key;
        return false;
      }

      if (exception.name === layer.name) return true;
    });

    if (!hasException) filteredLayers.push(layer);
  });

  if (
    [LayerType.MALE_SHIRT, LayerType.FEMALE_TOP].includes(selectedLayer.type)
  ) {
    firstLayers.push(selectedLayer);
  }

  for await (const layer of firstLayers) {
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

  if (
    ![LayerType.MALE_SHIRT, LayerType.FEMALE_TOP].includes(selectedLayer.type)
  ) {
    const selectedLayerBlob = await (await fetch(selectedLayer.image)).blob();
    const selectedLayerBitmap = await createImageBitmap(selectedLayerBlob);

    context?.drawImage(
      selectedLayerBitmap,
      0,
      0,
      selectedLayerBitmap.width,
      selectedLayerBitmap.height
    );
  }

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

  const canvasBlob = await convertToBlob(canvas);

  return { resultingImage: URL.createObjectURL(canvasBlob), reversedLayerKey };
}

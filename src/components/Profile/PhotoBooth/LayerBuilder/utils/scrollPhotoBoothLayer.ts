import { nanoid } from "nanoid";
import { LayerInBuilder, ScrollPhotoBoothReturnValues } from "../types";
import { checkLayerExceptions } from "./checkLayerExceptions";
import { mergeImages, mergeImageWithException } from "./mergeImages";

export async function scrollPhotoBoothLayers(
  diff: number,
  layerIndex: number,
  allStepLayers: LayerInBuilder[],
  layersToCombine: LayerInBuilder[],
  step: number,
  selectedLayersOnStep: LayerInBuilder[]
): Promise<ScrollPhotoBoothReturnValues> {
  const length = allStepLayers.length;

  const firstLeft = layerIndex - 1;
  const firstRight = (layerIndex + 1) % length;

  const leftSideLayers = [];
  const rightSideLayers = [];

  /* Fill the layers to be shown, that are not selected */
  leftSideLayers.push(
    allStepLayers[
      firstLeft < 0 ? Math.abs(firstLeft + allStepLayers.length) : firstLeft
    ]
  );

  rightSideLayers.push(allStepLayers[firstRight]);

  if (diff > 1) {
    const secondLeft = layerIndex - diff;
    leftSideLayers.push(
      allStepLayers[
        secondLeft < 0
          ? Math.abs(secondLeft + allStepLayers.length)
          : secondLeft
      ]
    );

    const secondRight = (layerIndex + diff) % length;
    rightSideLayers.push(allStepLayers[secondRight]);
  }

  /* ------------------------------------------------ */

  const currentLayer = { ...allStepLayers[layerIndex] };
  currentLayer.selected = true;

  /* Checks for exception and build the final selected image */

  const [resultingLayer] = checkLayerExceptions(
    layersToCombine,
    selectedLayersOnStep,
    currentLayer
  );

  if (resultingLayer) {
    const mergedImage = await mergeImageWithException(
      resultingLayer,
      currentLayer,
      selectedLayersOnStep
    );
    currentLayer.image = mergedImage;
    currentLayer.exception = resultingLayer.exception;
  } else {
    const mergedImage = await mergeImages(
      layersToCombine[step - 1],
      currentLayer
    );
    currentLayer.image = mergedImage;
  }

  /* ------------------------------------------------ */

  const layersToShow = [
    ...leftSideLayers,
    currentLayer,
    ...rightSideLayers,
  ].map((val, index) => ({ ...val, key: `${nanoid()}-${index}` }));

  return {
    layersToShow,
    combinedLayer: currentLayer,
    stepLayer: allStepLayers[layerIndex],
  };
}

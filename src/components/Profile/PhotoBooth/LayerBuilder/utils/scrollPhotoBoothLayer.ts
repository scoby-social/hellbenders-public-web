import { nanoid } from "nanoid";
import { doesStepHasSpecialException } from "../../utils/getSteps";
import { ScrollPhotoBoothLayersParams } from "../LayerStep/types";
import { LayerInBuilder, ScrollPhotoBoothReturnValues } from "../types";
import { checkLayerExceptions } from "./checkLayerExceptions";
import { getFilteredLayers } from "./filterLayersForCombine";
import { getLayerExceptionText } from "./getLayerExceptionText";
import { mergeImages } from "./mergeImages";
import { mergeImageWithException } from "./mergeImagesWithException";

export async function scrollPhotoBoothLayers({
  diff,
  layerIndex,
  allStepLayers,
  layersToCombine,
  step,
  selectedLayersOnStep,
}: ScrollPhotoBoothLayersParams): Promise<ScrollPhotoBoothReturnValues> {
  const length = allStepLayers.length;

  const firstLeft = layerIndex - 1;
  const firstRight = (layerIndex + 1) % length;

  const leftSideLayers = [];
  const rightSideLayers = [];

  /* Fill the layers to be shown, that are not selected */
  const firstLeftSum =
    firstLeft < 0 ? Math.abs(firstLeft + allStepLayers.length) : firstLeft;

  rightSideLayers.push(allStepLayers[firstRight]);

  if (diff > 1) {
    const secondLeft = layerIndex - diff;
    const secondLeftSum =
      secondLeft < 0 ? Math.abs(secondLeft + allStepLayers.length) : secondLeft;

    leftSideLayers.push(allStepLayers[secondLeftSum]);
    leftSideLayers.push(allStepLayers[firstLeftSum]);

    const secondRight = (layerIndex + diff) % length;
    rightSideLayers.push(allStepLayers[secondRight]);
  } else {
    leftSideLayers.push(allStepLayers[firstLeftSum]);
  }

  /* ------------------------------------------------ */

  const currentLayer = { ...allStepLayers[layerIndex] };
  currentLayer.selected = true;

  /* Checks for exception and build the final selected image */

  const filteredLayers = getFilteredLayers(step, selectedLayersOnStep);

  const exceptions = checkLayerExceptions(filteredLayers, currentLayer);
  let reversedKey: string | null = null;

  if (exceptions.length > 0 || doesStepHasSpecialException(step)) {
    const mergedImage = await mergeImageWithException(
      exceptions,
      currentLayer,
      filteredLayers
    );
    currentLayer.image = mergedImage.resultingImage;
    currentLayer.exception = getLayerExceptionText(
      exceptions,
      currentLayer.name
    );
    reversedKey = mergedImage.reversedLayerKey;
  } else {
    const mergedImage = await mergeImages(
      getLayerToCombine(layersToCombine, step - 1),
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
    reversedKey,
  };
}

function getLayerToCombine(
  layers: LayerInBuilder[],
  index: number
): LayerInBuilder | null {
  if (index === -1) return null;
  if (layers[index].skipped) return getLayerToCombine(layers, index - 1);
  return layers[index];
}

import { getLayersByType } from "lib/firebase/firestore/layers/getLayers";
import { nanoid } from "nanoid";
import { getStepLayers } from "../../utils/getSteps";
import { GetLayersForCurrentStepParams } from "../LayerStep/types";
import {
  GetAllLayersForCurrentStepReturnValues,
  LayerInBuilder,
} from "../types";
import { checkLayerExceptions } from "./checkLayerExceptions";
import { getFilteredLayers } from "./filterLayersForCombine";
import { getLayerExceptionText } from "./getLayerExceptionText";
import { getStandardTraitLayer } from "./getStandardTraitLayer";
import { mergeImages } from "./mergeImages";
import { mergeImageWithException } from "./mergeImagesWithException";

export async function getLayersForCurrentStep({
  diff,
  currentStep,
  layersToCombine,
  step,
  selectedLayersOnStep,
  bodyType,
}: GetLayersForCurrentStepParams): Promise<GetAllLayersForCurrentStepReturnValues> {
  const currentLayerStepType = getStepLayers(currentStep, bodyType);
  const layers = await getLayersByType(currentStep, bodyType);

  const completeLayers = layers.map((val, index) => ({
    ...val,
    selected: false,
    index,
    key: nanoid(),
    exception: "",
    reverse: false,
    skipped: false,
    standard: false,
  }));

  const layersWithBlobImages = await Promise.all(
    completeLayers.map(async (val) => ({
      ...val,
      image: URL.createObjectURL(await (await fetch(val.image)).blob()),
    }))
  );

  if (currentStep > 1) {
    const currentLayer = getStandardTraitLayer(
      layersToCombine,
      currentLayerStepType[0]
    );
    currentLayer.exception = "";
    currentLayer.key = nanoid();
    layersWithBlobImages.unshift(currentLayer);
  }

  const [{ ...stepLayer }] = layersWithBlobImages;

  const layersLength = layersWithBlobImages.length;

  const [{ ...firstLayer }] = layersWithBlobImages;

  const firstLeft = layersLength - 1;
  const firstRight = 1;

  const leftSideLayers = [];
  const rightSideLayers = [];

  /* Fill the layers to be shown, that are not selected */
  rightSideLayers.push(layersWithBlobImages[firstRight]);

  if (diff > 1) {
    const secondLeft = layersLength - diff;

    leftSideLayers.push(layersWithBlobImages[secondLeft]);
    leftSideLayers.push(layersWithBlobImages[firstLeft]);

    const secondRight = diff;
    rightSideLayers.push(layersWithBlobImages[secondRight]);
  } else {
    leftSideLayers.push(layersWithBlobImages[firstLeft]);
  }

  let reversedKey: string | null = null;

  if (currentStep <= 1) {
    const filteredLayers = getFilteredLayers(step, selectedLayersOnStep);

    const exceptions = checkLayerExceptions(filteredLayers, firstLayer);

    if (exceptions.length > 0) {
      const mergedImage = await mergeImageWithException(
        exceptions,
        stepLayer,
        filteredLayers
      );
      firstLayer.image = mergedImage.resultingImage;
      firstLayer.exception = getLayerExceptionText(exceptions, firstLayer.name);
      reversedKey = mergedImage.reversedLayerKey;
    } else {
      firstLayer.image = await mergeImages(
        getLayerToCombine(layersToCombine, step - 1),
        stepLayer
      );
    }
  }

  firstLayer.selected = true;

  const layersToShow = [...leftSideLayers, firstLayer, ...rightSideLayers].map(
    (val, index) => ({ ...val, key: `${nanoid()}-${index}` })
  );

  return {
    layersToShow,
    completeLayers: layersWithBlobImages,
    stepLayer,
    combinedLayer: firstLayer,
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

import { getLayersByType } from "lib/firebase/firestore/layers/getLayers";
import { nanoid } from "nanoid";
import { getStepLayers } from "../../utils/getSteps";
import {
  GetAllLayersForCurrentStepReturnValues,
  LayerInBuilder,
} from "../types";
import { checkLayerExceptions } from "./checkLayerExceptions";
import { mergeImages, mergeImageWithException } from "./mergeImages";

export async function getLayersForCurrentStep(
  diff: number,
  currentStep: number,
  selectedLayer: number,
  layersToCombine: LayerInBuilder[],
  step: number,
  selectedLayersOnStep: LayerInBuilder[],
  bodyType: number
): Promise<GetAllLayersForCurrentStepReturnValues> {
  const currentLayerStepType = getStepLayers(currentStep, bodyType);
  const layers = await getLayersByType(currentLayerStepType, bodyType);

  const completeLayers = layers.map((val, index) => ({
    ...val,
    selected: false,
    index,
    key: nanoid(),
    exception: "",
    reverse: false,
  }));

  const layersWithBlobImages = await Promise.all(
    completeLayers.map(async (val) => ({
      ...val,
      image: URL.createObjectURL(await (await fetch(val.image)).blob()),
    }))
  );

  const layersLength = layersWithBlobImages.length;

  const [{ ...firstLayer }] = layersWithBlobImages;

  firstLayer.selected = true;

  const [resultingLayer] = checkLayerExceptions(
    layersToCombine,
    selectedLayersOnStep,
    firstLayer
  );

  if (resultingLayer) {
    const mergedImage = await mergeImageWithException(
      resultingLayer,
      firstLayer,
      selectedLayersOnStep
    );
    firstLayer.image = mergedImage;
    firstLayer.exception = resultingLayer.exception;
  } else {
    firstLayer.image = await mergeImages(layersToCombine[step - 1], firstLayer);
  }

  const layersToShow = [
    ...layersWithBlobImages.slice(
      layersLength - (diff - selectedLayer),
      layersLength
    ),
    firstLayer,
    ...layersWithBlobImages.slice(diff - 1, diff + 1),
  ].map((val, index) => ({ ...val, key: `${nanoid()}-${index}` }));

  return {
    layersToShow,
    completeLayers: layersWithBlobImages,
    stepLayer: layersWithBlobImages[0],
    combinedLayer: firstLayer,
  };
}

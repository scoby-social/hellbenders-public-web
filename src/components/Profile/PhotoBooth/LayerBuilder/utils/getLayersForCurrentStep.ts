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
import { mergeImages } from "./mergeImages";
import { mergeImageWithException } from "./mergeImagesWithException";

export async function getLayersForCurrentStep({
  diff,
  currentStep,
  selectedLayer,
  layersToCombine,
  step,
  selectedLayersOnStep,
  bodyType,
}: GetLayersForCurrentStepParams): Promise<GetAllLayersForCurrentStepReturnValues> {
  const currentLayerStepType = getStepLayers(currentStep, bodyType);
  const layers = await getLayersByType(currentLayerStepType, bodyType);

  const completeLayers = layers.map((val, index) => ({
    ...val,
    selected: false,
    index,
    key: nanoid(),
    exception: "",
    reverse: false,
    skipped: false,
  }));

  const layersWithBlobImages = await Promise.all(
    completeLayers.map(async (val) => ({
      ...val,
      image: URL.createObjectURL(await (await fetch(val.image)).blob()),
    }))
  );

  const [stepLayer] = layersWithBlobImages;

  const layersLength = layersWithBlobImages.length;

  const [{ ...firstLayer }] = layersWithBlobImages;

  firstLayer.selected = true;

  const filteredLayers = getFilteredLayers(step, selectedLayersOnStep);

  const exceptions = checkLayerExceptions(filteredLayers, firstLayer);
  let reversedKey: string | null = null;

  if (exceptions.length > 0) {
    const mergedImage = await mergeImageWithException(
      exceptions,
      firstLayer,
      filteredLayers
    );
    firstLayer.image = mergedImage.resultingImage;
    firstLayer.exception = getLayerExceptionText(exceptions, firstLayer.name);
    reversedKey = mergedImage.reversedLayerKey;
  } else {
    firstLayer.image = await mergeImages(
      getLayerToCombine(layersToCombine, step - 1),
      firstLayer
    );
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

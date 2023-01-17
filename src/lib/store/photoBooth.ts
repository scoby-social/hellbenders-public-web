import { atom } from "jotai";
import { LayerType } from "lib/models/layer";
import { LayerInBuilder } from "components/Profile/PhotoBooth/LayerBuilder/types";
import { getIterableSteps } from "components/Profile/PhotoBooth/utils/getSteps";

export const photoBoothStep = atom<number>(0);

export const allStepLayers = atom<LayerInBuilder[]>([]);
export const combinedLayers = atom<LayerInBuilder[]>([]);
export const selectedLayerPerStep = atom<LayerInBuilder[]>([]);
export const selectedLayerIndexPerStep = atom<number[]>([
  ...getIterableSteps().map(() => 0),
]);
export const renderedSteps = atom<boolean[]>([
  ...getIterableSteps().map(() => false),
]);

export const mergeInProcess = atom<boolean>(false);
export const selectedBodyType = atom<number>(0); // 0 for male, 1 for female
export const layerType = atom<LayerType>(LayerType.BACKGROUND);

export const finalCroppedImage = atom<string | null>(null);

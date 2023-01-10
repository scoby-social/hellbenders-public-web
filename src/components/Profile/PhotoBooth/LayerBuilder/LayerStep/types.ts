import { LayerInBuilder } from "../types";

export interface LayerStepProps {
  step: number;
}

export interface GetLayersForCurrentStepParams {
  diff: number;
  currentStep: number;
  selectedLayer: number;
  layersToCombine: LayerInBuilder[];
  step: number;
  selectedLayersOnStep: LayerInBuilder[];
  bodyType: number;
}

export interface ScrollPhotoBoothLayersParams {
  diff: number;
  layerIndex: number;
  allStepLayers: LayerInBuilder[];
  layersToCombine: LayerInBuilder[];
  step: number;
  selectedLayersOnStep: LayerInBuilder[];
}

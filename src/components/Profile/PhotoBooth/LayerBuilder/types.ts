import { Layer } from "lib/models/layer";

export interface LayerInBuilder extends Layer {
  index: number;
  selected: boolean;
  key: string;
  exception: string;
  reverse: boolean;
  skipped: boolean;
  swapWith?: string;
}

export interface ScrollPhotoBoothReturnValues {
  layersToShow: LayerInBuilder[];
  combinedLayer: LayerInBuilder;
  stepLayer: LayerInBuilder;
  reversedKey: string | null;
}

export interface GetAllLayersForCurrentStepReturnValues {
  layersToShow: LayerInBuilder[];
  completeLayers: LayerInBuilder[];
  combinedLayer: LayerInBuilder;
  stepLayer: LayerInBuilder;
  reversedKey: string | null;
}

export interface MergeImageWithExceptionReturnValues {
  resultingImage: string;
  reversedLayerKey: string | null;
}

import { LayerType } from "lib/models/layer";
import { LayerInBuilder } from "../types";

const standardTraitTypes = [LayerType.EYES, LayerType.MOUTH];

export function getStandardTraitLayer(
  layers: LayerInBuilder[],
  currentType: LayerType
): LayerInBuilder {
  const layer = layers[layers.length - 1];

  return {
    ...layer,
    selected: false,
    standard: true,
    type: currentType,
    name: getStandardName(currentType),
  };
}

function getStandardName(layerType: LayerType): string {
  if (layerType.toString().split("_").length > 1) {
    const splittedLayers = layerType.toString().split("_");
    const layerInLowerCase = splittedLayers[1].toLowerCase().substring(1);
    const firstLayerLetter = splittedLayers[1].charAt(0);

    return `No ${firstLayerLetter}${layerInLowerCase}`;
  }

  const layerInLowerCase = layerType.toString().toLowerCase().substring(1);
  const firstLayerLetter = layerType.toString().charAt(0);

  if (standardTraitTypes.includes(layerType)) {
    return `Standard ${firstLayerLetter}${layerInLowerCase}`;
  }

  return `No ${firstLayerLetter}${layerInLowerCase}`;
}

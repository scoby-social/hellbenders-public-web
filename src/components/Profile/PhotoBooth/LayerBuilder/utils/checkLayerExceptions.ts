import { Exception } from "lib/models/layer";
import { LayerInBuilder } from "../types";

export function checkLayerExceptions(
  combinedLayers: LayerInBuilder[],
  selectedLayerPerStep: LayerInBuilder[],
  combiningLayer: LayerInBuilder
): LayerInBuilder[] {
  let incompatibleLayers: LayerInBuilder[] = [];
  combiningLayer.exceptions.forEach((value) => {
    incompatibleLayers = checkExceptionInLayer(
      combiningLayer,
      value,
      selectedLayerPerStep
    );
  });

  return incompatibleLayers;
}

export function checkExceptionInLayer(
  layer: LayerInBuilder,
  exception: Exception,
  layers: LayerInBuilder[]
): LayerInBuilder[] {
  const exceptionLayers: LayerInBuilder[] = [];

  if (Array.isArray(exception.items)) {
    exception.items.forEach((exceptionName) => {
      let matchingString = "";

      if (exceptionName.includes("*")) {
        matchingString = exceptionName.split("*")[1];
      } else {
        matchingString = exceptionName;
      }

      layers.forEach((value) => {
        if (
          value.name.includes(matchingString) &&
          value.type === exception.type
        ) {
          if (exception.reverse) {
            exceptionLayers.push({
              ...value,
              reverse: true,
              swapWith: matchingString,
            });
          } else {
            exceptionLayers.push({
              ...value,
              exception: `The garb you picked doesn't fit with your ${matchingString}. If you want to wear it anyway, you'll have to take off ${
                layer.name.split(".")[0]
              }`,
            });
          }
        }
      });
    });
  } else {
    layers.forEach((value) => {
      if (value.type === exception.type) {
        exceptionLayers.push({
          ...value,
          exception: `The garb you picked doesn't fit with your ${
            value.name
          }. If you want to wear it anyway, you'll have to take off ${
            layer.name.split(".")[0]
          }`,
        });
      }
    });
  }

  return exceptionLayers;
}

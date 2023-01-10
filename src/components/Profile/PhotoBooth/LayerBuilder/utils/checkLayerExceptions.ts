import { Exception } from "lib/models/layer";
import { LayerInBuilder } from "../types";

export function checkLayerExceptions(
  selectedLayerPerStep: LayerInBuilder[],
  combiningLayer: LayerInBuilder
): Array<LayerInBuilder | null> {
  let incompatibleLayers: Array<LayerInBuilder | null> = [];
  combiningLayer.exceptions.forEach((value) => {
    incompatibleLayers.push(checkExceptionInLayer(value, selectedLayerPerStep));
  });

  return incompatibleLayers;
}

function checkExceptionInLayer(
  exception: Exception,
  layers: LayerInBuilder[]
): LayerInBuilder | null {
  let exceptionLayer: LayerInBuilder | null = null;

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
            exceptionLayer = {
              ...value,
              reverse: true,
              swapWith: matchingString,
            };
          } else {
            exceptionLayer = {
              ...value,
            };
          }
        }
      });
    });
  } else {
    layers.forEach((value) => {
      if (value.type === exception.type) {
        exceptionLayer = {
          ...value,
        };
      }
    });
  }

  return exceptionLayer;
}

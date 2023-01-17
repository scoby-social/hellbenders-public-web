import { Exception } from "lib/models/layer";
import { LayerInBuilder } from "../types";
import { filterLayersToCheckNewExceptions } from "./filterLayersToCheckNewExceptions";

export function checkLayerExceptions(
  selectedLayerPerStep: LayerInBuilder[],
  combiningLayer: LayerInBuilder
): Array<LayerInBuilder | null> {
  if (combiningLayer.standard) return [];

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

  console.info("Got layers to check exceptions: ", layers);
  const filteredLayers = [...layers];
  filterLayersToCheckNewExceptions(filteredLayers);

  if (Array.isArray(exception.items)) {
    exception.items.forEach((exceptionName) => {
      let matchingString = "";

      if (exceptionName.includes("*")) {
        matchingString = exceptionName.split("*")[1];
      } else {
        matchingString = exceptionName;
      }

      filteredLayers.forEach((value) => {
        if (
          value.name.includes(matchingString) &&
          value.type === exception.type &&
          !value.standard
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
    filteredLayers.forEach((value) => {
      if (
        !value.standard &&
        (value.type === exception.type || exception.type === "*")
      ) {
        exceptionLayer = {
          ...value,
          reverse: exception.reverse,
        };
      }
    });
  }

  return exceptionLayer;
}

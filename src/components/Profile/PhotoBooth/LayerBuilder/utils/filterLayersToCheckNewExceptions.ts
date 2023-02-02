import { LayerInBuilder } from "../types";

export function filterLayersToCheckNewExceptions(
  filteredLayers: LayerInBuilder[]
) {
  const allLayers = [...filteredLayers];
  allLayers.forEach((layer, index) => {
    if (layer.exceptions.length === 0) return;

    layer.exceptions.forEach((exception) => {
      if (Array.isArray(exception.items)) {
        exception.items.forEach((exceptionName) => {
          let matchingString = "";

          if (exceptionName.includes("*")) {
            matchingString = exceptionName.split("*")[1];
          } else {
            matchingString = exceptionName;
          }

          for (let i = 0; i < index; i++) {
            if (i > filteredLayers.length - 1) break;

            if (
              filteredLayers[i].name.includes(matchingString) &&
              filteredLayers[i].type === exception.type &&
              !filteredLayers[i].standard
            ) {
              filteredLayers.splice(i, 1);
            }
          }
        });
      } else {
        for (let i = 0; i < index; i++) {
          if (i > filteredLayers.length - 1) break;

          if (
            filteredLayers[i].type === exception.type &&
            !filteredLayers[i].standard
          ) {
            filteredLayers.splice(i, 1);
          }
        }
      }
    });
  });
}

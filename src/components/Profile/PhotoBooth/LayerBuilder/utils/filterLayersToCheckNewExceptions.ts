import { LayerInBuilder } from "../types";

export function filterLayersToCheckNewExceptions(
  filteredLayers: LayerInBuilder[]
) {
  filteredLayers.forEach((layer, index, arr) => {
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
            if (i > arr.length - 1) break;

            if (
              arr[i].name.includes(matchingString) &&
              arr[i].type === exception.type &&
              !arr[i].standard
            ) {
              console.info("Removing array element: ", arr[i]);
              arr.splice(i, 1);
            }
          }
        });
      } else {
        for (let i = 0; i < index; i++) {
          if (i > arr.length - 1) break;

          if (arr[i].type === exception.type && !arr[i].standard) {
            console.info("Removing array element: ", arr[i]);
            arr.splice(i, 1);
          }
        }
      }
    });
  });
}

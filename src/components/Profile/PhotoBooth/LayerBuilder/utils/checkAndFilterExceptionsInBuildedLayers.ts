import { LayerType } from "lib/models/layer";
import { FilterExceptionsReturnValues, LayerInBuilder } from "../types";

export function checkAndFilterExceptionsInBuildedLayers(
  buildedLayers: LayerInBuilder[],
  exceptions: Array<LayerInBuilder | null>
): FilterExceptionsReturnValues {
  const firstLayers: LayerInBuilder[] = [];
  const pendingLayers: LayerInBuilder[] = [];
  const filteredLayers: LayerInBuilder[] = [];
  let reversedLayerKey: string | null = null;

  console.info("Going to check and filter exceptions: ", buildedLayers);

  buildedLayers.forEach((layer) => {
    if (layer.skipped) return;

    if (
      layer.type === LayerType.BACKGROUND ||
      [
        LayerType.MALE_BODY,
        LayerType.FEMALE_BODY,
        LayerType.MALE_SHIRT,
        LayerType.FEMALE_TOP,
      ].includes(layer.type)
    ) {
      firstLayers.push(layer);
      return;
    }

    if (layer.reverse) {
      pendingLayers.push(layer);
      return;
    }

    const hasException = !!exceptions.find((exception) => {
      if (!exception) return false;

      if (exception.reverse && exception.name === layer.name) {
        pendingLayers.push(layer);
        reversedLayerKey = layer.key;
        return true;
      }

      if (exception.name === layer.name) return true;
    });

    if (!hasException) filteredLayers.push(layer);
  });

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
            if (
              arr[i].name.includes(matchingString) &&
              arr[i].type === exception.type
            ) {
              console.info("Removing array element: ", arr[i]);
              arr.splice(i, 1);
            }
          }
        });
      } else {
        for (let i = 0; i < index; i++) {
          console.info("Array and index: ", arr, i);
          if (arr[i].type === exception.type) {
            console.info("Removing array element: ", arr[i]);
            arr.splice(i, 1);
          }
        }
      }
    });
  });

  console.info("Resulting values");
  console.info("First layers: ", firstLayers);
  console.info("Pending layers: ", pendingLayers);
  console.info("Filtered layers: ", filteredLayers);

  return { firstLayers, pendingLayers, filteredLayers, reversedLayerKey };
}

import { LayerType } from "lib/models/layer";
import { FilterExceptionsReturnValues, LayerInBuilder } from "../types";
import { filterLayersToCheckNewExceptions } from "./filterLayersToCheckNewExceptions";

export function checkAndFilterExceptionsInBuildedLayers(
  buildedLayers: LayerInBuilder[],
  exceptions: Array<LayerInBuilder | null>
): FilterExceptionsReturnValues {
  const firstLayers: LayerInBuilder[] = [];
  const pendingLayers: LayerInBuilder[] = [];
  const filteredLayers: LayerInBuilder[] = [];
  let reversedLayerKey: string | null = null;

  buildedLayers.forEach((layer) => {
    if (layer.skipped) return;

    if (
      layer.type === LayerType.BACKGROUND ||
      [LayerType.MALE_BODY, LayerType.FEMALE_BODY].includes(layer.type)
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

    if (
      !hasException &&
      [
        LayerType.FEMALE_JACKET,
        LayerType.MALE_JACKET,
        LayerType.MALE_SHIRT,
        LayerType.FEMALE_TOP,
      ].includes(layer.type)
    ) {
      firstLayers.push(layer);
      return;
    }

    if (!hasException) filteredLayers.push(layer);
  });

  filterLayersToCheckNewExceptions(filteredLayers);

  return { firstLayers, pendingLayers, filteredLayers, reversedLayerKey };
}

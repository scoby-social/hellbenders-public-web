import { LayerInBuilder } from "../types";

export function getLayerExceptionText(
  exceptions: Array<LayerInBuilder | null>,
  selectedLayerName: string
): string {
  const layerNames: string[] = [];

  exceptions.forEach((val) => {
    if (!val) return;
    if (val.reverse) return;
    layerNames.push(val.name.split(".")[0]);
  });

  if (layerNames.length === 0) return "";

  return `The ${
    selectedLayerName.split(".")[0]
  } you picked doesn't fit with your ${layerNames.join(
    ", "
  )}. If you want to wear it anyway, you'll have to take off ${
    selectedLayerName.split(".")[0]
  }`;
}

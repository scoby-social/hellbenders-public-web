import { LayerType } from "lib/models/layer";

const steps = [
  [LayerType.BACKGROUND],
  [LayerType.MEN_BODY, LayerType.WOMEN_BODY],
  [LayerType.HAIR],
  [LayerType.EYE],
  [LayerType.MOUTH],
  [LayerType.BEARD],
  [LayerType.HAT, LayerType.HELMET, LayerType.MASK],
  [LayerType.LASERS],
  [LayerType.MEN_SHIRT, LayerType.WOMEN_TOP],
  [LayerType.MEN_JACKET, LayerType.WOMEN_JACKET],
  [LayerType.ACCESORY],
];

const stepLabel = [
  "Background",
  "Body",
  "Hair",
  "Eyes",
  "Mouth",
  "Beard",
  "Hat",
  "Lasers",
  "Shirt",
  "Jacket",
  "Accessory",
];

const bodyTypeInGender = ["MEN", "WOMEN"];

const iterableForSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function getIterableSteps(): number[] {
  return iterableForSteps;
}

export function getStepLayers(idx: number, bodyType: number): LayerType[] {
  const body = bodyTypeInGender[bodyType];
  return steps[idx].filter(
    (value) =>
      value.toString().split("_")[0] === body ||
      (!value.toString().includes(bodyTypeInGender[1]) &&
        !value.toString().includes(bodyTypeInGender[0]))
  );
}

export function getStepsLength(): number {
  return steps.length - 1;
}

export function getTotalStepsStartingFromOne(): number {
  return steps.length;
}

export function getStepLabel(idx: number): string {
  return stepLabel[idx];
}

import { LayerType } from "lib/models/layer";

const steps = [
  [LayerType.BACKGROUND],
  [LayerType.MALE_BODY, LayerType.FEMALE_BODY],
  [LayerType.HAIR],
  [LayerType.EYES],
  [LayerType.MOUTH],
  [LayerType.BEARD],
  [LayerType.HAT],
  [LayerType.HELMET],
  [LayerType.MASK],
  [LayerType.LASERS],
  [LayerType.MALE_SHIRT, LayerType.FEMALE_TOP],
  [LayerType.MALE_JACKET, LayerType.FEMALE_JACKET],
  [LayerType.ACCESORY],
];

const bodyTypeInGender = ["MALE", "FEMALE"];

const iterableForSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function getIterableSteps(): number[] {
  return iterableForSteps;
}

export function getStepLayers(idx: number, bodyType: number): LayerType[] {
  if (idx > 1) {
    const body = bodyTypeInGender[bodyType];
    return steps[idx].filter(
      (value) =>
        value.toString().split("_")[0] === body ||
        (!value.toString().includes(bodyTypeInGender[1]) &&
          !value.toString().includes(bodyTypeInGender[0]))
    );
  }

  return steps[idx];
}

export function getStepsLength(): number {
  return steps.length - 1;
}

export function getTotalStepsStartingFromOne(): number {
  return steps.length;
}

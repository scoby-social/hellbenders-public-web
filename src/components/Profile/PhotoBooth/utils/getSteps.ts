import { LayerType } from "lib/models/layer";

const steps = [
  [LayerType.BACKGROUND],
  [LayerType.MALE_BODY, LayerType.FEMALE_BODY],
  [LayerType.HAIR],
  [LayerType.EYES],
  [LayerType.MOUTH],
  [LayerType.BEARD],
  [LayerType.HAT, LayerType.HELMET],
  [LayerType.MASK],
  [LayerType.LASERS],
  [LayerType.MALE_SHIRT, LayerType.FEMALE_TOP],
  [LayerType.MALE_JACKET, LayerType.FEMALE_JACKET],
  [LayerType.ACCESORY],
];

const stepLabel = {
  [LayerType.BACKGROUND]: "this Background",
  [LayerType.MALE_BODY]: "this Body",
  [LayerType.FEMALE_BODY]: "this Body",
  [LayerType.ACCESORY]: "this Accesory",
  [LayerType.FEMALE_JACKET]: "this Jacket",
  [LayerType.FEMALE_TOP]: "this Top",
  [LayerType.MALE_JACKET]: "this Jacket",
  [LayerType.MALE_SHIRT]: "this Shirt",
  [LayerType.LASERS]: "these Lasers",
  [LayerType.EYES]: "these Eyes",
  [LayerType.MASK]: "this Mask",
  [LayerType.HELMET]: "this Helmet",
  [LayerType.HAT]: "this Hat",
  [LayerType.HAIR]: "this Hair",
  [LayerType.BEARD]: "this Beard",
  [LayerType.MOUTH]: "this Mouth",
};

const bodyTypeInGender = ["MALE", "FEMALE"];

const iterableForSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const vowels = ["A", "E", "I", "O", "U"];

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

export function getStepLabel(layer: LayerType): string {
  return stepLabel[layer];
}

export function getStepLayerArticle(layer: LayerType): string {
  if (layer.charAt(layer.length - 1) === "S") return "";
  if (vowels.includes(layer.charAt(0))) return "An";

  return "A";
}

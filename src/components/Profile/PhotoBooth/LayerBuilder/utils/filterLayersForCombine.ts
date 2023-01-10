import { LayerInBuilder } from "../types";

export function getFilteredLayers(
  step: number,
  steps: LayerInBuilder[]
): LayerInBuilder[] {
  const shiftedLayers = removeLastStepElementIfMatchesCurrentStep(step, steps);

  return shiftedLayers.filter((val) => !val.skipped);
}

function removeLastStepElementIfMatchesCurrentStep(
  step: number,
  steps: LayerInBuilder[]
): LayerInBuilder[] {
  const shouldRemoveLast = step === steps.length - 1;
  const filteredLayers = shouldRemoveLast ? steps.slice(0, -1) : steps;

  return filteredLayers;
}

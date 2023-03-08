import {
  Checkbox,
  CheckboxProperty,
  Filter,
  FilterBarType,
  FilterValue,
} from "./types";

export const filters: Filter[] = [
  {
    label: "Seniority",
    property: FilterBarType.SENIORITY,
    value: FilterValue.DEACTIVATED,
  },
  {
    label: "Brood Size",
    property: FilterBarType.BROOD,
    value: FilterValue.DEACTIVATED,
  },
  {
    label: "Royalties",
    property: FilterBarType.ROYALTIES,
    value: FilterValue.DEACTIVATED,
  },
];

export const checkBoxes: Checkbox[] = [
  {
    label: "Gen 1",
    property: CheckboxProperty.GEN1,
    checked: true,
  },
  {
    label: "Gen 2",
    property: CheckboxProperty.GEN2,
    checked: true,
  },
  {
    label: "Gen 3",
    property: CheckboxProperty.GEN3,
    checked: true,
  },
  {
    label: "Gen 4",
    property: CheckboxProperty.GEN4,
    checked: true,
  },
];

export const genByIndex: ("gen1" | "gen2" | "gen3" | "gen4")[] = [
  "gen1",
  "gen2",
  "gen3",
  "gen4",
];

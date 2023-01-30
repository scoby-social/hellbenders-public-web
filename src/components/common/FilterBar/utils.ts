import { Filter, FilterBarType, FilterValue } from "./types";

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

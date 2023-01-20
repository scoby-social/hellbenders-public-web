import { Filter, FilterValue } from "./types";

export const filters: Filter[] = [
  {
    label: "Seniority",
    property: "seniority",
    value: FilterValue.DEACTIVATED,
  },
  {
    label: "Brood Size",
    property: "brood",
    value: FilterValue.DEACTIVATED,
  },
  {
    label: "Royalties",
    property: "royalties",
    value: FilterValue.DEACTIVATED,
  },
];

import { atom } from "jotai";

export const searchTextFilter = atom("");
// -1 for DESC, 1 for ASC
export const selectedSortFilter = atom({ name: "seniority", value: -1 });

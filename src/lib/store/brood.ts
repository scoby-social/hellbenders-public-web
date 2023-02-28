import { atom } from "jotai";
import { AllGenerationValues } from "lib/axios/requests/users/types";
import { User } from "lib/models/user";

export const allBroodUsers = atom<User[]>([]);
export const usersByGen = atom<AllGenerationValues>({
  gen1: 0,
  gen2: 0,
  gen3: 0,
  gen4: 0,
});
export const filteredBroodUsers = atom<User[]>([]);
export const broodLoading = atom(false);

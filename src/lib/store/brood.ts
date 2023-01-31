import { atom } from "jotai";
import { AllGenerationValues } from "lib/firebase/firestore/users/types";
import { User } from "lib/models/user";

export const allBroodUsers = atom<User[]>([]);
export const usersByGen = atom<AllGenerationValues>({
  gen1: [],
  gen2: [],
  gen3: [],
  gen4: [],
});
export const filteredBroodUsers = atom<User[]>([]);
export const broodLoading = atom(false);

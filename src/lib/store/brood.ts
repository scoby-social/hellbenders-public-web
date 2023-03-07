import { atom } from "jotai";
import { User } from "lib/models/user";

export const allBroodUsers = atom<User[]>([]);
export const filteredBroodUsers = atom<User[]>([]);
export const broodLoading = atom(false);

export const selectedGenFilter = atom({
  gen1: true,
  gen2: true,
  gen3: true,
  gen4: true,
});

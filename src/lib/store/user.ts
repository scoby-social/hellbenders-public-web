import { atom } from "jotai";
import { User } from "lib/models/user";

export const currentUser = atom<User>({} as User);
export const currentWallet = atom<string>("");
export const selectedLeader = atom<User>({} as User);
export const isLoadingUser = atom<boolean>(false);
export const userHasNoID = atom<boolean>(true);
export const userDeceased = atom<boolean>(false);

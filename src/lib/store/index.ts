import { atom } from "jotai";
import { User } from "lib/models/user";

const currentUser = atom<User>({} as User);
const currentWallet = atom<string>("");
const selectedLeader = atom<User>({} as User);

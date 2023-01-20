import { atom } from "jotai";
import { User } from "lib/models/user";

export const allLeaderboardUsers = atom<User[]>([]);
export const filteredLeaderboardUsers = atom<User[]>([]);
export const leaderboardLoading = atom(false);

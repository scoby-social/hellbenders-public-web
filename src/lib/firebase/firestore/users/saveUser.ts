import client from "lib/firebase/axiosClient";
import { User } from "lib/models/user";

import { getUserByFakeID } from "./getUserByFakeID";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function createUser(
  user: Pick<
    User,
    | "username"
    | "amplifierRole"
    | "superpowerRole"
    | "pronouns"
    | "bio"
    | "wallet"
    | "avatar"
    | "fakeID"
    | "twitterHandle"
    | "discordHandle"
    | "telegramHandle"
  >,
  leaderFakeID: string
): Promise<User> {
  const creatingUser = await getUserByFakeID(user.fakeID);

  if (Object.keys(creatingUser).length > 0)
    throw new Error("This wallet already has a Fake ID!");

  const parentWallet = leaderFakeID;

  const userData = {
    ...user,
    parent: parentWallet,
    brood: 0,
    seniority: 0,
    royalties: 0,
    twitterHandle: user.twitterHandle,
    discordHandle: user.discordHandle,
    avatar: user.avatar,
    deceased: false,
    createdAt: new Date(),
  };

  const result = await client.post<User>(`${BE_URL}/user`, userData);

  return result.data;
}

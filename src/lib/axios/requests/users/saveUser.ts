import client from "lib/axios/axiosClient";
import { User } from "lib/models/user";

import { getUserByFakeID } from "./getUserByFakeID";

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

  const result = await client.post<User>("/user", userData);

  return result.data;
}

import { addDoc, collection } from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { Royalties, User } from "lib/models/user";
import { addRoyaltiesAndBroodToUsers } from "./addRoyaltiesAndBroodToUsers";
import { getSeniorityForUser } from "./getSeniorityForUser";
import { getUserByFakeID } from "./getUserByFakeID";
import { collectionName } from "./userCollectionName";

const collectionRef = collection(firestore, collectionName);
const clubhouseFakeID = process.env.NEXT_PUBLIC_CLUBHOUSE_FAKE_ID as string;

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

  const leaderUser = await getUserByFakeID(leaderFakeID);
  const parentWallet = leaderFakeID;
  const grandParent = leaderUser.parent || clubhouseFakeID;
  const grandGrandParent = leaderUser.grandParent || clubhouseFakeID;
  const grandGrandGrandParent = leaderUser.grandGrandParent || clubhouseFakeID;

  const userSeniority = await getSeniorityForUser();

  const userDoc = {
    ...user,
    parent: parentWallet,
    grandParent,
    grandGrandParent,
    grandGrandGrandParent,
    brood: 0,
    seniority: userSeniority,
    royalties: 0,
    twitterHandle: user.twitterHandle,
    discordHandle: user.discordHandle,
    avatar: user.avatar,
    deceased: false,
  };

  const docRef = await addDoc(collectionRef, {
    ...userDoc,
  });

  addRoyaltiesAndBroodToUsers([
    { fakeID: parentWallet, type: Royalties.parent },
    { fakeID: grandParent, type: Royalties.grandParent },
    { fakeID: grandGrandParent, type: Royalties.grandGrandParent },
    { fakeID: grandGrandGrandParent, type: Royalties.grandGrandGrandParent },
    { fakeID: clubhouseFakeID, type: Royalties.commanderSalamander },
  ]);

  return { ...userDoc, id: docRef.id };
}

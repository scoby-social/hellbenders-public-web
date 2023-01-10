import { addDoc, collection } from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { User } from "lib/models/user";
import { getSeniorityForUser } from "./getSeniorityForUser";
import { getUserByWallet } from "./getUsers";
import { collectionName } from "./userCollectionName";

const collectionRef = collection(firestore, collectionName);
const commanderSalamanderWallet = process.env
  .NEXT_PUBLIC_COMMANDER_SALAMANDER_WALLET as string;

export async function createUser(
  user: Pick<
    User,
    | "username"
    | "amplifier_role"
    | "superpower_role"
    | "pronouns"
    | "bio"
    | "externalLink"
    | "wallet"
    | "avatar"
    | "fakeIDs"
  >,
  leaderWallet: string
): Promise<User> {
  const creatingUser = await getUserByWallet(user.wallet);

  if (Object.keys(creatingUser).length > 0)
    throw new Error("This wallet already has a Fake ID!");

  const leaderUser = await getUserByWallet(leaderWallet);
  const parentWallet = leaderWallet;
  const grandParent = leaderUser.parent || commanderSalamanderWallet;
  const grandGrandParent = leaderUser.grandParent || commanderSalamanderWallet;
  const grandGrandGrandParent =
    leaderUser.grandGrandParent || commanderSalamanderWallet;

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
    twitterTokenConnection: "",
    avatar: user.avatar,
  };

  const docRef = await addDoc(collectionRef, {
    ...userDoc,
  });
  return { ...userDoc, id: docRef.id };
}

import { addDoc, collection } from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { Royalties, User } from "lib/models/user";
import { addRoyaltiesAndBroodToUsers } from "./addRoyaltiesAndBroodToUsers";
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
    | "amplifierRole"
    | "superpowerRole"
    | "pronouns"
    | "bio"
    | "wallet"
    | "avatar"
    | "fakeIDs"
    | "twitterHandle"
    | "discordHandle"
    | "telegramHandle"
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
    twitterHandle: user.twitterHandle,
    discordHandle: user.discordHandle,
    avatar: user.avatar,
  };

  const docRef = await addDoc(collectionRef, {
    ...userDoc,
  });

  addRoyaltiesAndBroodToUsers([
    { wallet: parentWallet, type: Royalties.parent },
    { wallet: grandParent, type: Royalties.grandParent },
    { wallet: grandGrandParent, type: Royalties.grandGrandParent },
    { wallet: grandGrandGrandParent, type: Royalties.grandGrandGrandParent },
    { wallet: commanderSalamanderWallet, type: Royalties.commanderSalamander },
  ]);

  return { ...userDoc, id: docRef.id };
}

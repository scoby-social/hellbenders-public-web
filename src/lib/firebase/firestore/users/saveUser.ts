import { addDoc, collection } from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { User } from "lib/models/user";
import { getUserByWallet } from "./getUsers";
import { collectionName } from "./userCollectionName";

const collectionRef = collection(firestore, collectionName);
const commanderSalamanderWallet = process.env
  .NEXT_PUBLIC_COMMANDER_SALAMANDER_WALLET as string;

export async function createUser(
  user: User,
  leaderWallet: string
): Promise<string> {
  const creatingUser = await getUserByWallet(user.wallet);

  if (Object.keys(creatingUser).length > 0)
    throw new Error("This wallet already has a Fake ID!");

  const leaderUser = await getUserByWallet(leaderWallet);
  const parentWallet = leaderWallet;
  const grandParent = leaderUser.parent || commanderSalamanderWallet;
  const grandGrandParent = leaderUser.grandParent || commanderSalamanderWallet;
  const grandGrandGrandParent =
    leaderUser.grandGrandParent || commanderSalamanderWallet;

  const docRef = await addDoc(collectionRef, {
    ...user,
    parent: parentWallet,
    grandParent,
    grandGrandParent,
    grandGrandGrandParent,
  });
  return docRef.id;
}

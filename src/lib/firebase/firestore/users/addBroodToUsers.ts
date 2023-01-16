import { doc, setDoc } from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { User } from "lib/models/user";
import { getUserByWallet } from "./getUsers";
import { collectionName } from "./userCollectionName";

export async function addBroodToUsers(wallets: string[]): Promise<void> {
  wallets.forEach(async (userWallet) => {
    const user = await getUserByWallet(userWallet);

    const reference = doc(firestore, collectionName, user.id);

    const updatedUser = { ...user } as Partial<User>;
    updatedUser.brood! += 1;
    delete updatedUser.id;

    await setDoc(reference, updatedUser);
  });
}

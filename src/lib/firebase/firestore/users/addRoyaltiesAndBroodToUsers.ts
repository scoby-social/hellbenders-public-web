import { Royalties } from "lib/models/user";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { User } from "lib/models/user";
import { getUserByWallet } from "./getUsers";
import { collectionName } from "./userCollectionName";

interface RoyaltyWithWalletParams {
  wallet: string;
  type: Royalties;
}

export async function addRoyaltiesAndBroodToUsers(
  values: RoyaltyWithWalletParams[]
) {
  values.forEach(async (val) => {
    const user = await getUserByWallet(val.wallet);

    const reference = doc(firestore, collectionName, user.id);

    const updatedUser = { ...user } as Partial<User>;
    updatedUser.brood! += 1;
    updatedUser.royalties! += (updatedUser.royalties || 0) + val.type * 6.66;
    delete updatedUser.id;

    await setDoc(reference, updatedUser);
  });
}

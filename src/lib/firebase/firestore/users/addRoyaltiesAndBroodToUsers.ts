import { Royalties } from "lib/models/user";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { User } from "lib/models/user";
import { collectionName } from "./userCollectionName";
import { getUserByFakeID } from "./getUserByFakeID";

interface RoyaltyWithWalletParams {
  fakeID: string;
  type: Royalties;
}

export async function addRoyaltiesAndBroodToUsers(
  values: RoyaltyWithWalletParams[]
) {
  values.forEach(async (val) => {
    const user = await getUserByFakeID(val.fakeID);

    if (!user.id) return;

    const reference = doc(firestore, collectionName, user.id);

    const updatedUser = { ...user } as Partial<User>;
    updatedUser.brood! += 1;
    updatedUser.royalties! += val.type * 6.66;
    delete updatedUser.id;

    await setDoc(reference, updatedUser);
  });
}

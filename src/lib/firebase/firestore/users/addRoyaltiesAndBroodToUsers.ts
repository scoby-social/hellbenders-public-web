import { Royalties } from "lib/models/user";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { User } from "lib/models/user";
import { collectionName } from "./userCollectionName";
import { getUserByFakeID } from "./getUserByFakeID";
import { checkIfFakeIDExists } from "lib/web3/checkIfFakeIDExists";

interface RoyaltyWithWalletParams {
  fakeID: string;
  type: Royalties;
}

const clubhouseFakeID = process.env.NEXT_PUBLIC_CLUBHOUSE_FAKE_ID as string;

export async function addRoyaltiesAndBroodToUsers(
  values: RoyaltyWithWalletParams[]
) {
  values.forEach(async (val) => {
    if (await checkIfFakeIDExists(val.fakeID)) {
      addRoyaltiesToFakeIDUser(val.fakeID, val.type);
    } else {
      addRoyaltiesToFakeIDUser(clubhouseFakeID, val.type);
    }

    addBroodToUser(val.fakeID);
  });
}

async function addRoyaltiesToFakeIDUser(fakeID: string, value: number) {
  const user = await getUserByFakeID(fakeID);

  if (!user.id) return;

  const reference = doc(firestore, collectionName, user.id);

  const updatedUser = { ...user } as Partial<User>;
  updatedUser.royalties! += value * 6.66;
  delete updatedUser.id;

  await setDoc(reference, updatedUser);
}

async function addBroodToUser(fakeID: string) {
  const user = await getUserByFakeID(fakeID);

  if (!user.id) return;

  const reference = doc(firestore, collectionName, user.id);

  const updatedUser = { ...user } as Partial<User>;
  updatedUser.brood! += 1;
  delete updatedUser.id;

  await setDoc(reference, updatedUser);
}

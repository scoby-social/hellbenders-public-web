import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { User } from "lib/models/user";
import { combineUsersFromSnapshot } from "./extractAndCombineUsers";
import { collectionName } from "./userCollectionName";

const converter = {
  toFirestore: (data: User) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    snap.data() as Omit<User, "id">,
};

const usersRef = collection(firestore, collectionName).withConverter(converter);
export async function getUsersThatBelongsToBrood(
  leaderWallet: string
): Promise<User[]> {
  const queryForChildren = query(usersRef, where("parent", "==", leaderWallet));
  const queryForGrandChildren = query(
    usersRef,
    where("grandParent", "==", leaderWallet)
  );
  const queryForGrandGrandChildren = query(
    usersRef,
    where("grandGrandParent", "==", leaderWallet)
  );
  const queryForGrandGrandGrandChildren = query(
    usersRef,
    where("grandGrandGrandParent", "==", leaderWallet)
  );

  const result = await Promise.all([
    getDocs(queryForChildren),
    getDocs(queryForGrandChildren),
    getDocs(queryForGrandGrandChildren),
    getDocs(queryForGrandGrandGrandChildren),
  ]);

  return combineUsersFromSnapshot(result);
}

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

export async function getUserByWallet(wallet: string): Promise<User> {
  const q = query(usersRef, where("wallet", "==", wallet));

  const usersSnapshot = await getDocs(q);
  const queryResult = usersSnapshot.docs.map((value) => ({
    id: value.id,
    ...value.data(),
  }));

  if (queryResult.length === 0) return {} as User;

  const [user] = queryResult;

  return user;
}

export async function getUsersThatBelongsToBrood(
  leaderWallet: string
): Promise<User[]> {
  const queryForChildren = query(usersRef, where("parent", "==", leaderWallet));
  const queryForGrandChildren = query(
    usersRef,
    where("grandChildren", "==", leaderWallet)
  );
  const queryForGrandGrandChildren = query(
    usersRef,
    where("grandGrandChildren", "==", leaderWallet)
  );
  const queryForGrandGrandGrandChildren = query(
    usersRef,
    where("grandGrandGrandChildren", "==", leaderWallet)
  );

  const result = await Promise.all([
    getDocs(queryForChildren),
    getDocs(queryForGrandChildren),
    getDocs(queryForGrandGrandChildren),
    getDocs(queryForGrandGrandGrandChildren),
  ]);

  return combineUsersFromSnapshot(result);
}

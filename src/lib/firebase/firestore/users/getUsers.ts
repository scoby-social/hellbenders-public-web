import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { User } from "lib/models/user";
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

export async function getUserByUsername(username: string): Promise<User> {
  const q = query(usersRef, where("username", "==", username));

  const usersSnapshot = await getDocs(q);
  const queryResult = usersSnapshot.docs.map((value) => ({
    id: value.id,
    ...value.data(),
  }));

  if (queryResult.length === 0) return {} as User;

  const [user] = queryResult;

  return user;
}

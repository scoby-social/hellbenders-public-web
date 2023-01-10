import {
  collection,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
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

export async function getLeaderboardUsers(): Promise<User[]> {
  const q = query(usersRef, orderBy("seniority", "desc"));

  const usersSnapshot = await getDocs(q);
  const queryResult = usersSnapshot.docs.map((value) => ({
    id: value.id,
    ...value.data(),
  }));

  return queryResult;
}

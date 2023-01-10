import {
  collection,
  getDocs,
  limit,
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

export async function getSeniorityForUser(): Promise<number> {
  const q = query(usersRef, orderBy("seniority", "desc"), limit(1));
  const usersSnapshot = await getDocs(q);
  const queryResult = usersSnapshot.docs.map((value) => ({
    id: value.id,
    ...value.data(),
  }));

  if (queryResult.length === 0) return 0;

  const [user] = queryResult;

  return user.seniority + 1;
}

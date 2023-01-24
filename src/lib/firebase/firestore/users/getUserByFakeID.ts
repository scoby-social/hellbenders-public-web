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

export async function getUserByFakeID(fakeIDAddress: string): Promise<User> {
  console.info("Address: ", fakeIDAddress);
  const q = query(
    usersRef,
    where("fakeIDs", "array-contains-any", [fakeIDAddress])
  );

  const usersSnapshot = await getDocs(q);
  const queryResult = usersSnapshot.docs.map((value) => ({
    id: value.id,
    ...value.data(),
  }));

  if (queryResult.length === 0) return {} as User;

  const [user] = queryResult;

  return user;
}

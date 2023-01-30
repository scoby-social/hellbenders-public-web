import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { collectionName } from "./userCollectionName";

export async function markUserAsDiseased(id: string) {
  const docRef = doc(firestore, collectionName, id);

  await updateDoc(docRef, { deceased: true });
}

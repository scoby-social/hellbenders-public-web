import {doc, getDoc} from 'firebase/firestore';
import {User} from 'lib/models/user';
import { firestore } from '../appClient';

export async function getUserByWallet(): User {
  const docRef = doc(firestore, collectionName)
  const documentSnapshot = await getDoc(docRef);
}

export async function getgetUserThatBelongsToBrood: User[] {
  
}

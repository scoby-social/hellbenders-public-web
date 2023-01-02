import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { firestore } from "lib/firebase/appClient";
import { Layer, LayerType } from "lib/models/layer";
import { collectionName } from "./layerCollectionName";

const converter = {
  toFirestore: (data: Layer) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    snap.data() as Omit<Layer, "id">,
};

const layersRef = collection(firestore, collectionName).withConverter(
  converter
);

export async function getAllLayers(): Promise<Layer[]> {
  const q = query(layersRef);
  const layersSnapshot = await getDocs(q);
  const queryResult = layersSnapshot.docs.map((value) => ({ ...value.data() }));

  return queryResult;
}

export async function getLayersByType(
  layerType: LayerType[],
  bodyType: number
): Promise<Layer[]> {
  const q = query(layersRef, where("type", "in", layerType));
  const layersSnapshot = await getDocs(q);
  let queryResult = layersSnapshot.docs.map((value) => ({ ...value.data() }));

  if (bodyType === 0) {
    queryResult = queryResult.filter((val) => !val.name.includes("Long"));
  }

  return queryResult;
}

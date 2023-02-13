import client from "lib/axios/axiosClient";
import { OrderedSelectedLayers } from "./types/orderedSelectedLayers";
import { ResultingLayersURL } from "./types/resultingLayersURL";

export async function uploadImages(
  data: OrderedSelectedLayers
): Promise<ResultingLayersURL> {
  const result = await client.post<ResultingLayersURL>(
    "/images/generate",
    data
  );

  return result.data;
}

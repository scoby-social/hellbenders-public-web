import client from "lib/axios/axiosClient";

import { AllGenerationValues } from "./types";

export async function getBroodCount(
  fakeID: string
): Promise<AllGenerationValues> {
  const response = await client.get<AllGenerationValues>(
    `/user/total-brood?fakeID=${fakeID}`
  );

  return response.data;
}

import client from "lib/axios/axiosClient";

import { AllGenerationValues } from "./types";

export async function getBroodTotalCount(
  fakeID: string
): Promise<AllGenerationValues> {
  const result = await client.get<AllGenerationValues>(
    `/user/total-brood?fakeID=${fakeID}`
  );

  return result.data;
}

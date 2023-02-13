import client from "lib/axios/axiosClient";
import { GetUsersThatBelongsToBroodReturnValues } from "./types";

export async function getUsersThatBelongsToBrood(
  leaderWallet: string
): Promise<GetUsersThatBelongsToBroodReturnValues> {
  const result = await client.get<GetUsersThatBelongsToBroodReturnValues>(
    `/user/brood?fakeID=${leaderWallet}`
  );

  return result.data;
}

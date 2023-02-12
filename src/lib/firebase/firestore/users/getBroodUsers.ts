import client from "lib/firebase/axiosClient";
import { GetUsersThatBelongsToBroodReturnValues } from "./types";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function getUsersThatBelongsToBrood(
  leaderWallet: string
): Promise<GetUsersThatBelongsToBroodReturnValues> {
  const result = await client.get<GetUsersThatBelongsToBroodReturnValues>(
    `${BE_URL}/user/brood?fakeID=${leaderWallet}`
  );

  return result.data;
}

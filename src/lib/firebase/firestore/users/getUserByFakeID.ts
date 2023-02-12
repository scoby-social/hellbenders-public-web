import { User } from "lib/models/user";
import client from "lib/firebase/axiosClient";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function getUserByFakeID(fakeIDAddress: string): Promise<User> {
  const result = await client.get<User>(
    `${BE_URL}/user?fakeID=${fakeIDAddress}`
  );

  return result.data;
}

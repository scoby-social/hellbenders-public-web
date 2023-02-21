import { User } from "lib/models/user";
import client from "lib/axios/axiosClient";

export async function getUserByFakeID(fakeIDAddress: string): Promise<User> {
  const result = await client.get<User>(`/user?fakeID=${fakeIDAddress}`);

  return result.data;
}

import { User } from "lib/models/user";
import client from "lib/axios/axiosClient";

export async function getUserByUsername(username: string): Promise<User> {
  const response = await client.get<User>(`/user?username=${username}`);

  return response.data;
}

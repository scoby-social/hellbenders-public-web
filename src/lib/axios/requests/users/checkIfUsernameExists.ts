import { User } from "lib/models/user";
import client from "lib/axios/axiosClient";

export async function checkIfUsernameExists(username: string): Promise<User> {
  const response = await client.get<User>(`/user/exists?username=${username}`);

  return response.data;
}

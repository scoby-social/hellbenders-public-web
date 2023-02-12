import { User } from "lib/models/user";
import client from "lib/firebase/axiosClient";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function getUserByUsername(username: string): Promise<User> {
  const response = await client.get<User>(
    `${BE_URL}/user?username=${username}`
  );

  return response.data;
}

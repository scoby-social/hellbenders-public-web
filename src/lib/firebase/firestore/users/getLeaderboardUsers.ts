import { User } from "lib/models/user";
import client from "lib/firebase/axiosClient";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function getLeaderboardUsers(
  skip = 0,
  count = 0
): Promise<User[]> {
  const result = await client.get<User[]>(
    `${BE_URL}/leaderboard/users?skip=${skip}&count=${count}`
  );

  return result.data;
}

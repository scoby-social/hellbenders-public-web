import { User } from "lib/models/user";
import client from "lib/axios/axiosClient";

export async function getLeaderboardUsers(
  skip = 0,
  limit = 15
): Promise<User[]> {
  const result = await client.get<User[]>(
    `/leaderboard/users?skip=${skip}&limit=${limit}`
  );

  return result.data;
}

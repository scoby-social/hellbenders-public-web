import { User } from "lib/models/user";
import client from "lib/axios/axiosClient";

export async function getLeaderboardUsers(
  skip = 0,
  limit = 15,
  searchText?: string,
  filterProperty?: string,
  filterValue?: number
): Promise<User[]> {
  let url = `/leaderboard/users?skip=${skip}&limit=${limit}`;

  if (searchText) {
    url += `&search=${searchText}`;
  }

  if (filterValue && filterProperty) {
    url += `&filter=${filterProperty}`;
    url += `&order=${filterValue}`;
  }

  const result = await client.get<User[]>(url);

  return result.data;
}

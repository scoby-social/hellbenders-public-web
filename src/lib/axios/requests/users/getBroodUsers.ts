import client from "lib/axios/axiosClient";
import { User } from "lib/models/user";

export async function getUsersThatBelongsToBrood(
  leaderWallet: string,
  skip = 0,
  limit = 15,
  filterProperty?: string,
  filterValue?: number
): Promise<User[]> {
  let url = `/user/brood?fakeID=${leaderWallet}&skip=${skip}&limit=${limit}`;

  if (filterValue && filterProperty) {
    url += `&filter=${filterProperty}`;
    url += `&order=${filterValue}`;
  }

  const result = await client.get<User[]>(url);

  return result.data;
}

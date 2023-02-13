import client from "lib/axios/axiosClient";

export async function markUserAsDiseased(id: string) {
  await client.patch(`/user/mark-deceased?id=${id}`);
}

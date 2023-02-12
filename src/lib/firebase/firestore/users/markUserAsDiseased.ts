import client from "lib/firebase/axiosClient";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function markUserAsDiseased(id: string) {
  await client.patch(`${BE_URL}/user/mark-deceased?id=${id}`);
}

import { Layer } from "lib/models/layer";
import client from "lib/axios/axiosClient";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function getLayersByType(
  currentStep: number,
  bodyType: number
): Promise<Layer[]> {
  const result = await client.get<Layer[]>(
    `${BE_URL}/layers?step=${currentStep}&body=${bodyType}`
  );

  return result.data;
}

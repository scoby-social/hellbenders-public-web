import { getNFTWithMetadata } from "./getNFTWithMetadata";

export async function checkIfFakeIDExists(
  fakeIDAddress: string | undefined
): Promise<boolean> {
  try {
    if (!fakeIDAddress) return false;
    await getNFTWithMetadata(fakeIDAddress);
    return true;
  } catch (_) {
    return false;
  }
}

import { atom } from "jotai";
import { User } from "lib/models/user";
import { LayerInBuilder } from "components/Profile/PhotoBooth/LayerBuilder/types";
import { getIterableSteps } from "components/Profile/PhotoBooth/utils/getSteps";

export const currentUser = atom<User>({} as User);
export const currentWallet = atom<string>("");
export const selectedLeader = atom<User>({} as User);
export const isLoadingUser = atom<boolean>(false);
export const userHasNoID = atom<boolean>(false);

export const photoBoothStep = atom<number>(0);

export const allStepLayers = atom<LayerInBuilder[]>([]);
export const combinedLayers = atom<LayerInBuilder[]>([]);
export const selectedLayerPerStep = atom<LayerInBuilder[]>([]);

export const selectedLayerIndexPerStep = atom<number[]>([
  ...getIterableSteps().map(() => 0),
]);
export const renderedSteps = atom<boolean[]>([
  ...getIterableSteps().map(() => false),
]);

export const mergeInProcess = atom<boolean>(false);

export const selectedBodyType = atom<number>(0); // 0 for male, 1 for female

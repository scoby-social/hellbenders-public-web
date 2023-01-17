import { WalletContextState } from "@solana/wallet-adapter-react";
import { LayerInBuilder } from "components/Profile/PhotoBooth/LayerBuilder/types";
import { PhotoBoothFormInputs } from "components/Profile/PhotoBooth/types";
import { Dispatch, SetStateAction } from "react";

export interface UploadNftParams {
  selectedLayers: Array<LayerInBuilder | null>;
  resultingLayer: LayerInBuilder;
  formResult: PhotoBoothFormInputs;
  leaderWalletAddress: string;
  wallet: WalletContextState;
  parentNftAddress: string;
  seniority: number;
  updateMessage: Dispatch<SetStateAction<string>>;
}

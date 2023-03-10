import { PublicKey } from "@solana/web3.js";

export interface GroupCardProps {
  highlight: boolean;
  title: string;
  supply: number;
  tokensMinted: number;
  imageURL: string;
  available: boolean;
  soldOut: boolean;
  discount: number;
  tokenName: string;
  hasFakeIDDiscount: boolean;
  redlist: PublicKey | null;
}

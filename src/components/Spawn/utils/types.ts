import { PublicKey } from "@solana/web3.js";

export interface Group {
  title: string;
  highlight: boolean;
  supply: number;
  tokensMinted: number;
  imageURL: string;
  soldOut: boolean;
  available: boolean;
  discount: number;
  tokenName: string;
  hasFakeIDDiscount: boolean;
  redlist: PublicKey | null;
}

export interface Groups {
  legendary: Group;
  gold: Group;
  steel: Group;
  black: Group;
  fake: Group;
  open: Group;
}

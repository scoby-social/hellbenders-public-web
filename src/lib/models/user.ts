export enum Pronouns {
  other = "they/them",
  female = "she/her",
  male = "he/him",
}

export enum Royalties {
  parent = 0.2,
  grandParent = 0.1,
  grandGrandParent = 0.07,
  grandGrandGrandParent = 0.03,
  commanderSalamander = 0.6,
}

export interface User {
  id: string;
  username: string; // ID Card name
  amplifierRole: string;
  superpowerRole: string;
  pronouns: Pronouns;
  bio: string;
  wallet: string;
  brood: number;
  seniority: number;
  royalties: number;
  avatar: string;
  parent: string;
  fakeID: string;
  grandParent: string;
  grandGrandParent: string;
  grandGrandGrandParent: string;
  twitterHandle: string;
  discordHandle: string;
  telegramHandle: string;
  deceased: boolean;
  createdAt: string;
}

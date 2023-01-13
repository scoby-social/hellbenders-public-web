export enum Pronouns {
  other = "they/them",
  female = "she/her",
  male = "he/him",
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
  fakeIDs: string[];
  grandParent: string;
  grandGrandParent: string;
  grandGrandGrandParent: string;
  twitterHandle: string;
  discordHandle: string;
  telegramHandle: string;
}

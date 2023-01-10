export enum Pronouns {
  male = "he/him",
  female = "she/her",
  other = "they/them",
}

export interface User {
  id: string;
  username: string; // ID Card name
  amplifier_role: string;
  superpower_role: string;
  pronouns: Pronouns;
  bio: string;
  externalLink: string | undefined;
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
  twitterTokenConnection: string;
}

export enum Pronouns {
  male = "he/him",
  female = "she/her",
  other = "they/them",
}

export interface User {
  id: string;
  username: string; // ID Card name
  role: string;
  pronoun: Pronouns;
  bio: string;
  externalLink: string | undefined;
  wallet: string;
  brood: number;
  seniority: number;
  royalties: number;
  avatar: string;
  parent: string;
  grandParent: string;
  grandGrandParent: string;
  grandGrandGrandParent: string;
  twitterTokenConnection: string;
}

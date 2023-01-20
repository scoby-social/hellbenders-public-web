import { Pronouns } from "lib/models/user";

export interface PhotoBoothFormInputs {
  username: string;
  amplifierRole: string;
  superpowerRole: string;
  pronouns: Pronouns;
  bio: string;
  twitterHandle: string;
  discordHandle: string;
  telegramHandle: string;
}

export interface PhotoBoothFormStyleProps {
  isMobile: boolean;
}

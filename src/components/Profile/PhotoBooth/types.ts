import { Pronouns } from "lib/models/user";

export interface PhotoBoothFormInputs {
  username: string;
  amplifier_role: string;
  superpower_role: string;
  pronouns: Pronouns;
  bio: string;
  externalLink: string;
}

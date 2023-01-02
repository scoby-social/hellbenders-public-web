import { User } from "lib/models/user";

export interface UserCardProps
  extends Omit<
    User,
    | "pronoun"
    | "wallet"
    | "parent"
    | "grandParent"
    | "grandGrandParent"
    | "grandGrandGrandParent"
    | "twitterTokenConnection"
  > {
  isBroodLeader: boolean;
}

import { User } from "lib/models/user";

export interface UserCardProps
  extends Omit<
    User,
    | "role"
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

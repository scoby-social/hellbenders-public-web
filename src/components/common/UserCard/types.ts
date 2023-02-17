import { User } from "lib/models/user";

export interface UserCardProps
  extends Omit<
    User,
    | "pronouns"
    | "wallet"
    | "parent"
    | "grandParent"
    | "grandGrandParent"
    | "grandGrandGrandParent"
    | "twitterTokenConnection"
  > {
  isBroodLeader: boolean;
  isLast?: boolean;
  paginate?: () => void;
}

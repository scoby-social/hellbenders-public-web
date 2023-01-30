import { SetStateAction } from "react";
import { User } from "lib/models/user";

export interface FilterBarProps {
  allUsers: User[];
  setFilteredUsers: (update: SetStateAction<User[]>) => void;
  isProfile?: boolean;
}

export enum FilterValue {
  DEACTIVATED,
  ASC,
  DESC,
}

export enum FilterBarType {
  SENIORITY = "seniority",
  BROOD = "brood",
  ROYALTIES = "royalties",
}

export interface Filter {
  label: string;
  property: FilterBarType;
  value: FilterValue;
}

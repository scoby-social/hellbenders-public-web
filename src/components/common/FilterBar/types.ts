import { SetStateAction } from "react";
import { User } from "lib/models/user";

export interface FilterBarProps {
  allUsers: User[];
  setFilteredUsers: (update: SetStateAction<User[]>) => void;
}

export enum FilterValue {
  DEACTIVATED,
  ASC,
  DESC,
}

export interface Filter {
  label: string;
  property: string;
  value: FilterValue;
}

import { SetStateAction } from "react";
import { User } from "lib/models/user";

export interface FilterBarProps {
  allUsers: User[];
  setFilteredUsers: (update: SetStateAction<User[]>) => void;
  isProfile?: boolean;
}

export enum FilterValue {
  DEACTIVATED = 0,
  ASC = 1,
  DESC = -1,
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

export enum CheckboxProperty {
  GEN1 = "gen1",
  GEN2 = "gen2",
  GEN3 = "gen3",
  GEN4 = "gen4",
}

export interface Checkbox {
  label: string;
  property: CheckboxProperty;
  checked: boolean;
}

import { User } from "lib/models/user";

export interface AllGenerationValues {
  gen1: User[];
  gen2: User[];
  gen3: User[];
  gen4: User[];
}

export interface GetUsersThatBelongsToBroodReturnValues
  extends AllGenerationValues {}

export interface CombineUsersFromSnapshotReturnValues
  extends AllGenerationValues {}

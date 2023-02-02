import { QuerySnapshot } from "firebase/firestore";
import { User } from "lib/models/user";
import { CombineUsersFromSnapshotReturnValues } from "./types";

function extractUsersFromSnapshot(
  snapshot: QuerySnapshot<Omit<User, "id">>
): User[] {
  return snapshot.docs.map((value) => ({ id: value.id, ...value.data() }));
}

export function combineUsersFromSnapshot(
  snapshots: QuerySnapshot<Omit<User, "id">>[]
): CombineUsersFromSnapshotReturnValues {
  const [firstUsers, secondUsers, thirdUsers, fourthUsers] = snapshots.map(
    (snapshot) => extractUsersFromSnapshot(snapshot)
  );

  return {
    gen1: firstUsers,
    gen2: secondUsers,
    gen3: thirdUsers,
    gen4: fourthUsers,
  };
}

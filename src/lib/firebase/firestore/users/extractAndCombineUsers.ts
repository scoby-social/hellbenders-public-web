import { QuerySnapshot } from "firebase/firestore";
import { User } from "lib/models/user";

function extractUsersFromSnapshot(
  snapshot: QuerySnapshot<Omit<User, "id">>
): User[] {
  return snapshot.docs.map((value) => ({ id: value.id, ...value.data() }));
}

export function combineUsersFromSnapshot(
  snapshots: QuerySnapshot<Omit<User, "id">>[]
): User[] {
  const [firstUsers, secondUsers, thirdUsers, fourthUsers] = snapshots.map(
    (snapshot) => extractUsersFromSnapshot(snapshot)
  );

  return [...firstUsers, ...secondUsers, ...thirdUsers, ...fourthUsers];
}

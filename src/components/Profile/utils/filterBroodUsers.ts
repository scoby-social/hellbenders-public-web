import { User } from "lib/models/user";

export function filterBroodUsers(users: User[], currentUser: User): User[] {
  const result: User[] = [];
  const usersMap = new Map<string, User>();

  users.forEach((user) => {
    if (user._id !== currentUser._id) {
      usersMap.set(user._id, user);
    }
  });

  usersMap.forEach((value) => {
    result.push(value);
  });

  return result;
}

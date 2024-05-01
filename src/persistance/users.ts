import { User } from "../types/model";
import { Result, ok, err } from "../types/result";

let users: User[] = [];

export const findUser = (name: string): Result<User, string> => {
  const user = users.find((u) => u.name === name);
  if (user) return ok(user);
  return err("User not found");
};

export const newUser = (
  name: string,
  hashed_password: string
): Result<number, string> => {
  if (findUser(name).isOk()) return err("User already exists");

  const id = users.length;
  const user: User = { id, name, hashed_password };
  users.push(user);

  console.log(users);

  return ok(id);
};

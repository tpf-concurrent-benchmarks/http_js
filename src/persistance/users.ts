import { User } from "../types/model";
import { Result, ok, err } from "../types/result";

let users: { [name: string]: User } = {};

export const userIdExists = (id: number): boolean => {
  return Object.values(users).some((user) => user.id === id);
};

export const getUser = (name: string): Result<User, string> => {
  const user = users[name];
  if (user) return ok(user);
  return err("User not found");
};

export const newUser = (
  name: string,
  hashed_password: string
): Result<number, string> => {
  if (getUser(name).isOk()) return err("User already exists");

  const id = Object.keys(users).length + 1;
  const user: User = { id, name, hashed_password };
  users[name] = user;

  return ok(id);
};

import { User } from "../db/models";
import createHttpError from "http-errors";

export const getUser = (name: string): Promise<User> =>
  User.findOne({ where: { user_name: name } }).then((user) => {
    if (!user) throw createHttpError(404, "User does not exist");

    return user;
  });

export const newUser = async (
  name: string,
  hashed_password: string
): Promise<User> =>
  new User({ user_name: name, hashed_password }).save().catch((error) => {
    if (error.name === "SequelizeUniqueConstraintError")
      throw createHttpError(409, "User already exists");

    if (error.name === "SequelizeValidationError")
      throw createHttpError(400, error.errors[0].message);

    throw createHttpError(500, "Error creating user");
  });

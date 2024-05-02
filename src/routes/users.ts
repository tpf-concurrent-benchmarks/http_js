import { Request, Response, NextFunction } from "express";
import { newUser, getUser } from "../persistance/users";
import { hashPassword, comparePasswords } from "../utils/auth";
import { validateParams } from "../middlewares/validateParams";
import createHttpError from "http-errors";

export const validateUserParams = validateParams(["username", "password"]);

export const newUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const hashed_password = await hashPassword(password);

  const result = newUser(username, hashed_password);

  if (result.isErr()) return next(createHttpError(403, result.error));

  const jwt = req.app.get("jwt").sign({ id: result.value, name: username });

  res.send(jwt);
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const userResult = getUser(username);
  if (userResult.isErr())
    return next(createHttpError(404, "User does not exist"));

  const user = userResult.value;

  if (!(await comparePasswords(password, user.hashed_password)))
    return next(createHttpError(401, "Invalid credentials"));

  const jwt = req.app.get("jwt").sign({ id: user.id, name: username });

  res.send(jwt);
};
import { Request, Response, NextFunction } from "express";
import { getUser } from "../persistance/users";
import createHttpError from "http-errors";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwt = req.headers.authorization;

  if (!jwt) {
    return next(createHttpError(401, "Unauthorized"));
  }

  const user: any = req.app.get("jwt").verify(jwt);

  if (!user?.id || typeof user.id != "number")
    return next(createHttpError(401, "Unauthorized"));

  if (!user.name || typeof user.name != "string")
    return next(createHttpError(401, "Unauthorized"));

  if (getUser(user.name).isErr()) {
    return next(createHttpError(401, "Unauthorized"));
  }

  req.locals = { userId: user.id };
  next();
};

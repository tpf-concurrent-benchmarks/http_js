import { Request, Response, NextFunction } from "express";
import { getUser } from "../persistance/users";
import createHttpError from "http-errors";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (!auth || typeof auth !== `string`)
    return next(createHttpError(401, "Missing Authorization Header"));

  const [type, jwt] = auth.split(" ");

  if (type !== "Bearer" || !jwt)
    return next(createHttpError(401, "Invalid Authorization Header"));

  const user: any = req.app.get("jwt").verify(jwt);
  const invalidUserId = !user?.id || typeof user.id != "number";
  const invalidUserName = !user.name || typeof user.name != "string";

  if (invalidUserId || invalidUserName)
    return next(createHttpError(401, "Invalid JWT"));

  if (getUser(user.name).isErr()) {
    return next(createHttpError(404, "User does not exist"));
  }

  req.locals = { userId: user.id };
  next();
};

import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const validateParams =
  (params: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const missingParams = params.filter((param) => !req.body[param]);

    if (missingParams.length) {
      return next(
        createHttpError(400, `Missing parameters: ${missingParams.join(", ")}`)
      );
    }

    next();
  };

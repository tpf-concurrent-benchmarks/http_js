import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send("Unknown Server Error");
  }
};

import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

const isJsonError = (err: any) =>
  err instanceof SyntaxError &&
  "status" in err &&
  err.status === 400 &&
  "body" in err;

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send(err.message);
  } else if (isJsonError(err)) {
    res.status(400).send("Invalid JSON");
  } else {
    console.error(err);
    res.status(500).send("Unknown Server Error");
  }
};

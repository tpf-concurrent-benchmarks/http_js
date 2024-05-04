import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { fromError } from "zod-validation-error";

type zN = z.ZodObject<any, any>;

const reqError = (part: string, error: z.ZodError<any>) =>
  createHttpError(400, `Request ${part}: ${fromError(error)}`);

type ReqParams = { body?: zN; params?: zN; query?: zN };
export const validateParams =
  (reqParams: ReqParams) =>
  (req: Request, res: Response, next: NextFunction) => {
    const bodySchema = reqParams.body;
    if (bodySchema) {
      const body = bodySchema.safeParse(req.body);
      if (body.error) return next(reqError("Body", body.error));
      req.body = body.data;
    }

    const paramsSchema = reqParams.params;
    if (paramsSchema) {
      const params = paramsSchema.safeParse(req.params);
      if (params.error) return next(reqError("Params", params.error));
      req.params = params.data;
    }

    const querySchema = reqParams.query;
    if (querySchema) {
      const query = querySchema.safeParse(req.query);
      if (query.error) return next(reqError("Query", query.error));
      req.query = query.data;
    }

    next();
  };

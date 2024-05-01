import { Request, Response, NextFunction } from "express";
import { JWTSigner } from "../utils/auth";

export const storeJWT =
  (jwt: JWTSigner) => (req: Request, res: Response, next: NextFunction) => {
    req.jwt = jwt;
    next();
  };

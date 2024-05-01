import express from "express";
import { JWTSigner } from "../../utils/auth";

declare global {
  namespace Express {
    interface Request {
      jwt: JWTSigner;
    }
  }
}

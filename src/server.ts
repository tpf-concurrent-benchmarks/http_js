import express from "express";
import {
  validateUserParams,
  newUserHandler,
  loginHandler,
} from "./routes/users";
import { JWTSigner } from "./utils/auth";
import { errorHandler } from "./middlewares/errorHandler";
import { storeJWT } from "./middlewares/localStore";

const server = express();
const jwt = new JWTSigner("keys/private.key");

server.use(express.json());
server.use(storeJWT(jwt));

server.post("/users", validateUserParams, newUserHandler);
server.post("/login", validateUserParams, loginHandler);

server.use(errorHandler);

export default server;

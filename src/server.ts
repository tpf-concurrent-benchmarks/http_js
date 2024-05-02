import express from "express";
import { validateUserParams } from "./routes/users";
import { newUserHandler, loginHandler } from "./routes/users";
import { JWTSigner } from "./utils/auth";
import pollsRouter from "./routes/pollsRouter";
import { errorHandler } from "./middlewares/errorHandler";

const server = express();
const jwt = new JWTSigner("keys/private.key");

server.set("jwt", jwt);
server.use(express.json());

server.post("/users", validateUserParams, newUserHandler);
server.post("/login", validateUserParams, loginHandler);

server.use(pollsRouter);

server.use(errorHandler);

export default server;

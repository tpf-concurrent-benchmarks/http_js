import express from "express";
import { authenticate, initialize as initializeDB } from "./db";
import { JWTSigner } from "./utils/auth";
import usersRouter from "./routes/usersRouter";
import pollsRouter from "./routes/pollsRouter";
import { errorHandler } from "./middlewares/errorHandler";

initializeDB();

const server = express();
const jwt = new JWTSigner("keys/private.key");

server.set("jwt", jwt);
server.use(express.json());

server.use(usersRouter);
server.use(pollsRouter);

server.use(errorHandler);

export default server;

import express from "express";
import { initialize as initializeDB } from "./db";
import { JWTSigner } from "./utils/auth";
import usersRouter from "./routes/usersRouter";
import pollsRouter from "./routes/pollsRouter";
import { errorHandler } from "./middlewares/errorHandler";
import { randomUUID } from "crypto";

const { SECRET_KEY, SECRET_ALGORITHM } = process.env;

initializeDB();

const server = express();
const jwt = new JWTSigner(SECRET_KEY || randomUUID(), SECRET_ALGORITHM);

server.set("jwt", jwt);
server.use(express.json());

server.use("/api", usersRouter);
server.use("/api", pollsRouter);

server.use(errorHandler);

export default server;

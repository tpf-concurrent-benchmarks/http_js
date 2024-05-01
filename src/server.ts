import express from "express";
import {
  validateUserParams,
  newUserHandler,
  loginHandler,
} from "./routes/users";
import { errorHandler } from "./middlewares/errorHandler";

const server = express();

server.use(express.json());

server.post("/users", validateUserParams, newUserHandler);
server.post("/login", validateUserParams, loginHandler);

server.use(errorHandler);

export default server;

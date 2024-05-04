import { validateUserParams } from "./users";
import { newUserHandler, loginHandler } from "./users";
import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/users", validateUserParams, newUserHandler);
usersRouter.post("/login", validateUserParams, loginHandler);

export default usersRouter;

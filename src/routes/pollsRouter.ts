import { validateNewPollParams, newPollHandler } from "./polls";
import { getPollsHandler, voteHandler } from "./polls";
import { getPollHandler, deletePollHandler } from "./polls";
import { authenticateUser } from "../middlewares/auth";
import { Router } from "express";

const pollsRouter = Router();

pollsRouter.use(authenticateUser);

pollsRouter.post("/polls", validateNewPollParams, newPollHandler);
pollsRouter.get("/polls", getPollsHandler);

pollsRouter.get("/polls/:id", getPollHandler);
pollsRouter.delete("/polls/:id", deletePollHandler);

pollsRouter.post("/polls/:poll_id/vote", voteHandler);

export default pollsRouter;

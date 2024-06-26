import { validateNewPollParams, newPollHandler } from "./polls";
import { getPollHandler, deletePollHandler } from "./polls";
import { getPollsHandler, voteHandler } from "./polls";
import { validatePollParams, validateVoteParams } from "./polls";
import { authenticateUser } from "../middlewares/auth";
import { Router } from "express";

const pollsRouter = Router();

pollsRouter.post("/polls", authenticateUser, validateNewPollParams, newPollHandler);
pollsRouter.get("/polls", getPollsHandler);

pollsRouter.get("/polls/:id", validatePollParams, getPollHandler);
pollsRouter.delete("/polls/:id", authenticateUser, validatePollParams, deletePollHandler);

pollsRouter.post("/polls/:poll_id/vote", authenticateUser, validateVoteParams, voteHandler);

export default pollsRouter;

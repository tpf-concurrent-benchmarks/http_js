import { Request, Response, NextFunction } from "express";
import { newPoll, getPolls } from "../persistance/polls";
import { getPoll, deletePoll } from "../persistance/polls";
import { vote } from "../persistance/polls";
import { validateParams } from "../middlewares/validateParams";
import { newPollSchema, NewPollRequest } from "../schemas/polls";
import { pollParamsSchema, PollRequest } from "../schemas/polls";
import { voteParamsSchema, voteQuerySchema } from "../schemas/polls";
import { VoteRequest } from "../schemas/polls";
import { transformGetPollsResults } from "../persistance/transformers";

export const validateNewPollParams = validateParams({ body: newPollSchema });
export const newPollHandler = (
  req: NewPollRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.locals.userId;
  const { poll_topic, options } = req.body;

  newPoll(userId, poll_topic, options)
    .then((poll) => {
      res.send(String(poll.id));
    })
    .catch(next);
};

export const getPollsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getPolls()
    .then((polls) => {
      res.send(transformGetPollsResults(polls));
    })
    .catch(next);
};

export const validatePollParams = validateParams({ params: pollParamsSchema });

export const getPollHandler = (
  req: PollRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  getPoll(id)
    .then((poll) => {
      res.send(poll);
    })
    .catch(next);
};

export const deletePollHandler = (
  req: PollRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = req.locals.userId;
  deletePoll(id, userId)
    .then((poll) => {
      res.send(String(poll.id));
    })
    .catch(next);
};

export const validateVoteParams = validateParams({
  params: voteParamsSchema,
  query: voteQuerySchema,
});

export const voteHandler = (
  req: VoteRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.locals.userId;
  const { poll_id } = req.params;
  const option_id = req.query.option;

  vote(userId, poll_id, option_id)
    .then((vote) => {
      res.send("OK");
    })
    .catch(next);
};

import { Request, Response, NextFunction } from "express";
import { newPoll, getPolls } from "../persistance/polls";
import { getPoll, deletePoll } from "../persistance/polls";
import { vote } from "../persistance/polls";
import { validateParams } from "../middlewares/validateParams";
import { newPollSchema, NewPollRequest } from "../schemas/polls";
import { pollParamsSchema, PollRequest } from "../schemas/polls";
import { voteParamsSchema, voteQuerySchema } from "../schemas/polls";
import { VoteRequest } from "../schemas/polls";
import createHttpError from "http-errors";

export const validateNewPollParams = validateParams({ body: newPollSchema });
export const newPollHandler = (
  req: NewPollRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.locals.userId;
  const { topic, options } = req.body;

  const id = newPoll(userId, topic, options);

  res.send({ id });
};

export const getPollsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const polls = getPolls();
  res.send(polls);
};

export const validatePollParams = validateParams({ params: pollParamsSchema });

export const getPollHandler = (
  req: PollRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const poll = getPoll(id);
  if (poll.isErr()) return next(createHttpError(404, poll.error));
  res.send(poll.value);
};

export const deletePollHandler = (
  req: PollRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = deletePoll(id);
  if (result.isErr()) return next(createHttpError(404, result.error));
  res.send("OK");
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

  const result = vote(userId, poll_id, option_id);

  if (result.isErr()) return next(createHttpError(404, result.error));

  res.send(result.value);
};

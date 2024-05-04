import { Request, Response, NextFunction } from "express";
import { newPoll, getPolls } from "../persistance/polls";
import { getPoll, deletePoll } from "../persistance/polls";
import { vote } from "../persistance/polls";
import { validateParams } from "../middlewares/validateParams";
import createHttpError from "http-errors";
import { parse } from "path";

export const validateNewPollParams = validateParams(["topic", "options"]);
export const newPollHandler = (
  req: Request,
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

export const validatePollParams = validateParams(["id"]);

export const getPollHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const poll = getPoll(parseInt(id));
  if (poll.isErr()) return next(createHttpError(404, poll.error));
  res.send(poll.value);
};

export const deletePollHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = deletePoll(parseInt(id));
  if (result.isErr()) return next(createHttpError(404, result.error));
  res.send("OK");
};

export const validateVoteParams = validateParams(["poll_id", "option_id"]);

export const voteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.locals.userId;
  const { poll_id } = req.params;
  if (typeof req?.query?.option !== "string")
    return next(createHttpError(400, "option must be a string"));
  const option_id = req.query.option;

  const result = vote(userId, parseInt(poll_id), parseInt(option_id));

  if (result.isErr()) return next(createHttpError(404, result.error));

  res.send(result.value);
};

import { z } from "zod";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export const newPollSchema = z.object({
  topic: z.string(),
  options: z.string().array().min(2),
});

export type NewPollRequest = Request<
  {},
  {},
  (typeof newPollSchema)["_input"],
  {}
>;

export const pollParamsSchema = z.object({
  id: z.coerce.number(),
});

export type PollRequest = Request<
  (typeof pollParamsSchema)["_input"] & ParamsDictionary,
  {},
  {},
  {}
>;

export const voteParamsSchema = z.object({
  poll_id: z.coerce.number(),
});

export const voteQuerySchema = z.object({
  option: z.coerce.number(),
});

export type VoteRequest = Request<
  (typeof voteParamsSchema)["_input"] & ParamsDictionary,
  {},
  {},
  (typeof voteQuerySchema)["_input"] & qs.ParsedQs
>;

import sequelize from "../db";
import { Poll, PollOption, Vote } from "../db/models";
import createHttpError from "http-errors";
import { getPollQuery, getPollQueryResults } from "./queries";
import { transformGetPollResults } from "./transformers";

const mapOptions = (options: string[]) =>
  options.map((option_text) => ({ option_text }));
export const newPoll = (
  creator_id: number,
  poll_topic: string,
  options: string[]
): Promise<Poll> =>
  new Poll(
    { creator_id, poll_topic, options: mapOptions(options) },
    { include: [PollOption] }
  )
    .save()
    .then((poll) => {
      if (!poll) throw createHttpError(404, "Poll not found");
      return poll;
    });

export const getPolls = (): Promise<Poll[]> =>
  Poll.findAll().catch((error) => {
    console.log(error.name);
    throw createHttpError(500, "Error getting polls");
  });

export const getPoll = (id: number): Promise<any> =>
  sequelize.query(getPollQuery(id)).then(([results, _metadata]) => {
    if (!results || results.length === 0)
      throw createHttpError(404, "Poll not found");

    return transformGetPollResults(results as getPollQueryResults);
  });

export const deletePoll = (id: number, userId: number): Promise<Poll> =>
  Poll.findByPk(id).then((poll) => {
    if (!poll) throw createHttpError(404, "Poll not found");

    if (poll.creator_id !== userId)
      throw createHttpError(403, "You are not authorized to delete this poll");

    poll.destroy();

    return poll;
  });

const createVote = (user_id: number, poll_id: number, option_id: number) =>
  new Vote({ user_id, poll_id, option_id }).save();

export const vote = (
  user_id: number,
  poll_id: number,
  option_id: number
): Promise<Vote> =>
  Vote.findOne({ where: { user_id, poll_id } }).then((vote) => {
    if (!vote) return createVote(user_id, poll_id, option_id);

    if (vote.option_id === option_id) {
      vote.destroy();
      return vote;
    }

    vote.option_id = option_id;
    return vote.save();
  });

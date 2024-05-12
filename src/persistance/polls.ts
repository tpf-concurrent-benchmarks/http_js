import sequelize from "../db";
import { Poll, PollOption, Vote } from "../db/models";
import createHttpError from "http-errors";
import { getPollQuery, getPollQueryResults } from "./queries";
import { transformGetPollResults } from "./transformers";
import { Transaction } from "sequelize";

const mapOptions = (options: string[]) =>
  options.map((option_text, option_id) => ({ option_id, option_text }));
export const newPoll = async (
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

export const getPolls = async (): Promise<Poll[]> =>
  Poll.findAll().catch((error) => {
    console.log(error.name);
    throw createHttpError(500, "Error getting polls");
  });

export const getPoll = async (id: number): Promise<any> =>
  sequelize.query(getPollQuery(id)).then(([results, _metadata]) => {
    if (!results || results.length === 0)
      throw createHttpError(404, "Poll not found");

    return transformGetPollResults(results as getPollQueryResults);
  });

export const getPollOption = async (
  poll_id: number,
  option_id: number
): Promise<PollOption> =>
  PollOption.findOne({ where: { poll_id, option_id } }).then((option) => {
    if (!option) throw createHttpError(404, "Option not found");
    return option;
  });

export const deletePoll = async (id: number, userId: number): Promise<Poll> =>
  Poll.findByPk(id).then((poll) => {
    if (!poll) throw createHttpError(404, "Poll not found");

    if (poll.creator_id !== userId)
      throw createHttpError(403, "You are not authorized to delete this poll");

    poll.destroy();

    return poll;
  });

const createVote = async (
  user_id: number,
  poll_id: number,
  option_id: number,
  transaction?: Transaction
) => new Vote({ user_id, poll_id, option_id }).save({ transaction });

const safeVote = async (
  user_id: number,
  poll_id: number,
  option_id: number,
  transaction: Transaction
): Promise<Vote> =>
  Vote.findOne({ where: { user_id, poll_id }, transaction }).then((vote) => {
    if (!vote) return createVote(user_id, poll_id, option_id, transaction);

    if (vote.option_id === option_id) {
      vote.destroy({ transaction });
      return vote;
    }

    vote.option_id = option_id;
    return vote.save({ transaction });
  });

export const vote = async (
  user_id: number,
  poll_id: number,
  option_id: number
): Promise<Vote> => {
  const t = await sequelize.transaction();

  await getPollOption(poll_id, option_id);

  return safeVote(user_id, poll_id, option_id, t)
    .then((vote) => {
      t.commit();
      return vote;
    })
    .catch((error) => {
      t.rollback();
      throw error;
    });
};

import { Poll } from "../db/models";
import { getPollQueryResults } from "./queries";

export const transformGetPollResults = (results: getPollQueryResults) => ({
  poll_id: results[0].poll_id,
  poll_topic: results[0].poll_topic,
  options: results.map((result) => ({
    option_id: result.option_id,
    option_text: result.option_text,
    votes: Number(result.votes),
  })),
});

export const transformGetPollsResults = (results: Poll[]) =>
  results.map((poll) => ({
    poll_id: poll.id,
    poll_topic: poll.poll_topic,
  }));

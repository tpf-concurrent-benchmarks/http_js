import { Poll } from "../db/models";
import { getPollQueryResults } from "./queries";

export const transformGetPollResults = (results: getPollQueryResults) => ({
  id: results[0].poll_id,
  title: results[0].poll_topic,
  options: results.map((result) => ({
    option_text: result.option_text,
    votes: Number(result.votes),
  })),
});

export const transformGetPollsResults = (results: Poll[]) => ({
  polls: results.map((poll) => ({
    id: poll.id,
    title: poll.poll_topic,
  })),
});

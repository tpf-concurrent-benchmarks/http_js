import {
  BasePoll,
  BasePollOption,
  PollOption,
  Poll,
  Vote,
} from "../types/model";
import { Result, ok, err } from "../types/result";

let poll_id_counter = 0;
const polls: { [id: number]: BasePoll } = {};
const pollOptions: { [id: number]: BasePollOption[] } = {};
const votes: { [id: number]: { [user_id: number]: number } } = {};

const getVotes = (poll_id: number, option_id: number): Vote[] => {
  const pollVotes = votes[poll_id];
  if (!pollVotes) return [];
  return Object.entries(pollVotes)
    .filter(([, vote]) => vote === option_id)
    .map(
      ([user_id]): Vote => ({
        id: 0,
        user_id: parseInt(user_id),
        poll_option_id: option_id,
      })
    );
};

export const newPoll = (
  creator_id: number,
  topic: string,
  options: string[]
): number => {
  const id = poll_id_counter++;
  const poll: BasePoll = { id, creator_id, topic };
  polls[id] = poll;

  pollOptions[id] = options.map(
    (description, index): BasePollOption => ({
      id: index,
      poll_id: id,
      description,
    })
  );
  return id;
};

export const getPolls = (): BasePoll[] => Object.values(polls);

export const getPoll = (id: number): Result<Poll, string> => {
  if (!polls[id]) return err("Poll not found");

  const options = pollOptions[id].map(
    (option: BasePollOption): PollOption => ({
      ...option,
      votes: getVotes(id, option.id),
    })
  );
  return ok({ ...polls[id], options });
};

export const deletePoll = (id: number): Result<void, string> => {
  if (!polls[id]) return err("Poll not found");

  delete polls[id];
  delete pollOptions[id];
  return ok(undefined);
};

export const vote = (
  user_id: number,
  poll_id: number,
  option_id: number
): Result<string, string> => {
  if (!polls[poll_id]) return err("Poll not found");
  if (!votes[poll_id]) votes[poll_id] = {};

  const previousVote = votes[poll_id][user_id];

  if (previousVote === option_id) {
    delete votes[poll_id][user_id];
    return ok("Vote removed");
  } else {
    votes[poll_id][user_id] = option_id;
    return ok(`Voted for option ${option_id} on poll ${poll_id}`);
  }
};

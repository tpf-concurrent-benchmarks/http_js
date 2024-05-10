export const getPollQuery = (id: number) => `
SELECT "PollOptions".poll_id, poll_topic, "PollOptions".option_id, option_text, COUNT("Votes".user_id) as votes
FROM "Polls" JOIN "PollOptions" ON "Polls".id = "PollOptions".poll_id
LEFT JOIN "Votes" ON "PollOptions".poll_id = "Votes".poll_id
  AND "PollOptions".option_id = "Votes".option_id
WHERE "PollOptions".poll_id=${id}
GROUP BY "PollOptions".poll_id, poll_topic, "PollOptions".option_id, option_text;
`;

export type getPollQueryResults = {
  poll_id: number;
  poll_topic: string;
  option_id: number;
  option_text: string;
  votes: number;
}[];

export interface User {
  id: number;
  name: string;
  hashed_password: string;
}

export interface BasePoll {
  id: number;
  creator_id: number;
  topic: string;
}

export interface BasePollOption {
  id: number;
  poll_id: number;
  description: string;
}

export interface Vote {
  id: number;
  user_id: number;
  poll_option_id: number;
}

export interface PollOption extends BasePollOption {
  votes: Vote[];
}

export interface Poll extends BasePoll {
  options: PollOption[];
}

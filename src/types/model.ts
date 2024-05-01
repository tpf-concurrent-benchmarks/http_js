export interface User {
  id: number;
  name: string;
  hashed_password: string;
}

export interface Poll {
  id: number;
  creator_id: number;
  topic: string;
}

export interface PollOption {
  id: number;
  poll_id: number;
  description: string;
}

export interface Vote {
  id: number;
  user_id: number;
  poll_option_id: number;
}

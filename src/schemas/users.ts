import { z } from "zod";
import { Request } from "express";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserRequest = Request<{}, {}, (typeof userSchema)["_input"], {}>;

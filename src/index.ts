import dotenv from "dotenv";
dotenv.config();

import { makeServer } from "./server";
var cluster = require("express-cluster");

const port = process.env.APP_PORT || 3000;
const processes = process.env.PROCS || 32;

type Worker = { id: number };

cluster(
  async ({ id }: Worker) => {
    try {
      const server = await makeServer();

      server.listen(port, () => {
        console.log(`Running at http://localhost:${port} - Worker ${id}`);
      });
    } catch (error: any) {
      console.error(`Worker ${id} crashed: ${error?.name || error?.message}`);
    }
  },
  { count: processes, respawn: false }
);

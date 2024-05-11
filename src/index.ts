import dotenv from "dotenv";
dotenv.config();

import server from "./server";

const port = process.env.APP_PORT || 3000;

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

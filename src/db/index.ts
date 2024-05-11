import { Sequelize } from "sequelize-typescript";
import models from "./models";

if (!process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_DB)
  throw new Error("DATABASE environment variables are not defined");

const DATABASE = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_DB}`
const sequelize = new Sequelize(DATABASE);

export const initialize = async () => {
  console.log("INITIALIZING DB - IN PROGRESS");
  try {
    sequelize.addModels(models);
    await sequelize.sync();
    console.log("INITIALIZING DB - SUCCESSFUL");
  } catch (error) {
    console.error("INITIALIZING DB - ERROR - ", error);
    throw error;
  }
};

export const authenticate = async () => {
  console.log("AUTHENTICATING DB - IN PROGRESS");
  try {
    await sequelize.authenticate();
    console.log("AUTHENTICATING DB - SUCCESSFUL");
  } catch (error) {
    console.error("AUTHENTICATING DB - ERROR - ", error);
  }
};

export default sequelize;

import { Sequelize } from "sequelize-typescript";
import models from "./models";

const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env;

if (!POSTGRES_USER || !POSTGRES_PASSWORD)
  throw new Error("DATABASE auth variables are not defined");

if (!POSTGRES_HOST || !POSTGRES_PORT || !POSTGRES_DB)
  throw new Error("DATABASE connection variables are not defined");

const DB_AUTH = `${POSTGRES_USER}:${POSTGRES_PASSWORD}`;
const DB_ADDR = `${POSTGRES_HOST}:${POSTGRES_PORT}`;
const DATABASE = `postgres://${DB_AUTH}@${DB_ADDR}/${POSTGRES_DB}`;
const sequelize = new Sequelize(DATABASE, {
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: false,
  },
});

export const initialize = async () => {
  console.log("INITIALIZING DB - IN PROGRESS");
  try {
    await sequelize.addModels(models);
    await sequelize.sync();
    console.log("INITIALIZING DB - SUCCESSFUL");
  } catch (error: any) {
    console.error("INITIALIZING DB - ERROR - ", error?.name, error?.message);
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

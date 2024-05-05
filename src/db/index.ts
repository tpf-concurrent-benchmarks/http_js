import { Sequelize } from "sequelize-typescript";
import models from "./models";

if (!process.env.DATABASE)
  throw new Error("DATABASE environment variable is not defined");

const sequelize = new Sequelize(process.env.DATABASE);

sequelize.addModels(models);

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

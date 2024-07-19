import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(`${process.env.DATA_BASE_URL}`);

const db = async () => {
  try {
    await sequelize.sync({ alter: false, force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default db;

import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  `mysql://upe4h82dw5fvadjz:8kZL4ttg84ycDqS0pkdE@b2np4mpxyz4p4pll113r-mysql.services.clever-cloud.com:3306/b2np4mpxyz4p4pll113r`
);

const db = async () => {
  try {
    await sequelize.sync({ alter: false, force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default db;

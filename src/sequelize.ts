import { Sequelize } from "sequelize";
import { Environment } from "./configs/environment";

// Initialize Sequelize
const sequelize = new Sequelize(
  Environment.DB_NAME,
  Environment.DB_USERNAME,
  Environment.DB_PASSWORD,
  {
    host: Environment.DB_HOST,
    dialect: "mysql",
  }
);

export default sequelize;

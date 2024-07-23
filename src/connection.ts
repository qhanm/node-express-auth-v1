import mysql, { ConnectionOptions } from "mysql2";
import { Environment } from "./configs/environment";

const access: ConnectionOptions = {
  user: Environment.DB_USERNAME,
  database: Environment.DB_NAME,
  password: Environment.DB_PASSWORD,
  port: Environment.DB_PORT,
  host: Environment.DB_HOST,
};

const connection = mysql.createConnection(access);

export default connection;

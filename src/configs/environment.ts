import dotenv from "dotenv";

dotenv.config();

export const Environment = {
  PORT: process.env.PORT,
  DB_PORT: Number(process.env.DB_PORT ?? 3306),
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

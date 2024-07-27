import dotenv from "dotenv";

dotenv.config();

export const Environment = {
  PORT: process.env.PORT,
  DB_PORT: Number(process.env.DB_PORT ?? 3306),
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_USERNAME: process.env.DB_USERNAME ?? "root",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "123456",
  DB_NAME: process.env.DB_NAME ?? "test",

  MAIL_HOST: process.env.MAIL_HOST ?? "smtp.gmail.com",
  MAIL_PORT: Number(process.env.MAIL_PORT) ?? 465,
  MAIL_SECURE: Boolean(process.env.MAIL_SECURE),
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_SERVICE: process.env.MAIL_SERVICE ?? "gmail",
  MAIL_SENDER: process.env.MAIL_SENDER ?? "gmail",
};

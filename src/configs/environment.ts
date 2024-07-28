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

  JWT_SECRET_KEY:
    process.env.JWT_SECRET_KEY ??
    "qdNtVtjOKbC91HDIttDSAbVzzMDxrW3t2XTxtYnBjOhOZCC3s7ZcX0MHJtBp",
  TOKEN_HEADER_KEY:
    process.env.TOKEN_HEADER_KEY ??
    "Ln3SLo7Eti0fEH56n7NjPd4OrhKBjxXjrjT5a6cD39tSy8Rn4q0m4J81fa57",
  JWT_REFRESH_SECRET_KEY:
    process.env.JWT_REFRESH_SECRET_KEY ??
    "7QfBYXAPIt0NbtYmCCZTayqlrwF7x2UiQBHXqYEK8ZFJTHDHuVA2E4q7PB6u",
  JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE ?? "1d",
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE ?? "7d",
};

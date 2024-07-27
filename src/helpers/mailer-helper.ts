import nodemailer from "nodemailer";
import { Environment } from "../configs";

const mailerHelper = nodemailer.createTransport({
  service: Environment.MAIL_SERVICE,
  auth: {
    user: Environment.MAIL_USERNAME,
    pass: Environment.MAIL_PASSWORD,
  },
});

export default mailerHelper;

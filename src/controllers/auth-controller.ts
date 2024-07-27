import { Request, Response } from "express";
import { Environment, StatusCode } from "../configs";
import { sendError, sendSuccess } from "../helpers";
import { HashPasswordHelper } from "../helpers/hash-password-helper";
import transporter from "../helpers/mailer-helper";
import RandomHelper from "../helpers/random-helper";
import RedisService from "../helpers/redis-helper";
import { USER_STATUS, UserModel } from "../models";

const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existedUser = await UserModel.findOne({ where: { email } });
    console.log(existedUser);
    if (existedUser && existedUser.status === USER_STATUS.WAITING_VERIFY) {
      return sendError(
        res,
        "Account already exists, please access your email to verify your account.",
        StatusCode.BAD_REQUEST,
        null
      );
    }

    if (existedUser !== null) {
      return sendError(
        res,
        "The email of user is existed",
        StatusCode.BAD_REQUEST,
        null
      );
    }

    const user = await UserModel.create({
      name,
      email,
      password: await HashPasswordHelper.toPassword(password),
      status: USER_STATUS.WAITING_VERIFY,
    });

    const otp = RandomHelper.number(6);

    await transporter.sendMail({
      from: Environment.MAIL_SENDER,
      to: email,
      subject: "Verify otp",
      html: "Your otp: " + otp,
    });

    // OTP expired 5 minutes
    await RedisService.set("sign-up/otp/" + email, otp, { EX: 60 * 5 });

    return sendSuccess(
      res,
      UserModel.toModel(user),
      "Create user successful",
      StatusCode.CREATED
    );
  } catch (err) {
    return sendError(res, "Internal Server Error");
  }
};

const verifyOtpSignUp = async (req: Request, res: Response) => {
  const { otp, email } = req.body;

  const otpStore = await RedisService.get("sign-up/otp/" + email);
  if (otpStore === null || otp !== otpStore) {
    return sendError(res, "OTP is invalid", StatusCode.BAD_REQUEST);
  }

  const user = await UserModel.findOne({
    where: {
      email,
    },
  });

  if (!user || user?.status !== USER_STATUS.WAITING_VERIFY) {
    return sendError(res, "Verify fail", StatusCode.BAD_REQUEST);
  }

  user.status = USER_STATUS.ACTIVE;
  user.save();
  await RedisService.delete("sign-up/otp/" + email);
  return sendSuccess(res, null, "Verify success");
};

const resendOtpSignUp = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = RandomHelper.number(6);
  await RedisService.set("sign-up/otp/" + email, otp);

  await transporter.sendMail({
    from: Environment.MAIL_SENDER,
    to: email,
    subject: "Verify otp",
    html: "Your otp: " + otp,
  });

  return sendSuccess(res, null, "Send otp success");
};

const AuthController = { signUp, verifyOtpSignUp, resendOtpSignUp };

export default AuthController;

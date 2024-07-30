import { Request, Response } from "express";
import { Environment, ERROR_CODE, StatusCode } from "../configs";
import { GuardHelper, sendError, sendSuccess } from "../helpers";
import { HashPasswordHelper } from "../helpers/hash-password-helper";
import transporter from "../helpers/mailer-helper";
import RandomHelper from "../helpers/random-helper";
import RedisService from "../helpers/redis-helper";
import { USER_STATUS, UserModel } from "../models";

//************************************************************************************************************* */
// Sign Up
const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existedUser = await UserModel.findOne({ where: { email } });

    if (existedUser && existedUser.status === USER_STATUS.WAITING_VERIFY) {
      return sendError(
        res,
        ERROR_CODE.ACCOUNT_ALREADY_EXISTS,
        StatusCode.BAD_REQUEST
      );
    }

    if (existedUser !== null) {
      return sendError(
        res,
        ERROR_CODE.EMAIL_ALREADY_EXISTS,
        StatusCode.BAD_REQUEST
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
    return sendError(res);
  }
};

//************************************************************************************************************* */
// Verify OTP Sign Up
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

//************************************************************************************************************* */
// Resent OTP
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

//************************************************************************************************************* */
// SIGN IN action
const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    where: { email },
  });

  if (
    !user ||
    user.status === USER_STATUS.WAITING_VERIFY ||
    !(await HashPasswordHelper.compare(password, user.password))
  ) {
    return sendError(
      res,
      ERROR_CODE.USER_OR_PASSWORD_INCORRECT,
      StatusCode.BAD_REQUEST
    );
  }

  const accessToken = GuardHelper.createAccessToken(user.id);
  const refreshToken = GuardHelper.createRefreshToken(user.id);

  return sendSuccess(
    res,
    {
      accessToken,
      refreshToken,
      user: UserModel.toModel(user),
    },
    "Login successful",
    StatusCode.OK
  );
};

//************************************************************************************************************* */
// Export
const AuthController = { signUp, verifyOtpSignUp, resendOtpSignUp, signIn };

export default AuthController;

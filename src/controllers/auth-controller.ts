import { Request, Response } from "express";
import validationMiddleware from "../middlewares/validate-body";
import { CreateUserValidator } from "../validators";
import { USER_STATUS, UserModel } from "../models";
import { HashPasswordHelper } from "../helpers/hash-password-helper";
import { sendSuccess } from "../helpers";
import { StatusCode } from "../configs";

const registerUser = async () => {};
const signUp = async (req: Request, res: Response) => {
  await validationMiddleware(CreateUserValidator);

  const { name, email, password } = req.body;
  const user = await UserModel.create({
    name,
    email,
    password: await HashPasswordHelper.toPassword(password),
    status: USER_STATUS.WAITING_VERIFY,
  });

  return sendSuccess(res, user, "Create user successful", StatusCode.CREATED);
};
const AuthController = { signUp };

export default AuthController;

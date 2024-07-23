import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateUserValidator } from "../validators/user/create";
import { validate } from "class-validator";

const registerUser = async () => {};
const signUp = async (req: Request, res: Response) => {
  const validator = plainToClass(CreateUserValidator, req.body);
  const errors = await validate(validator);

  console.log(errors);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  return res.status(200).json({});
};
const AuthController = { signUp };

export default AuthController;

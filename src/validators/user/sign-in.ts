import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInValidator {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

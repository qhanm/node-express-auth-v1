import { IsEmail } from "class-validator";

export class ResendOtpValidator {
  @IsEmail()
  email: string;
}

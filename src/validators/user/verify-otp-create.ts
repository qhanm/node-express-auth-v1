import { IsEmail, IsNotEmpty } from "class-validator";

export class VerifyOtpCreateValidator {
  @IsNotEmpty()
  otp: string;

  @IsEmail()
  email: string;
}

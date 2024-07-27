import { IsEmail, IsNotEmpty } from "class-validator";

export default class VerifyOtpCreateDto {
  @IsNotEmpty()
  otp: string;

  @IsEmail()
  email: string;
}

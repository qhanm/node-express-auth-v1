import express from "express";
import AuthController from "../controllers/auth-controller";
import validationMiddleware from "../middlewares/validate-body";
import {
  CreateUserValidator,
  ResendOtpValidator,
  VerifyOtpCreateValidator,
  SignInValidator,
} from "../validators";

const router = express.Router();

router.post(
  "/sign-in",
  validationMiddleware(SignInValidator),
  AuthController.signIn
);

router.post(
  "/sign-up",
  validationMiddleware(CreateUserValidator),
  AuthController.signUp
);

router.post(
  "/sign-up/verify-otp",
  validationMiddleware(VerifyOtpCreateValidator),
  AuthController.verifyOtpSignUp
);

router.post(
  "sign-up/resend-otp",
  validationMiddleware(ResendOtpValidator),
  AuthController.resendOtpSignUp
);

export default router;

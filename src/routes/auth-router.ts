import express from "express";
import AuthController from "../controllers/auth-controller";
import validationMiddleware from "../middlewares/validate-body";
import { CreateUserValidator } from "../validators/user/create";
import VerifyOtpCreateDto from "../validators/user/verify-otp-create";
const router = express.Router();

router.post("/login", () => {
  console.log("call login");
});

router.post(
  "/sign-up",
  validationMiddleware(CreateUserValidator),
  AuthController.signUp
);

router.post(
  "/sign-up/verify-otp",
  validationMiddleware(VerifyOtpCreateDto),
  AuthController.verifyOtpSignUp
);

export default router;

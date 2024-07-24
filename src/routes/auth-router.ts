import express from "express";
import AuthController from "../controllers/auth-controller";
import validationMiddleware from "../middlewares/validate-body";
import { CreateUserValidator } from "../validators/user/create";
const router = express.Router();

router.post("/login", () => {
  console.log("call login");
});

router.post(
  "/sign-up",
  validationMiddleware(CreateUserValidator),
  AuthController.signUp
);

export default router;

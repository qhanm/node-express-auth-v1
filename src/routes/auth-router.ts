import express from "express";
import AuthController from "../controllers/auth-controller";
const router = express.Router();

router.post("/login", () => {
  console.log("call login");
});

router.post("/sign-up", AuthController.signUp);

export default router;

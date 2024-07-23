import express from "express";
const router = express.Router();

router.post("/login", () => {
  console.log("call login");
});

export default router;

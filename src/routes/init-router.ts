import express from "express";
import InitDbController from "../controllers/init-db-controller";
const router = express.Router();

router.post("/init", InitDbController.init);

export default router;

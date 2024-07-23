import { Express } from "express";

import AuthRouter from "./auth-router";
import InitRouter from "./init-router";

const routes = (app: Express) => {
  app.use("/api/auth", AuthRouter);
  app.use("/", InitRouter);
};

export default routes;

import express, { Express, Request, Response } from "express";
import { Environment } from "./configs/environment";
import routes from "./routes";
import sequelize from "./sequelize";
import RedisService from "./helpers/redis-helper";

const app: Express = express();

const port = Environment.PORT || 5000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  // RedisService.set("test_ket", "namqh", { EX: 10 });
  RedisService.get("test_ket").then((r) => {
    console.log(r);
  });
  res.send("Express + TypeScript Server");
});

routes(app);

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database & tables created!");
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
};

startServer();

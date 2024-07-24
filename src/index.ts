import express, { Express, Request, Response } from "express";
import { Environment } from "./configs/environment";
import routes from "./routes";
import sequelize from "./sequelize";

const app: Express = express();

const port = Environment.PORT || 5000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

routes(app);

// Sync database and start server
const startServer = async () => {
  try {
    await sequelize.sync({ force: true }); // `force: true` will drop and recreate tables, use with caution
    console.log("Database & tables created!");
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
};

startServer();

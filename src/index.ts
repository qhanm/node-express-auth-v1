import express, { Express, Request, Response } from "express";
import { Environment } from "./configs/environment";
import routes from "./routes";
import sequelize from "./sequelize";
import cors from "cors";

const app: Express = express();

const port = Environment.PORT || 5000;
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors());

app.get("/", (req: Request, res: Response) => {
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

import express, { Express, Request, Response } from "express";
import { Environment } from "./configs/environment";
import routes from "./routes";

const app: Express = express();

const port = Environment.PORT || 5000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

routes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

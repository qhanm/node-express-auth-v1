import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Environment } from "../configs";

const authentication = (
  req: Request & { user: any },
  res: Response,
  next: any
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, Environment.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

import { Response } from "express";

export const sendSuccess = (
  res: Response,
  data = {},
  message = "Success",
  statusCode = 200
) => {
  res.status(statusCode).json({
    status: "success",
    statusCode,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message = "An error occurred",
  statusCode = 500,
  errors = {}
) => {
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    errors,
  });
};

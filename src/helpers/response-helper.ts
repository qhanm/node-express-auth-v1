import { Response } from "express";
import { ERROR_CODE } from "../configs";

export const sendSuccess = (
  res: Response,
  data: any = {},
  message = "Success",
  statusCode = 200
) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message = ERROR_CODE.INTERNAL_SERVER_ERROR,
  statusCode = 500,
  errors: any = {}
) => {
  res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};

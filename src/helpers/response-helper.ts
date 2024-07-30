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
    statusCode,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message = "An error occurred",
  statusCode = 500,
  errorCode: any = ERROR_CODE.INTERNAL_SERVER_ERROR,
  errors: any = {}
) => {
  res.status(statusCode).json({
    status: "error",
    message,
    errors,
    errorCode,
  });
};

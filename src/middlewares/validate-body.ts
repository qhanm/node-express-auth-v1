// // src/middleware/validator.middleware.ts

import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../configs";
import { sendError } from "../helpers";

export default function validationMiddleware<T>(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input = plainToClass(type, req.body);
    validate(input).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const messages = errors.map((error) => ({
          [error.property]: Object.values(error?.constraints ?? []).join(", "),
        }));

        sendError(
          res,
          "Validation errors",
          StatusCode.VALIDATION_ERROR,
          messages
        );
      } else {
        req.body = input;
        next();
      }
    });
  };
}

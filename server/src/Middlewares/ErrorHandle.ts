import { NextFunction, Request, Response } from "express";
import { HttpException } from "../HttpExceptions";

export function ErrorHandleMiddleWare(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = error.status ?? 500;
  const message = error.message || "Something went wrong.";

  // returns error status code and message
  return res.status(statusCode).json({
    error: message,
  });
}

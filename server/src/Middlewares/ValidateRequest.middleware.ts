import { error } from "console";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { NotFoundException } from "../HttpExceptions";

/**
 * Use To Validate Post Request Against Schema I Provided
 * @param schema
 * @returns
 */
export function ValidateRequest(schema: Joi.Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log({ data });
    if (!data) {
      return res.status(422).json({ error: "Invalid Request" });
    }
    try {
      await schema.validateAsync(data);
      next();
    } catch (e: any) {
      if (e.isJoi) {
        const errorMessage = e.message.replace(/"/g, "");
        throw new NotFoundException(errorMessage);
      }
    }
  };
}

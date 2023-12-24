import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class ForbiddenException extends HttpException {
  constructor(public message: string) {
    super(StatusCodes.FORBIDDEN, message);
  }
}

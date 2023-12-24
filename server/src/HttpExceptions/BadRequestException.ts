import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class BadRequestException extends HttpException {
  constructor(public message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

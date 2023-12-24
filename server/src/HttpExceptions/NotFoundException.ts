import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  constructor(public message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

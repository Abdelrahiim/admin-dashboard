import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class UnAuthorizedException extends HttpException {
  constructor(public message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

import { Controller, Get } from "../../decorators";
import { Request, Response } from "express";
import { generalService } from "./general.service";
import { StatusCodes } from "http-status-codes";

@Controller("/general")
export class GeneralController {
  @Get("/user/:id")
  async retrieveUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await generalService.findUser(id);
    return res.status(StatusCodes.OK).json(user);
  }
}

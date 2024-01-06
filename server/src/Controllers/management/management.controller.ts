import { Controller, Get } from "../../decorators";
import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { managementService } from "./management.service";

@Controller("/management")
export class ManagementController {
  @Get("/admins")
  /**
   * @route /client/admins
   * @method GET
   * @returns List Of all Admin users
   */
  public async listAdmins(req: Request, res: Response) {
    const admins = await managementService.getAdminUsers();
    return res.status(StatusCodes.OK).json(admins);
  }
}

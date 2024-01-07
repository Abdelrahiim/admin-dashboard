import { Controller, Get } from "../../decorators";
import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { managementService } from "./management.service";

@Controller("/management")
export class ManagementController {
  @Get("/admins")
  /**
   * @route /management/admins
   * @method GET
   * @returns List Of all Admin users
   */
  public async listAdmins(req: Request, res: Response) {
    const admins = await managementService.getAdminUsers();
    return res.status(StatusCodes.OK).json(admins);
  }
  /**
   * @route /performance/:id
   * @returns User With Some Stats attached to it
   */
  @Get("/performance/:id")
  public async retrieveUserPerformance(req: Request, res: Response) {
    const { id } = req.params;
    const performance = await managementService.getUserPerformanceById(id);
    return res.status(StatusCodes.OK).json(performance);
  }
}

import { Controller, Get } from "../../decorators";
import { Request, Response } from "express";
import { salesService } from "./sales.service";
import { StatusCodes } from "http-status-codes";

@Controller("/sales")
export class SalesController {
  @Get()
  public async listSales(req: Request, res: Response) {
    const overallStat = await salesService.getOverAllStat();
    return res.status(StatusCodes.OK).json(overallStat);
  }
}

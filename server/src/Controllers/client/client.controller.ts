import { StatusCodes } from "http-status-codes";
import { Controller, Get } from "../../decorators";
import { Request, Response } from "express";
import { clientService } from "./client.service";

@Controller("/client")
export class ClientController {
  /**
   * @route /client/products
   * @method GET
   * @returns List Of Products That has all the stats
   */
  @Get("/products")
  public async listProducts(req: Request, res: Response) {
    const product = await clientService.getProducts();
    return res.status(StatusCodes.OK).json(product);
  }

  /**
   * @route /client/customer
   * @method GET
   * @returns List Of all Customers
   */
  @Get("/customers")
  public async listCustomers(req: Request, res: Response) {
    const customer = await clientService.getNonAdminUsers();
    return res.status(StatusCodes.OK).json(customer);
  }
}

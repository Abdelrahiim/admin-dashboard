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

  /**
   * @route /client/transactions
   * @method GET
   * @return List Of transactions
   */
  @Get("/transactions")
  public async listTransactions(
    req: Request<
      {},
      {},
      {},
      { page?: number; pageSize?: number; sort?: string; search?: string }
    >,
    res: Response
  ) {
    const {
      page = 1,
      pageSize = 20,
      sort = undefined,
      search = "",
    } = req.query;

    const { total, transactions } = await clientService.getAllTransactions(
      page,
      pageSize,
      search,
      sort
    );
    return res.status(StatusCodes.OK).json({ transactions, total });
  }
  @Get("/geography")
  public async listGeography(req: Request, res: Response) {
    const geography = await clientService.getAllGeography();
    return res.status(StatusCodes.OK).json(geography);
  }
}

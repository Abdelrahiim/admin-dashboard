import { Router } from "express";

import "express-async-errors";

/**
 * class That represents The Single app Router
 */
export class AppRouter {
  private static instance: Router;

  public static getInstance(): Router {
    if (!AppRouter.instance) {
      AppRouter.instance = Router();
    }
    return AppRouter.instance;
  }
}

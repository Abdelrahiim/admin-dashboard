import { Request, Response, NextFunction } from "express";

export function SetCache(req: Request, res: Response, next: NextFunction) {
  const period = 60 * 5;

  if (req.method == "GET") {
    res.set("Cache-control", `public , max-age=${period}`);
  } else {
    res.set("Cache-control", "no-store");
  }
  next();
}

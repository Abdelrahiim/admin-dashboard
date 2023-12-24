import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "../enums";

/**
 *
 * @param middleware
 * @returns Decorator that Sets A Custom middle Method To the EndPoint
 */
export function Use(middleware: RequestHandler) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];
    Reflect.defineMetadata(
      MetadataKeys.Middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}

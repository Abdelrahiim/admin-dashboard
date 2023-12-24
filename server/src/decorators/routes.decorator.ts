import "reflect-metadata";
import { Methods, MetadataKeys } from "../enums";
import { RequestHandler } from "express";

/**
 * Make Sure That Every Method Under HTTP Method Should be of type
 * RequestHandler
 */
interface RequestHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}
/**
 *
 * @param method
 * @returns A decorator factory that Can Create decorator function
 */
function routeBinder(method: Methods) {
  // decorator Factory
  return (path: string = "") => {
    // Decorator function
    return (target: any, key: string, descriptor: RequestHandlerDescriptor) => {
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    };
  };
}

export const Get = routeBinder(Methods.Get);
export const Post = routeBinder(Methods.Post);
export const Put = routeBinder(Methods.Put);
export const Patch = routeBinder(Methods.Patch);
export const Delete = routeBinder(Methods.Delete);

import "reflect-metadata";
import { AppRouter } from "../app.router";
import { Methods } from "../enums/Methods";
import { MetadataKeys } from "../enums";
import Joi from "joi";
import { ValidateRequest } from "../Middlewares/ValidateRequest.middleware";
/**
 * Binds routes for methods within a controller class to a specified route prefix.
 * @param routePrefix - The prefix to be added to all routes defined within the controller.
 * @returns A decorator function to be applied to a controller class.
 */
export function Controller(routePrefix: string = "") {
  const router = AppRouter.getInstance();
  return (target: Function) => {
    for (let key of Object.getOwnPropertyNames(target.prototype)) {
      // Get Descriptor of the Target class from Controller Class
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      const routeHandler = descriptor?.value;

      //  Retrieve Path from Meta Data
      const path = Reflect.getMetadata(
        MetadataKeys.Path,
        target.prototype,
        key
      );
      //  Retrieve Method from Meta Data
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.Method,
        target.prototype,
        key
      );
      // Retrieve All Middlewares From Metadata
      const middlewares =
        Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ||
        [];

      const requiredBodyProps: Joi.Schema = Reflect.getMetadata(
        MetadataKeys.Validator,
        target.prototype,
        key
      );

      if (path || path === "") {
        router[method](
          `${routePrefix}${path}`,
          // Represents all MiddleWare That Been added with Use Decorators
          ...middlewares,
          requiredBodyProps ? ValidateRequest(requiredBodyProps) : [],
          // Represent the Method in Controller Class That allow The Will be Executed
          routeHandler
        );
      }
    }
  };
}

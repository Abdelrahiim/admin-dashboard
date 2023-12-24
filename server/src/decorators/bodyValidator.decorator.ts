import "reflect-metadata";
import { MetadataKeys } from "../enums";
import Joi from "joi";

export function BodyValidator(schema: Joi.Schema) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.Validator, schema, target, key);
  };
}

import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { ProductStatSchema, ProductStat } from "./product-stat.model";

@modelOptions({ schemaOptions: { timestamps: true, collection: "product" } })
export class ProductSchema {
  @prop({ required: true })
  name!: string;
  @prop({ required: true })
  price!: number;
  @prop({ required: true })
  description!: string;
  @prop({ required: true })
  category!: string;
  @prop({ required: true })
  rating!: number;
  @prop({ required: true })
  supply!: number;
}

export const Product = getModelForClass(ProductSchema);

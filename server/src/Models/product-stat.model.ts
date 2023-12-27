import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { ProductSchema } from "./product.model";

/**
 * helper class for represent
 * nested Monthly Data
 */
class MonthlyData {
  @prop()
  month?: string;
  @prop()
  totalSales?: number;
  @prop()
  totalUnits?: number;
}

/**
 * helper class for represent
 * nested Daily Data
 */
class DailyData {
  @prop()
  date?: string;
  @prop()
  totalSales?: number;
  @prop()
  totalUnits?: number;
}

/**
 * Product Stat Collection
 * For nested classes typegoose doesn't work
 * Like mongoose so for nested types we wse
 * helper classes to represent the nested types
 */
@modelOptions({
  schemaOptions: { timestamps: true, collection: "product-stat" },
})
export class ProductStatSchema {
  @prop({ required: true })
  productId!: string;
  @prop()
  yearlySalesTotal?: number;
  @prop()
  yearlyTotalSoldUnits?: number;
  @prop()
  year?: number;
  @prop()
  monthlyData?: MonthlyData[];
  @prop()
  dailyData?: DailyData[];
}

export const ProductStat = getModelForClass(ProductStatSchema);

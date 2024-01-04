import {
  PropType,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { DailyData, MonthlyData } from "./product-stat.model";

@modelOptions({
  schemaOptions: { timestamps: true, collection: "over-all-stats" },
})
class OverallStatSchema {
  @prop()
  totalCustomers?: number;
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
  @prop()
  salesByCategory?: Map<string, number>;
}

export const OverallStat = getModelForClass(OverallStatSchema);

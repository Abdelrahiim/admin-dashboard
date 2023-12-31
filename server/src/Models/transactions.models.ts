import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { Product } from "./product.model";

@modelOptions({
  schemaOptions: { timestamps: true, collection: "transactions" },
})
class TransactionsSchema {
  @prop()
  userId?: string;
  @prop()
  cost?: string;
  @prop({ ref: () => Product })
  products?: Ref<typeof Product>[];
}

export const Transactions = getModelForClass(TransactionsSchema);

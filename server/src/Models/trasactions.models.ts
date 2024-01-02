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
  useId?: string;
  @prop()
  cost?: string;
  @prop({ ref: () => Product })
  public products?: Ref<typeof Product>[];
}

export const Transactions = getModelForClass(TransactionsSchema);

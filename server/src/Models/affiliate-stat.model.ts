import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { Transactions, User } from ".";

@modelOptions({
  schemaOptions: { timestamps: true, collection: "affiliate_stat" },
})
export class AffiliateStatSchema {
  @prop({ ref: () => User })
  userId?: Ref<typeof User>;
  @prop({ ref: () => Transactions })
  affiliateSales?: Ref<typeof Transactions>[];
}

export const AffiliateStat = getModelForClass(AffiliateStatSchema);

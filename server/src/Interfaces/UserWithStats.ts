import { extend } from "joi";
import { AffiliateStatSchema, User, UserSchema } from "../Models";

interface CustomAffiliateStat extends AffiliateStatSchema {
  _id: string;
}

export interface UserWithStats extends UserSchema {
  _id: string;
  affiliateStats: CustomAffiliateStat;
}

import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true, collection: "users" } })
export class UserSchema {
  @prop({ required: true })
  name!: string;
  @prop({ required: true, unique: true })
  email!: string;
  @prop({ required: true })
  password!: string;
  @prop()
  city?: string;
  @prop()
  state?: string;
  @prop()
  country?: string;
  @prop()
  occupation?: string;
  @prop()
  phoneNumber?: string;
  @prop({ type: () => [String] })
  transactions?: string[];
  @prop({ enum: ["user", "admin", "superadmin"], default: "admin" })
  role!: string;
}

export const User = getModelForClass(UserSchema);

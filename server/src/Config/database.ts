import mongoose from "mongoose";
import { greenBright, redBright } from "colorette";
import { MONGO_DB_URL } from "../Utils/settings";

export async function connectMongo() {
  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log(greenBright("MongoDB Server Connected Successfully"));
  } catch (e) {
    console.log(redBright(e as string));
  }
}

// Disconnect From The Database
export async function disconnectMongo() {
  await mongoose.disconnect();
  console.log(redBright("MongoDB Server disconnected Successfully"));
}

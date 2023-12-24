import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT as string;
export const MONGO_DB_URL = process.env.MONGODB_URL as string;

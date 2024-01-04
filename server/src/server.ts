import { blueBright } from "colorette";
import { connectMongo } from "./Config/database";
import { app } from "./app";
import * as http from "http";
import { PORT } from "./Utils/settings";
import {
  dataOverallStat,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataUser,
} from "./data";
import { ProductStat } from "./Models/product-stat.model";
import { Transactions } from "./Models/transactions.models";
import { OverallStat, Product, User } from "./Models";

const server = http.createServer(app);

export async function startServer() {
  // Connect to Database Mongodb
  await connectMongo();
  /**
   * insert Data
   */
  // await User.insertMany(dataUser);
  // await Product.insertMany(dataProduct);
  // await ProductStat.insertMany(dataProductStat);
  // await Transactions.insertMany(dataTransaction);
  // await OverallStat.insertMany(dataOverallStat);

  server.listen(PORT, () => {
    console.log(
      `🚀 Server Running At ${blueBright(`http://localhost:${PORT}`)}`
    );
  });
}

startServer();

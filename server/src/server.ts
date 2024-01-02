import { blueBright } from "colorette";
import { connectMongo } from "./Config/database";
import { app } from "./app";
import * as http from "http";
import { PORT } from "./Utils/settings";
import { dataProductStat, dataTransaction } from "./data";
import { ProductStat } from "./Models/product-stat.model";
import { Transactions } from "./Models/trasactions.models";

const server = http.createServer(app);

export async function startServer() {
  // Connect to Database Mongodb
  await connectMongo();
  /**
   * insert Data
   */
  // await Product.insertMany(dataProduct);
  // await ProductStat.insertMany(dataProductStat);
  // await Transactions.insertMany(dataTransaction);
  server.listen(PORT, () => {
    console.log(
      `🚀 Server Running At ${blueBright(`http://localhost:${PORT}`)}`
    );
  });
}

startServer();

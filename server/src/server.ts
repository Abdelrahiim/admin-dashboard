import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";
import cors from "cors";
import { AppRouter } from "./app.router";
import { ErrorHandleMiddleWare } from "./Middlewares";
import "./Controllers";
import { PORT } from "./Utils/settings";

import { connectMongo } from "./Config/database";
import { blueBright } from "colorette";

const app = express();

// Set up Morgan for logging to a file
const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

// For Security
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// For Logging
app.use(morgan("dev", { stream: accessLogStream }));

// Body and Json Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// for Cors
app.use(cors());

// App Router
app.use(AppRouter.getInstance());

// ----------------------------------------------------------
// Error Handle Middler Ware
// must be the Last One
app.use(ErrorHandleMiddleWare);

async function startServer() {
  await connectMongo();

  // App Listing
  app.listen(PORT, () => {
    console.log("🚀 ~ file: server.ts:46 ~ app.listen ~ PORT:", PORT);
    console.log(
      `🚀 Server Running At ${blueBright(`http://localhost:${PORT}`)}`
    );
  });
}

startServer();

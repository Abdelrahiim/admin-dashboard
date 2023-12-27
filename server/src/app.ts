import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";
import cors from "cors";
import { AppRouter } from "./app.router";
import { ErrorHandleMiddleWare, SetCache } from "./Middlewares";
import "./Controllers";

const app = express();

// Set up Morgan for logging to a file
// const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

// For Security
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// For Logging
app.use(morgan("combined"));

// Body and Json Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// for Cors
app.use(cors());

// Caching Middleware
app.use(SetCache);
// App Router
app.use(AppRouter.getInstance());

// ----------------------------------------------------------
// Error Handle Middler Ware
// must be the Last One
app.use(ErrorHandleMiddleWare);

export { app };

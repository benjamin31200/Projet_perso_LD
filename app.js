import { setupRoutes } from "./routes/index.js";
import { connection } from "./db-config.js";
import express, { json } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config

const app = express();
app.use(json(), cookieParser());
import chalk from "chalk";

export const chalkFunc = {
  error: console.error,
  log: console.log,
  bad: chalk.bold.underline.red,
  success: chalk.bold.underline.green,
};

const port = process.env.EXPRESS_PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

setupRoutes(app);
app.get("/", function (req, res) {
  res.json("hello")
});



connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected to database with threadId :  ' + connection.threadId);
  }
});

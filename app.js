import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();
import chalk from "chalk";
import express from "express";
import cookieParser from "cookie-parser";
import { setupRoutes } from "./routes/index.js";

const app = express();
const log = console.log;
const error = chalk.bold.red;
const success = chalk.bold.underline.green;
const port = process.env.EXPRESS_PORT;
app.use(express.json());
app.use(cookieParser());

app.get("/", function (req, res) {
  log(success("Hello world!"));
  res.json("hello");
});
setupRoutes(app);

app.listen(port, console.log(`Server started on port ${port}`));

import chalk from "chalk";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { setupRoutes } from "./routes/index.js";

const log = console.log;
const error = chalk.bold.red;
const success = chalk.bold.underline.green;

const app = express();
app.use(express.json(), cookieParser());


app.get("/", function (req, res) {
  log(success("Hello world!"));
  res.json("hello");
});
app.post("/post", function (req, res) {
  log(success("Hello world!"));
  res.end();
});
setupRoutes(app);

const port = process.env.EXPRESS_PORT;
app.listen(port, console.log(`Server started on port ${port}`));

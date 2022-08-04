import chalk from "chalk";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
// import { setupRoutes } from "./routes/index.js";
import redis from "redis";

const client = redis.createClient(process.env.DB_PORT, process.env.DB_HOST);



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
  client.on("connect", function () {
    console.log("Connected!");
  });
});
// setupRoutes(app);

app.listen(port, console.log(`Server started on port ${port}`));

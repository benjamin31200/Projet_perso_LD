import { setupRoutes } from "./routes/index.js";
import { connection } from "./db-config.js";
import express, { json } from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(json(), cookieParser());
import chalk from "chalk";

export const chalkFunc = {
  error: console.error,
  log: console.log,
  bad: chalk.bold.underline.red,
  success: chalk.bold.underline.green,
};

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

setupRoutes(app);
app.get("/", function (req, res) {});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

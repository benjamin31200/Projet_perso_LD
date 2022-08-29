import { setupRoutes } from "./routes/index.js";
import { connection } from "./db-config.js";
import express, { json } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { sessionStore} from "./sessionStoreMysql.js";
import chalk from "chalk";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config;

const app = express();
app.use(
  json(),
  cookieParser(),
  session({
    name: process.env.SESS_NAME,
    key: process.env.SESS_KEY,
    secret: process.env.SESS_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: "strict", maxAge: 60000, httpOnly : true, },
    genid: function (req) {
      return uuidv4();
    },
  })
);

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


connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});
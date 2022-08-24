import { setupRoutes } from "./routes/index.js";
import { connection, sessionStore } from "./db-config.js";
import express, { json } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config;

const IN_PROD = process.env.NODE_ENV === 'production'
const app = express();
app.set("trust proxy", 1);
app.use(
  json(),
  cookieParser(),
  session({
    name: process.env.SESS_NAME,
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: IN_PROD, sameSite: "strict", maxAge: 60000, httpOnly : true, },
    genid: function (req) {
      return uuidv4();
    },
  })
);
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
  res.json("hello");
  console.log(req.session);
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});

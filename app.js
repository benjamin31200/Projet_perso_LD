import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();
import chalk from "chalk";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const log = console.log;
const port = process.env.EXPRESS_PORT;
app.use(express.json());
app.use(cookieParser());
  
app.get("/", function (req, res) {
    log(chalk.blue.bgRed.bold("Hello world!"));
    res.json('hello');
  });

app.post("/", (req, res) => {
    console.log("Connected to React");
    res.redirect("/connexion");
  });
  
app.listen(port, console.log(`Server started on port ${port}`));
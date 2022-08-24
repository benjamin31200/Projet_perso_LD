import mysql from "mysql2";
import mysql2 from "mysql2/promise";
import session from "express-session";
import MySQLStore from "express-mysql-session";(session);
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

 const connectionSession = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

export const options = () => {

}

const connect = mysql2.createPool(connectionSession);
export const sessionStore = new MySQLStore({}, connect);

import mysql from "mysql2";
import mysql2 from "mysql2/promise";
import session from "express-session";
import expressMysqlSession from "express-mysql-session";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config;

const MySQLStore = expressMysqlSession(session);
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const connectSession = mysql2.createPool(options);
export const sessionStore = new MySQLStore({}, connectSession);
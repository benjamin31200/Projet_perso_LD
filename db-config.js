import mysql from "mysql2";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config;

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
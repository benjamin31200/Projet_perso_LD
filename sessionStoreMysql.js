import session from "express-session";
import expressMysqlSession from "express-mysql-session";
import mysql2 from "mysql2/promise";

const MySQLStore = expressMysqlSession(session);

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connectSession = mysql2.createPool(options);
export const sessionStore = new MySQLStore({}, connectSession);

let p =
  (ctx, method) =>
  (...args) =>
    new Promise((resolve, reject) => {
      ctx[method](...args, (err, d) => {
        if (err) reject(err);
        resolve(d);
      });
    });

export async function storeMYSQL(store, res, action, sessID, sess) {
  if (action === "set") {
    let result = await p(store, action)(sessID, sess);
    return result;
  } else if (action === "get") {
    let result = await p(store, action)(sessID);
    res.json(result, sess, "get sess data from DB");
  } else if (action === "destroy") {
    let result = await p(store, action)(sessID);
    res.json(result, 1, `destroy target ${sess} data from DB`);
  }
}

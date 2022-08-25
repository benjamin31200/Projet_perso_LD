import session from "express-session";
import expressMysqlSession from "express-mysql-session";
import mysql2 from "mysql2/promise";

const MySQLStore = expressMysqlSession(session);

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const connectSession = mysql2.createPool(options);
export const sessionStore = new MySQLStore({}, connectSession);

// test("node_redis v3", async (res) => {
//   const store = sessionStore;
//   await lifecycleTest(store, res);
//   client.end(false);
// });

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
    res.json(result, "OK", "set sess data in DB");
  } else if (action === "get") {
    let result = await p(store, action)(sessID);
    res.json(result, sess, "get sess data from DB");
  } else if (action === "destroy") {
    let result = await p(store, action)(sessID);
    res.json(result, 1, "destroy target sess data from DB");
  }
}

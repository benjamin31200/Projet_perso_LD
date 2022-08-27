import { sessionStore, storeMYSQL } from "../sessionStoreMysql.js";
import Router from "express-promise-router";
export const homeRouter = Router();
import { sessID } from "./inscriptionRouter.js";
import { sess } from "./connexionRouter.js";
import { destroySession } from "./logoutRouter.js";


homeRouter.get("/", async (req, res) => {
  console.log(sessID);
  console.log(sess);
  const store = sessionStore;
  if ( sessID !== null) {
    await storeMYSQL(store, res, "get", sessID, req.session);
  } else if ( sess !== null) {
    await storeMYSQL(store, res, "get", sess, req.session);
  } else {
    res.send("false")
  }
});

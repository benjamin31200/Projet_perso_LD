import Router from "express-promise-router";
export const logoutRouter = Router();
import { sessID } from "./inscriptionRouter.js";
import { sess } from "./connexionRouter.js";
import { sessionStore, storeMYSQL } from "../sessionStoreMysql.js";

logoutRouter.get("/", async (req, res) => {
  const store = sessionStore;
  if (sessID !== null) {
    await storeMYSQL(store, res, "destroy", sessID, req.session);
  } else if (sess !== null) {
    await storeMYSQL(store, res, "destroy", sess, req.session);
  } else {
    res.json("aucunes sessions !");
  }
});

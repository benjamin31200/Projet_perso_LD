import Router from "express-promise-router";
export const homeRouter = Router();
import { sessID } from "./inscriptionRouter.js";
import { sessionStore, storeMYSQL } from "../sessionStoreMysql.js";

homeRouter.get("/", async (req, res, next) => {
  if (req.sessionID) {
    const store = sessionStore;
    await storeMYSQL(store, res, "get", req.sessionID, req.session);
  } else {
    res.end()
  }
});

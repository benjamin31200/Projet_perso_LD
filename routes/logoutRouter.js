import Router from "express-promise-router";
export const logoutRouter = Router();
import { sessionStore, storeMYSQL } from "../sessionStoreMysql.js";

logoutRouter.get("/", async (req, res) => {
  const store = sessionStore;
  await storeMYSQL(store, res, "destroy", req.sessionID, req.session);
});

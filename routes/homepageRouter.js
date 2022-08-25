import Router from "express-promise-router";
export const homepageRouter = Router();
import { sessionStore, storeMYSQL } from "../sessionStoreMysql.js";

homepageRouter.get("/", async (req, res) => {
      const store = sessionStore;
      await storeMYSQL(store, res, "get", req.sessionID, req.session);
  });
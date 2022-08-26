import { sessionStore, storeMYSQL } from "../sessionStoreMysql.js";
import Router from "express-promise-router";
export const homeRouter = Router();
import { sessID } from "./inscriptionRouter.js";
import { sess } from "./connexionRouter.js";


homeRouter.get("/", async (req, res) => {
  console.log(sessID);
  const store = sessionStore;
  if ( sessID !== null || sess !== null) {
    await storeMYSQL(store, res, "get", sessID, req.session);
    res.send("true");
  } else {
    res.send("false")
  }
  res.end
});

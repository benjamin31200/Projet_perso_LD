import Router from "express-promise-router";
import { sessionStore, storeMYSQL } from "../sessionStoreMysql.js";
export const homepageRouter = Router();

homepageRouter.get("/", async (req, res) => {
    const store = sessionStore;
    await storeMYSQL(store, res, "get", "066fddd0-5c50-41fa-8b6a-789fceb55dc0", req.session);
})
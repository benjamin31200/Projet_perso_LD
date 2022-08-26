import { inscriptionRouter } from "./inscriptionRouter.js";
import { connexionRouter } from "./connexionRouter.js";
import { homeRouter } from "./homeRouter.js";
import { logoutRouter } from "./logoutRouter.js";

export const setupRoutes = (app) => {
  app.use('/inscription', inscriptionRouter);
  app.use('/connexion', connexionRouter);
  app.use('/home', homeRouter);
  app.use('/logout', logoutRouter);
};
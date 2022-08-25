import { inscriptionRouter } from "./inscriptionRouter.js";
import { connexionRouter } from "./connexionRouter.js";
import { homepageRouter } from "./homepageRouter.js";

export const setupRoutes = (app) => {
  app.use('/inscription', inscriptionRouter);
  app.use('/connexion', connexionRouter);
  app.use('/home', homepageRouter);
};
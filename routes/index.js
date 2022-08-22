import { inscriptionRouter } from "./inscriptionRouter.js";
import { connexionRouter } from "./connexionRouter.js";

export const setupRoutes = (app) => {
  app.use('/inscription', inscriptionRouter);
  app.use('/connexion', connexionRouter);
};
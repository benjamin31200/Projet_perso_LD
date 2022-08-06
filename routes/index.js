import { connexionRouter } from "./connexionRouter.js";

export const setupRoutes = (app) => {
  app.use('/connexion', connexionRouter);
};
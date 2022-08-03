import { connexionRouter } from "./router/connexionRouter.js";

export const setupRoutes = (app) => {
  app.use('/connexion', connexionRouter);
};


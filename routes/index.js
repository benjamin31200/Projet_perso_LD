import { inscriptionRouter } from "./inscriptionRouter.js";

export const setupRoutes = (app) => {
  app.use('/inscription', inscriptionRouter);
};
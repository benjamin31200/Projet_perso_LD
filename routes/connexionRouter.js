import Router from "express-promise-router";
export const connexionRouter = Router();
import { findMany } from "../models/connexion.js"

connexionRouter.get("/", (req, res) => {
  findMany()
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving users from database");
  });
  });
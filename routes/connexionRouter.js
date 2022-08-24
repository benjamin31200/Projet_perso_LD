import Router from "express-promise-router";
export const connexionRouter = Router();
import {
  findUser,
  validate
} from "../models/connexion.js";
import { hashPassword, verifyPassword } from "../models/hashMDP.js";
import { chalkFunc } from "../app.js";
import { calculateToken } from "../helpers/users.js";

connexionRouter.post("/", (req, res) => {
  let { email, password } = req.body;
  console.log(req.body)
  let validationErrors = null;
  findUser(email)
    .then((existingUser) => {
      console.log(existingUser[0])
      if (existingUser[0].email === email) {
      validationErrors = validate(req.body);
      chalkFunc.error(chalkFunc.bad(validationErrors));
      if (validationErrors) return Promise.reject("INVALID_DATA");
      verifyPassword(password, existingUser[0].password).then((isCorrect) => {
        if (isCorrect) {
          req.session
          res.status(201).send("Connection réussie")
        } else {
          return Promise.reject("PASSWORD NOT FOUND");
        }
      });
      } else {
        return Promise.reject("EMAIL NOT FOUND");
      }
    })
    .catch((err) => {
      chalkFunc.error(chalkFunc.bad(err));
      if (err === "PASSWORD NOT FOUND")
        res.status(409).json({ message: "Le mot de passe est incorrect." });
      else if (err === "INVALID_DATA")
        res.status(422).json({ validationErrors });
        else if (err === "EMAIL NOT FOUND")
        res.status(409).json({ message: "L'email est incorrect." });
      else res.status(500).send("Error saving the user");
    });
});

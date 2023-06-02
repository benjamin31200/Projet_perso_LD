import Router from "express-promise-router";
export const connexionRouter = Router();
import { findUser, validate } from "../models/connexion.js";
import { verifyPassword } from "../models/hashMDP.js";
import { chalkFunc } from "../app.js";
import { calculateToken } from "../helpers/users.js";
import { sessionStore, storeMYSQL } from "../sessionStoreMysql.js";

const store = sessionStore;
connexionRouter.post("/google", (req, res) => {
  let { email, Client_id_google } = req.body;
  console.log(email);
  let validationErrors = null;
  findUser(email)
    .then((existingUser) => {
      console.log(existingUser[0]);
      if (existingUser[0] === undefined)
        return Promise.reject("EMAIL NOT FOUND");
      else if (existingUser[0] !== undefined) {
        if (existingUser[0].email === email) {
          validationErrors = validate(req.body);
          chalkFunc.error(chalkFunc.bad(validationErrors));
          if (validationErrors) return Promise.reject("INVALID_DATA");
          verifyPassword(
            Client_id_google,
            existingUser[0].Client_id_google
          ).then((isCorrect) => {
            req.session;
            const hour = 3600000;
            req.session.cookie.expires = new Date(Date.now() + hour);
            req.session.cookie.maxAge = hour;
            req.session.key = `Session de ${existingUser[0].name}`;
            req.session.secret = calculateToken(existingUser[0].email);
            if (!req.session.userId) {
              req.session.userId = existingUser[0].id;
            }
            storeMYSQL(store, res, "set", req.sessionID, req.session);
            res.redirect("/home");
            if (!isCorrect) return Promise.reject("Client_id_google NOT FOUND");
          });
        }
      }
    })
    .catch((err) => {
      chalkFunc.error(chalkFunc.bad(err));
      if (err === "Client_id_google NOT FOUND")
        res.status(409).json({
          message: "Le compte google n'est pas enregistré ou est incorrect.",
        });
      else if (err === "INVALID_DATA")
        res.status(422).json({ validationErrors });
      else if (err === "EMAIL NOT FOUND")
        res
          .status(406)
          .json({
            message: "Le compte google n'est pas enregistré ou est incorrect.",
          });
      else res.status(500).send("Error saving the user");
    });
});

connexionRouter.post("/", (req, res) => {
  let { email, password } = req.body;
  console.log(email);
  let validationErrors = null;
  findUser(email)
    .then((existingUser) => {
      console.log(existingUser[0]);
      if (existingUser[0] === undefined)
        return Promise.reject("EMAIL NOT FOUND");
      else if (existingUser[0] !== undefined) {
        if (existingUser[0].email === email) {
          validationErrors = validate(req.body);
          chalkFunc.error(chalkFunc.bad(validationErrors));
          if (validationErrors) return Promise.reject("INVALID_DATA");
          verifyPassword(
            password,
            existingUser[0].password
          ).then((isCorrect) => {
            req.session;
            const hour = 3600000;
            req.session.cookie.expires = new Date(Date.now() + hour);
            req.session.cookie.maxAge = hour;
            req.session.key = `Session de ${existingUser[0].name}`;
            req.session.secret = calculateToken(existingUser[0].email);
            if (!req.session.userId) {
              req.session.userId = existingUser[0].id;
            }
            storeMYSQL(store, res, "set", req.sessionID, req.session);
            res.redirect("/home");
            if (!isCorrect) return Promise.reject("Mot de passe incorrect.");
          });
        }
      }
    })
    .catch((err) => {
      chalkFunc.error(chalkFunc.bad(err));
      if (err === "Mot de passe incorrect.")
        res.status(409).json({
          message: "Le mot de passe est incorrect.",
        });
      else if (err === "INVALID_DATA")
        res.status(422).json({ validationErrors });
      else if (err === "EMAIL NOT FOUND")
        res.status(406).json({ message: "L'email n'est associé à aucun compte." });
      else res.status(500).send("Error saving the user");
    });
});

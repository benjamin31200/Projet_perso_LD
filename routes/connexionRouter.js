import Router from "express-promise-router";
export const connexionRouter = Router();
import {
  findUser,
  validate
} from "../models/connexion.js";
import { verifyPassword } from "../models/hashMDP.js";
import { chalkFunc } from "../app.js";
import { calculateToken } from "../helpers/users.js";
import { sessionStore, storeMYSQL } from "../sessionStoreMysql.js";

let sess = null;
let sessID = null;

connexionRouter.post("/google", (req, res) => {
  let { email, Client_id_google } = req.body;
  console.log(req.body)
  let validationErrors = null;
  findUser(email)
    .then((existingUser) => {
      console.log(existingUser[0])
      if (existingUser[0].email === email) {
      validationErrors = validate(req.body);
      chalkFunc.error(chalkFunc.bad(validationErrors));
      if (validationErrors) return Promise.reject("INVALID_DATA");
      verifyPassword(Client_id_google, existingUser[0].Client_id_google).then((isCorrect) => {
        if (isCorrect) {
          req.session;
              const hour = 3600000;
              req.session.cookie.expires = new Date(Date.now() + hour);
              req.session.cookie.maxAge = hour;
              req.session.key = `Session de ${newUser.name}`;
              req.session.secret = calculateToken(newUser.email);
              if (!req.session.userId) {
                req.session.userId = createdUser.insertId;
              }
              sess = req.session;
              sessID = req.sessionID;
              res.send(req.session);
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

connexionRouter.get("/", async (req, res) => {
  const store = sessionStore;
  await storeMYSQL(store, res, "set", sessID, sess);
  await storeMYSQL(store, res, "get", sessID, sess);
});

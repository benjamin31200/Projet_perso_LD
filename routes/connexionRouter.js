import Router from "express-promise-router";
export const connexionRouter = Router();
import { findUser, validate } from "../models/connexion.js";
import { verifyPassword } from "../models/hashMDP.js";
import { chalkFunc } from "../app.js";
import { calculateToken } from "../helpers/users.js";

export let sess = null;
connexionRouter.post("/google", (req, res) => {
  let { email, Client_id_google } = req.body;
  console.log(email);
  let validationErrors = null;
  findUser(email)
    .then((existingUser) => {
      console.log(existingUser[0]);
      if (existingUser[0].email === email)
        validationErrors = validate(req.body);
      chalkFunc.error(chalkFunc.bad(validationErrors));
      if (validationErrors) return Promise.reject("INVALID_DATA");
      if (existingUser[0].email !== email)
        return Promise.reject("EMAIL NOT FOUND");
      verifyPassword(Client_id_google, existingUser[0].Client_id_google).then(
        (isCorrect) => {
          if (isCorrect) console.log("correct");
          req.session;
          const hour = 3600000;
          req.session.cookie.expires = new Date(Date.now() + hour);
          req.session.cookie.maxAge = hour;
          req.session.key = `Session de ${existingUser[0].name}`;
          req.session.secret = calculateToken(existingUser[0].email);
          if (!req.session.userId) {
            req.session.userId = existingUser[0].id;
          }
          console.log(req.sessionID);
          sess = req.sessionID;
          res.send(req.session);
          if (!isCorrect) return Promise.reject("Client_id_google NOT FOUND");
        }
      );
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
        res.status(409).json({ message: "L'email est incorrect." });
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
      if (existingUser[0].email === email)
        validationErrors = validate(req.body);
      chalkFunc.error(chalkFunc.bad(validationErrors));
      if (validationErrors) return Promise.reject("INVALID_DATA");
      if (existingUser[0].email !== email)
        return Promise.reject("EMAIL NOT FOUND");
      verifyPassword(password, existingUser[0].password).then(
        (isCorrect) => {
          if (isCorrect) console.log("correct");
          req.session;
          const hour = 3600000;
          req.session.cookie.expires = new Date(Date.now() + hour);
          req.session.cookie.maxAge = hour;
          req.session.key = `Session de ${existingUser[0].name}`;
          req.session.secret = calculateToken(existingUser[0].email);
          if (!req.session.userId) {
            req.session.userId = existingUser[0].id;
          }
          console.log(req.sessionID);
          sess = req.sessionID;
          res.send(req.session);
          if (!isCorrect) return Promise.reject("Client_id_google NOT FOUND");
        }
      );
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
        res.status(409).json({ message: "L'email est incorrect." });
      else res.status(500).send("Error saving the user");
    });
});

import Router from "express-promise-router";
export const inscriptionRouter = Router();
import { create, findByEmail, validate } from "../models/inscription.js";
import { hashPassword } from "../models/hashMDP.js";
import { chalkFunc } from "../app.js";
import { calculateToken } from "../helpers/users.js";

inscriptionRouter.post("/google", (req, res) => {
  let { password, email, repeat_password, Client_id_google, ...data } =
    req.body;
  let validationErrors = null;
  findByEmail(email)
    .then((existingUserWithEmail) => {
      if (existingUserWithEmail.length > 0)
        return Promise.reject("DUPLICATE_EMAIL");
      validationErrors = validate(req.body);
      chalkFunc.error(chalkFunc.bad(validationErrors));
      if (validationErrors) return Promise.reject("INVALID_DATA");
      hashPassword(password).then((password) => {
        hashPassword(repeat_password).then((repeat_password) => {
          hashPassword(Client_id_google).then((Client_id_google) => {
            const newUser = {
              ...data,
              password,
              repeat_password,
              email,
              Client_id_google,
            };
            create(newUser).then((createdUser) => {
              chalkFunc.log(chalkFunc.success("User created with success"));
              req.session;
              const hour = 3600000;
              req.session.cookie.expires = new Date(Date.now() + hour);
              req.session.cookie.maxAge = hour;
              req.session.key = `Session de ${newUser.name}`;
              req.session.secret = calculateToken(newUser.email);
              if (!req.session.userId) {
                req.session.userId = createdUser.insertId;
              }
              storeMYSQL(store, res, "set", req.sessionID, req.session);
              res.redirect("/home");
            });
          });
        });
      });
    })
    .catch((err) => {
      chalkFunc.error(chalkFunc.bad(err));
      if (err === "DUPLICATE_EMAIL")
        res.status(409).json({ message: "This email is already used" });
      else if (err === "INVALID_DATA")
        res.status(422).json({ validationErrors });
      else res.status(500).send("Error saving the user");
    });
});

inscriptionRouter.post("/", (req, res) => {
  let { password, email, repeat_password, ...data } = req.body;
  let validationErrors = null;
  findByEmail(email)
    .then((existingUserWithEmail) => {
      if (existingUserWithEmail.length > 0)
        return Promise.reject("DUPLICATE_EMAIL");
      validationErrors = validate(req.body);
      chalkFunc.error(chalkFunc.bad(validationErrors));
      if (validationErrors) return Promise.reject("INVALID_DATA");
      hashPassword(password).then((password) => {
        hashPassword(repeat_password).then((repeat_password) => {
          const newUser = {
            ...data,
            password,
            repeat_password,
            email,
          };
          create(newUser).then((createdUser) => {
            chalkFunc.log(chalkFunc.success("User created with success"));
            res.json(createdUser);
          });
        });
      });
    })
    .catch((err) => {
      chalkFunc.error(chalkFunc.bad(err));
      if (err === "DUPLICATE_EMAIL")
        return res.status(409).json({ message: "This email is already used" });
      if (err === "INVALID_DATA")
        return res.status(422).json({ validationErrors });
      else return res.status(500).send("Error saving the user");
    });
});

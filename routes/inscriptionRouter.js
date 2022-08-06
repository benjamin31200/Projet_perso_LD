import Router from "express-promise-router";
export const inscriptionRouter = Router();
import {
  create,
  findByEmail,
  findMany,
  validate,
  hashPassword,
} from "../models/inscription.js";
import { chalkFunc } from "../app.js";
import { calculateToken } from "../helpers/users.js";

inscriptionRouter.get("/", (req, res) => {
  findMany()
    .then((results) => {
      chalkFunc.log(chalkFunc.success("requête réussie"));
      res.json(results);
    })
    .catch((err) => {
      chalkFunc.error(chalkFunc.bad(err));
      res.status(500).send("Error retrieving users from database");
    });
});

inscriptionRouter.post("/", (req, res) => {
  let { password, email, repeat_password, ...data } = req.body;
  console.log(repeat_password);
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
          const newPass = { ...data, password, repeat_password, email };
          create(newPass).then((createdUser) => {
            chalkFunc.log(chalkFunc.success("User created with success"));
            res.cookie("user_token", calculateToken(createdUser.email));
            res.status(201).json(createdUser);
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

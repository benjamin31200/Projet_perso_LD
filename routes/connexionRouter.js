import Router from "express-promise-router";
export const connexionRouter = Router();
import {
  findByEmail,
  validate
} from "../models/connexion.js";
import { hashPassword, verifyPassword } from "../models/hashMDP.js";
import { chalkFunc } from "../app.js";
import { calculateToken } from "../helpers/users.js";

connexionRouter.post("/", (req, res) => {
  let { email, password } = req.body;
  let validationErrors = null;
  findByEmail(email)
    .then((existingUserWithEmail) => {
      if (existingUserWithEmail.length > 0)
      validationErrors = validate(req.body);
      chalkFunc.error(chalkFunc.bad(validationErrors));
      if (validationErrors) return Promise.reject("INVALID_DATA");
      hashPassword(password).then((password) => {
          const newPass = { ...data, password, repeat_password, email };
          create(newPass).then((createdUser) => {
            chalkFunc.log(chalkFunc.success("User created with success"));
            res.cookie("user_token", calculateToken(createdUser.email));
            res.status(201).json(createdUser);
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

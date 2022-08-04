import Router from "express-promise-router";
export const connexionRouter = Router();
import { create, findByEmail, validate, hashPassword } from "../../models/connexion.js";
import { calculateToken } from "../../helpers/users.js";
import chalk from "chalk";

const error = console.error;
const log = console.log;
const bad = chalk.bold.red;
const success = chalk.bold.underline.green;

connexionRouter.post("/", (req, res) => {
  let { password, ...data } = req.body;
  const { email } = data;
  let validationErrors = null;
  findByEmail(email)
    .then((existingUserWithEmail) => {
      if (existingUserWithEmail) return Promise.reject("DUPLICATE_EMAIL");
      validationErrors = validate(req.body);
      if (validationErrors) return Promise.reject("INVALID_DATA");
      hashPassword(password).then((hashedPassword) => {
        const newPass = { ...data, hashedPassword };
        create(newPass).then((createdUser) => {
            log(success("User created with success"));
          res.cookie("user_token", calculateToken(createdUser.email));
          res.status(201).json(createdUser);
        });
      });
    })
    .catch((err) => {
      error(bad(err));
      if (err === "DUPLICATE_EMAIL")
        res.status(409).json({ message: "This email is already used" });
      else if (err === "INVALID_DATA")
        res.status(422).json({ validationErrors });
      else res.status(500).send("Error saving the user");
    });
});

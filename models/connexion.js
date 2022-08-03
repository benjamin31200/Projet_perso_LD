import { connection } from "../db-config";
const Joi = require("joi");
import * as argon2 from "argon2";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

export const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

const db = connection.promise();

const invalidData = [
    "SELECT",
    "DELETE",
    "CREATE",
    "UPDATE",
    "WHERE",
    "SET"
];

const validate = (data) => {
  return Joi.object({
    email: Joi.string.email().max(255).required().Joi.any().invalid(...invalidData),
    firstname: Joi.string().max(100).required().Joi.any().invalid(...invalidData),
    lastname: Joi.string().max(100).required().Joi.any().invalid(...invalidData),
    pseudonyme: Joi.string().min(3).max(100).required().Joi.any().invalid(...invalidData),
    password: Joi.string().max(255).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).Joi.any().invalid(...invalidData),
    repeat_password: Joi.ref("password").Joi.any().invalid(...invalidData),
  }).validate(data, { abortEarly: false }).error;
};

import { connection } from "../db-config.js";
import pkgJoi from "joi";
const { object, string } = pkgJoi;
import pkgArgon from "argon2";
const { argon2id, hash, verify } = pkgArgon;

const hashingOptions = {
  type: argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export const hashPassword = (plainPassword) => {
  return hash(plainPassword, hashingOptions);
};

export const verifyPassword = (plainPassword, hashedPassword) => {
  return verify(hashedPassword, plainPassword, hashingOptions);
};

const invalidData = [
  "SELECT",
  "DELETE",
  "CREATE",
  "UPDATE",
  "WHERE",
  "SET",
  "INSERT",
  "INTO",
];

export const validate = (data) => {
  return object({
    email: Joi.string
      .email()
      .max(255)
      .required()
      .invalid(...invalidData)
      .Joi.isEmailValid(email),
    firstname: Joi.string()
      .max(100)
      .required()
      .invalid(...invalidData),
    lastname: Joi.string()
      .max(100)
      .required()
      .invalid(...invalidData),
    pseudonyme: Joi.string()
      .min(3)
      .max(100)
      .required()
      .invalid(...invalidData),
    password: Joi.string()
      .max(255)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .invalid(...invalidData),
    repeat_password: Joi.ref("password").invalid(...invalidData),
  }).validate(data, { abortEarly: false }).error;
};

export const findMany = async () => {
  return connection
    .promise()
    .query("SELECT * from users").then(([...result]) => result[0]);
};

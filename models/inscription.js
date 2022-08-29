import { connection } from "../db-config.js";
import Joi from "joi";

export const validate = (data) => {
  const regex =
    /\bselect\b|\bfrom\b|\bdelete\b|\bcreate\b|\bupdate\b|\bwhere\b|\bset\b|\binsert\b|\binto\b/;
  for (const key in data) {
    const element = data[key];
    if (regex.exec(element.toLowerCase()) !== null) {
      throw new Error(
        `L'un des champs comporte une donnée interdite: ${element}`
      );
    }
  }
  return Joi.object({
    email: Joi.string().email().lowercase().max(100).required(),
    picture: Joi.string().max(255).lowercase(),
    Client_id_google: Joi.string().max(255).lowercase(),
    name: Joi.string().max(50).lowercase().required(),
    lastname: Joi.string().max(50).lowercase().required(),
    pseudonyme: Joi.string().min(3).lowercase().max(50).required(),
    password: Joi.string().min(7).max(255).required(),
    repeat_password: Joi.ref("password"),
  }).validate(data, { abortEarly: false }).error;
};

export const findByEmail = async (email) => {
  return connection
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email])
    .then(([...result]) => result[0]);
};

export const create = async (data) => {
  return connection
    .promise()
    .query("INSERT INTO users SET ?", data)
    .then(([...result]) => result[0]);
};
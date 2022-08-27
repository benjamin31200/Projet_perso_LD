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
  const {password} = data;
  if (password !== undefined) {
    return Joi.object({
      email: Joi.string().email().lowercase().max(255).required(),
      password: Joi.string().max(255).required(),
    }).validate(data, { abortEarly: false }).error;
  } else {
    return Joi.object({
      email: Joi.string().email().lowercase().max(255).required(),
      Client_id_google: Joi.string().max(255).lowercase().required(),
    }).validate(data, { abortEarly: false }).error;
  }
};

export const findUser = async (email) => {
  return connection
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email])
    .then(([...result]) => result[0]);
};

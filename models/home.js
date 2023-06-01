import { connection } from "../db-config.js";

export const findSess = async (id) => {
  return connection
    .promise()
    .query(
      "SELECT session_id FROM sessions WHERE json_extract(data, '$.userId') = ?",
      [id]
    )
    .then(([...result]) => result[0]);
};

export const findUserById = async (userId) => {
  return connection
    .promise()
    .query("SELECT * FROM users WHERE id = ?", [userId])
    .then(([...result]) => result[0]);
};
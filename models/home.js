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

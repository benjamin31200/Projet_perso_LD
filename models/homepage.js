


export const findBySessID = async (sessID) => {
    return connection
      .promise()
      .query("SELECT * FROM sessions WHERE session_id = ?", [sessID])
      .then(([...result]) => result[0]);
  };
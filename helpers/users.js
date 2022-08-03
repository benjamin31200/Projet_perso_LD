import jwt from "jsonwebtoken";

const { sign, verify } = jwt;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const calculateToken = (userEmail = "") => {
  return sign({ email: userEmail }, PRIVATE_KEY);
};

export const verifycode = (token) => {
  return verify(token, PRIVATE_KEY);
};

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
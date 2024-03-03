import jwt from "jsonwebtoken";

/**
 * JWT Helper to generate Token
 * @param payload the data to be encoded in the token
 * @param expiresIn the time the token will expire
 * @returns
 */
export const generateToken = (payload, expiresIn) => {
  try {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
  } catch (err) {
    return false;
  }
};

/**
 * JWT Helper to verify token
 * @param token the authentication token
 * @returns boolean | object
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return false;
  }
};

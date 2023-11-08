import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, JWT_ERROR_TOKEN_EXPIRED } from "../lib/constants";

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  // Verify access token
  const result = jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === JWT_ERROR_TOKEN_EXPIRED) {
        return {
          status: 401,
          error: err,
        };
      }
      return {
        status: 400,
        error: err,
      };
    }
    return {
      status: 200,
      decoded,
    };
  });
  if (result.status !== 200) {
    res.status(result.status);
    throw new Error(result.error);
  }

  req.user = { id: result.decoded.id };
  next();
};

export default isAuthenticated;

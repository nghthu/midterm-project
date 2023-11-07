import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, JWT_ERROR_TOKEN_EXPIRED } from "../lib/constants";

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  // Verify access token
  const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name == JWT_ERROR_TOKEN_EXPIRED) {
        return res.redirect(401, "/refresh-token");
      }
      console.error(err);
    }
    return decoded;
  });

  req.user = { id: decoded.id };
  next();
};

export default isAuthenticated;

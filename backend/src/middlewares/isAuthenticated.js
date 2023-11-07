import { JWT_ERROR_TOKEN_EXPIRED } from "../lib/constants";

const isAuthenticated = (req, res, next) => {
  // Verify access token
  const decoded = jwt.verify(
    req.headers.Authorization,
    ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        if (err.name == JWT_ERROR_TOKEN_EXPIRED) {
          res.redirect(401, "/refresh-token");
        }
      }
    }
  );

  req.user = decoded;
  next();
};

export default isAuthenticated;

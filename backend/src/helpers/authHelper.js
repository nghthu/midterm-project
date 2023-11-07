import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../lib/constants";

const genAccessToken = (payload) => {
  jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const genRefreshToken = (payload) => {
  jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export { genAccessToken, genRefreshToken };

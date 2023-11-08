import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genAccessToken, genRefreshToken } from "../helpers/authHelper";
import {
  ERROR_EMAIL_ALREADY_EXISTS,
  ERROR_INVALID_INPUT,
  ERROR_WRONG_CREDENTIALS,
  MESSAGE_SIGNUP_SUCCESSFULLY,
  SALT_ROUNDS,
  REFRESH_TOKEN_SECRET,
  ERROR_UNKNOWN,
  JWT_ERROR_TOKEN_EXPIRED,
  ERROR_BAD_REQUEST,
  MESSAGE_LOGOUT_SUCCESSFULLY,
} from "../lib/constants";
import { User } from "../models";

const signup = async (req, res) => {
  const { fullName, tel, email, password } = req.body;
  const hashedPw = await bcrypt.hash(password, SALT_ROUNDS);

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      password: hashedPw,
      fullName,
      tel,
    },
  });

  if (!created) {
    if (user.email === email) {
      res.status(400);
      throw new Error(ERROR_EMAIL_ALREADY_EXISTS);
    }
    res.status(500);
    throw new Error(ERROR_UNKNOWN);
  }

  return res.json({
    message: MESSAGE_SIGNUP_SUCCESSFULLY,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user?.password))) {
    res.status(400);
    throw new Error(ERROR_WRONG_CREDENTIALS);
  }

  const refreshToken = genRefreshToken({ id: user.id });
  await user.update({ refreshToken });

  return res.json({
    accessToken: genAccessToken({ id: user.id }),
    refreshToken: refreshToken,
  });
};

const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  // Verify refresh token
  const result = jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    (err, decoded) => {
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
    }
  );
  if (result.status !== 200) {
    res.status(result.status);
    throw new Error(result.error);
  }

  const user = await User.findOne({ where: { refreshToken } });
  if (!user) {
    res.status(400);
    throw new Error(ERROR_BAD_REQUEST);
  }

  return res.json({
    accessToken: genAccessToken({ id: result.decoded.id }),
  });
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  // Verify refresh token
  const result = jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    (err, decoded) => {
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
      if (decoded.id !== req.user.id) {
        return {
          status: 400,
          error: ERROR_BAD_REQUEST,
        };
      }
      return {
        status: 200,
        decoded,
      };
    }
  );

  if (result.status !== 200) {
    res.status(result.status);
    throw new Error(result.error);
  }

  const user = await User.findByPk(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error(ERROR_BAD_REQUEST);
  }
  await user.update({ refreshToken: "" });
  return res.json({
    message: MESSAGE_LOGOUT_SUCCESSFULLY,
  });
};

const validateSignupInput = (req, res, next) => {
  if (
    req.body?.fullName &&
    req.body?.email &&
    req.body?.password &&
    req.body?.tel
  ) {
    return next();
  }
  res.status(400);
  throw new Error(ERROR_INVALID_INPUT);
};

const validateLoginInput = (req, res, next) => {
  if (req.body?.email && req.body?.password) {
    return next();
  }
  res.status(400);
  throw new Error(ERROR_INVALID_INPUT);
};

export {
  signup,
  login,
  validateLoginInput,
  validateSignupInput,
  handleRefreshToken,
  logout,
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genAccessToken, genRefreshToken } from "../helpers/authHelper";
import {
  ERROR_EMAIL_ALREADY_EXISTS,
  ERROR_INVALID_INPUT,
  ERROR_WRONG_EMAIL,
  ERROR_WRONG_PASSWORD,
  MESSAGE_SIGNUP_SUCCESSFULLY,
  SALT_ROUNDS,
} from "../lib/constants";
import { User } from "../models";

const signup = async (req, res) => {
  const { fullname, tel, email, password } = req.body;
  const hashedPw = await bcrypt.hash(password, SALT_ROUNDS);

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      hashedPw,
      fullname,
      tel,
    },
  });

  if (!created) {
    res.status(400);
    throw new Error(ERROR_EMAIL_ALREADY_EXISTS);
  }

  res.json({
    message: MESSAGE_SIGNUP_SUCCESSFULLY,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByPk(email);
  if (!user) {
    res.status(400);
    throw new Error(ERROR_WRONG_EMAIL);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error(ERROR_WRONG_PASSWORD);
  }

  res.json({
    accessToken: genAccessToken({ id: user.id }),
    refreshToken: genRefreshToken({ id: user.id }),
  });
};

const handleRefreshToken = (req, res) => {};

const validateSignupInput = (req, res, next) => {
  if (
    req.body?.fullname &&
    req.body?.email &&
    req.body?.password &&
    req.body?.tel
  ) {
    next();
  }
  res.status(400);
  throw new Error(ERROR_INVALID_INPUT);
};

const validateLoginInput = (req, res, next) => {
  if (req.body?.email && req.body?.password) {
    next();
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
};

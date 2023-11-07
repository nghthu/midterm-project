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
  const { fullName, tel, email, password } = req.body;
  const hashedPw = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: hashedPw,
        full_name: fullName,
        tel,
      },
    });

    if (!created) {
      return res.status(400).json({
        error: ERROR_EMAIL_ALREADY_EXISTS,
      });
    }

    return res.json({
      message: MESSAGE_SIGNUP_SUCCESSFULLY,
    });
  } catch (err) {
    console.error(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: ERROR_WRONG_EMAIL });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: ERROR_WRONG_PASSWORD });
  }

  return res.json({
    accessToken: genAccessToken({ id: user.id }),
    refreshToken: genRefreshToken({ id: user.id }),
  });
};

const handleRefreshToken = (req, res) => {};

const validateSignupInput = (req, res, next) => {
  if (
    req.body?.fullName &&
    req.body?.email &&
    req.body?.password &&
    req.body?.tel
  ) {
    return next();
  }
  return res.status(400).json({ error: ERROR_INVALID_INPUT });
};

const validateLoginInput = (req, res, next) => {
  if (req.body?.email && req.body?.password) {
    return next();
  }
  return res.status(400).json({ error: ERROR_INVALID_INPUT });
};

export {
  signup,
  login,
  validateLoginInput,
  validateSignupInput,
  handleRefreshToken,
};

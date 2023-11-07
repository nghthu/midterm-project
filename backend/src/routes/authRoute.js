import express from "express";
import {
  signup,
  login,
  validateLoginInput,
  validateSignupInput,
  handleRefreshToken,
} from "../controllers/authController";
import isAuthenticated from "../middlewares/isAuthenticated";

const authRouter = express.Router();

authRouter.post("/login", validateLoginInput, login);
authRouter.post("/signup", validateSignupInput, signup);
authRouter.post("/refresh-token", isAuthenticated, handleRefreshToken);

export default authRouter;

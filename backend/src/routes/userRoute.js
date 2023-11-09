import express from "express";
import {
  editProfile,
  getProfile,
  validateProfile,
} from "../controllers/userController";
import isAuthenticated from "../middlewares/isAuthenticated";

const userRouter = express.Router();

userRouter.use(isAuthenticated);
userRouter.post("/profile", getProfile);
userRouter.put("/profile/edit", validateProfile, editProfile);

export default userRouter;

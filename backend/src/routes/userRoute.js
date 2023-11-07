import express from "express";
import { getUserProfile } from "../controllers/userController";
import isAuthenticated from "../middlewares/isAuthenticated";

const userRouter = express.Router();

userRouter.post("/profile", isAuthenticated, getUserProfile);

export default userRouter;

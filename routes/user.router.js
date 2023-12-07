import express from "express";
import { loginHandler, registerHandler } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", loginHandler);
userRouter.post("/register", registerHandler);




export default userRouter;
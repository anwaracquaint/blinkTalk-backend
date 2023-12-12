import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getMessages } from "../controller/chat.controller.js";

const chatRouter = express.Router();


chatRouter.get("/getMessages", authenticateToken, getMessages);



export default chatRouter;
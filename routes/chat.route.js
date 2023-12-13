import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getMessages, getActiveChats } from "../controller/chat.controller.js";

const chatRouter = express.Router();


chatRouter.get("/getMessages", authenticateToken, getMessages);
chatRouter.get("/getActiveChats", authenticateToken, getActiveChats);



export default chatRouter;
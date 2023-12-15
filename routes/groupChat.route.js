import express from "express";
import { createGroup, getActiveGroupChats, getGroupChatMessages } from "../controller/groupChat.controller.js";
import { teacherToken } from "../middleware/teacherToken.js";
import { authenticateToken } from '../middleware/authenticateToken.js';

const groupChatRouter = express.Router();

groupChatRouter.post("/createGroup", teacherToken, createGroup);
groupChatRouter.get("/getActiveGroupChats", authenticateToken, getActiveGroupChats);
groupChatRouter.get("/getGroupChatMessages", authenticateToken, getGroupChatMessages);



export default groupChatRouter;
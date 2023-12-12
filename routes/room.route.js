import express from "express";
import { getRoom } from "../controller/room.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const roomRouter = express.Router();


roomRouter.get("/getRoom", authenticateToken, getRoom);



export default roomRouter;
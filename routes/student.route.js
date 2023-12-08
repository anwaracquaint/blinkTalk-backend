import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { addStudent, addedStudent, getStudentData, getStudents, removeStudent, } from "../controller/student.controller.js";


const studentRouter = express.Router();


studentRouter.get('/getStudent', authenticateToken, getStudents);
studentRouter.post('/addStudent', authenticateToken, addStudent);
studentRouter.post('/removeStudent', authenticateToken, removeStudent);
studentRouter.get("/getAddedStudent", authenticateToken, addedStudent);
studentRouter.post("/getStudentData", authenticateToken, getStudentData);




export default studentRouter;
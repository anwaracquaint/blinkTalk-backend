import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { getDb } from "./db/config.js";
import userRouter from "./routes/user.router.js";
import studentRouter from "./routes/student.route.js";


getDb();
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;


app.use("/user", userRouter);
app.use("/student", studentRouter);


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

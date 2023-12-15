import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { User } from '../model/user.model.js';

dotenv.config();


export const teacherToken = async (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized token' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "blinkTalkUser");

        const user = await User.findById(decoded?.id);

        if (!user || user?.role != 0) {
            return res.status(401).json({ success: false, message: 'Unauthorized user' });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).send({ status: false, msg: "Unauthorized try catch" });
    }
}
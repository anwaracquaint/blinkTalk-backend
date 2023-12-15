import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbURL = `mongodb+srv://${encodeURIComponent(process.env.DB_USERNAME)}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.amrvx3m.mongodb.net/blinkTalk?retryWrites=true&w=majority`;

export const getDb = () => {
    mongoose.connect(dbURL).then((res) => {
        console.log("Database connection established");
    }).catch((err) => {
        console.log("err", err);
    })

} 
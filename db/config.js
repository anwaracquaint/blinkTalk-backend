import mongoose from "mongoose";

const dbURL = "mongodb+srv://anwar:" + encodeURIComponent("Anwar@1310") + "@cluster0.amrvx3m.mongodb.net/blinkTalk?retryWrites=true&w=majority";

export const getDb = () => {
    mongoose.connect(dbURL).then((res) => {
        console.log("Database connection established");
    }).catch((err) => {
        console.log("err", err);
    })

} 
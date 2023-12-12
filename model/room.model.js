import mongoose from "mongoose";



const roomSchema = mongoose.Schema({
    createdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})


export const Room = mongoose.model("room", roomSchema);
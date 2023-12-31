import mongoose from "mongoose";


const chatSchema = mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room',
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    message: { type: String, required: true, },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})


export const Chat = mongoose.model("chat", chatSchema);
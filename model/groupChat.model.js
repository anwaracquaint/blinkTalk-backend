import mongoose from "mongoose";

const groupChatSchema = mongoose.Schema({
    groupName: {
        type: mongoose.Schema.Types.String,
        ref: "groupRoom",
        required: true
    },
    groupRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groupRoom",
        required: true
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }],
    message: {
        type: String,
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    createdA: {
        type: Date,
        default: new Date(),
    }
})


export const GroupChat = mongoose.model("groupChat", groupChatSchema);
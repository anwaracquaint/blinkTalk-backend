import mongoose from "mongoose";

const groupRoomSchema = mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }]
})


export const GroupRoom = mongoose.model("groupRoom", groupRoomSchema);
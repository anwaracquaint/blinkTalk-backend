import mongoose from "mongoose";


const chatSchema = mongoose.Schema({
    chatID:{
        type:String,
        required: true,
        unique: true,
    },
    message:{
        type:Array,        
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
})


export const Chat = mongoose.model("chat", chatSchema);
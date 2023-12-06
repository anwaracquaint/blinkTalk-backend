import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 30,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        max: 20,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    token: {
        type: String,
        default: ""
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
    userType: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Number,
        default: 0,
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
})


export const User = mongoose.model("user", userSchema)
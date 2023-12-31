import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { getDb } from "./db/config.js";
import userRouter from "./routes/user.router.js";
import studentRouter from "./routes/student.route.js";
import { Server } from "socket.io";
import roomRouter from "./routes/room.route.js";
import chatRouter from "./routes/chat.route.js";
import { Chat } from "./model/chat.model.js";
import { ObjectId } from "mongodb";
import groupChatRouter from "./routes/groupChat.route.js";
import { GroupChat } from './model/groupChat.model.js';


getDb();
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))

const port = process.env.PORT || 5000;

app.use("/user", userRouter);
app.use("/student", studentRouter);
app.use("/room", roomRouter);
app.use("/chat", chatRouter);
app.use("/groupChat", groupChatRouter);


app.get("/", (req, res) => {
    res.send("Hello World");
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});


io.on('connection', (socket) => {
    let currentRoom = null;

    const msgHandler = async (data) => {

        const { message, receiverId, senderId, roomId, isChatOrGroup, groupName, groupRoomId, participants, senderName } = data?.data;

        if (isChatOrGroup == 0) {
            await Chat.create({ message: message, receiverId: receiverId, senderId: senderId, roomId: roomId });
        } else {
            await GroupChat.create({ message: message, groupName: groupName, groupRoomId: groupRoomId, participants: participants, senderId: senderId, senderName: senderName })
        }

        if (currentRoom) {
            io.to(currentRoom).emit('receive_message', { data });
        }
    }

    socket.on('send_message', msgHandler);

    socket.on('join_room', (data) => {
        if (currentRoom) {
            socket.leave(currentRoom);
        }

        socket?.join(data?.roomId);

        currentRoom = data?.roomId;
    });

});
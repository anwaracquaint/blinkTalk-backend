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


getDb();
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;


app.use("/user", userRouter);
app.use("/student", studentRouter);
app.use("/room", roomRouter);
app.use("/chat", chatRouter);


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

    socket.on('join_room', (data) => {
        console.log('User joined room:', data.roomId);

        // Leave the current room, if any
        if (currentRoom) {
            socket.leave(currentRoom);
        }

        // Join the new room
        socket.join(data.roomId);
        currentRoom = data.roomId;
    });



    const msgHandler = async (data) => {

        const { message, receiverId, senderId } = data?.data;

        await Chat.create({ message: message, receiverId: receiverId, senderId: senderId });
        if (currentRoom) {
            io.to(currentRoom).emit('receive_message', { data });
        }


    }

    socket.on('send_message', msgHandler)
});
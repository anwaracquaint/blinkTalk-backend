import { Chat } from "../model/chat.model.js";

const getMessages = async (req, res) => {
    try {

        const { userId, friendId } = req.query;

        const messages = await Chat.find({ $or: [{ senderId: userId, receiverId: friendId }, { senderId: friendId, receiverId: userId }] }).exec();

        return res.status(200).send({ success: true, message: "OK", data: messages });
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while getting a room' });
    }
}


export { getMessages }
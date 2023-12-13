import { ObjectId } from "mongodb";
import { Chat } from "../model/chat.model.js";
import { Room } from "../model/room.model.js";
import { User } from "../model/user.model.js";

const getMessages = async (req, res) => {
    try {

        const { userId, friendId } = req.query;

        const messages = await Chat.find({ $or: [{ senderId: userId, receiverId: friendId }, { senderId: friendId, receiverId: userId }] }).exec();

        return res.status(200).send({ success: true, message: "Messages fetch successfully", data: messages });
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while getting a room' });
    }
}


const getActiveChats = async (req, res) => {
    try {
        const { userId } = req.query;
        const hexObject = new ObjectId(userId);

        // const finalData = await Room.aggregate([
        //     { $match: { $or: [{ createdId: hexObject }, { friendId: hexObject }] } },
        //     {
        //         $lookup: {
        //             from: "chats",
        //             localField: 'roomId',
        //             foreignField: 'id',
        //             as: 'chats'
        //         }
        //     },
        // ])



        // ******************************** //


        // const transformedData = {};

        // finalData.forEach(item => {
        //     const { _id, chats } = item;
        //     transformedData[_id.toString()] = chats;
        // })

        // ******************************** //

        // const keysArray = Object.keys(transformedData);


        // ******************************** //

        // const room = await Room.find({
        //     _id: { $in: keysArray }
        // });


        // ******************************** //

        // const modifiedData = room.map(obj => {
        //     const newObj = JSON.parse(JSON.stringify(obj));
        //     if (newObj.createdId && newObj.createdId === userId) {
        //         delete newObj.createdId;
        //         newObj.student = newObj.friendId
        //         delete newObj.friendId;
        //     }
        //     if (newObj.friendId && newObj.friendId === userId) {
        //         delete newObj.friendId;
        //         newObj.student = newObj.createdId
        //         delete newObj.createdId;
        //     }
        //     return newObj;
        // });


        // ******************************** //

        // const studentIds = modifiedData?.map(data => data?.student);

        // const users = await User.find({ _id: { $in: studentIds } });

        // const updatedUsers = JSON.parse(JSON.stringify(users));

        // const finalUsers = updatedUsers?.map((user) => {
        //     return {
        //         id: user._id,
        //         username: user?.username,
        //     }
        // })

        // ******************************** // 


        // console.log("finalData", finalData?.map(data => data?._id));

        // console.log("finalUsers", finalUsers);

        // console.log("finalData", finalData[5]);

        const rooms = await Room.find({ $or: [{ createdId: hexObject }, { friendId: hexObject }] });

        const roomIds = rooms?.map((room) => room?._id);

        const chats = await Chat.find({ roomId: { $in: roomIds } });

        const modifiedData = chats?.map(obj => {
            const newObj = JSON.parse(JSON.stringify(obj));

            if (newObj.senderId && newObj.senderId === userId) {
                delete newObj.senderId;
                newObj.user = newObj.receiverId
                delete newObj.receiverId;
            }
            if (newObj.receiverId && newObj.receiverId === userId) {
                delete newObj.receiverId;
                newObj.user = newObj.senderId
                delete newObj.senderId;
            }

            delete newObj.message
            delete newObj.createdAt

            return newObj;

        })

        const uniqueUsers = Array.from(new Set(modifiedData.map(item => item.user)));

        const activeUsers = await User.find({ _id: { $in: uniqueUsers } });

        const jsonUpdatedUsers = JSON.parse(JSON.stringify(activeUsers))

        const finalActiveUsers = jsonUpdatedUsers?.map(user => {
            return {
                id: user._id,
                username: user.username
            }
        })


        return res.status(200).send({ success: true, message: "Chats fetch successfully", data: finalActiveUsers });

    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while getting a room' });
    }
}

export { getMessages, getActiveChats }
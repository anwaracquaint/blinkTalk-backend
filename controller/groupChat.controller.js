import { GroupRoom } from "../model/groupRoom.model.js";
import { GroupChat } from '../model/groupChat.model.js';

const createGroup = async (req, res) => {
    try {
        const { groupName, participants, userId } = req?.body;

        const allParticipants = [...participants, userId];


        const room = await GroupRoom.create({ groupName, participants: allParticipants });

        return res.status(200).send({ success: true, message: "Group Created successfully", data: room });
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while creating a room' });
    }
}

const getActiveGroupChats = async (req, res) => {
    try {

        const { userId } = req.query;

        const rooms = await GroupRoom.find({ participants: { $in: userId } });



        return res.status(200).send({ success: true, message: "Group Fetch successfully", data: rooms });
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while getting a room' });
    }
}

const getGroupChatMessages = async (req, res) => {
    try {

        const { roomId } = req.query;

        const messages = await GroupChat.find({ groupRoomId: roomId });



        return res.status(200).send({ success: true, message: "Group Fetch successfully", data: messages });
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while getting a messages' });
    }
}


export { createGroup, getActiveGroupChats, getGroupChatMessages }
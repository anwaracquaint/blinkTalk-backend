import { Room } from "../model/room.model.js";

const getRoom = async (req, res) => {
    try {
        const { userId, friendId } = req.query;

        console.log("query", userId, friendId);

        const room = await Room.findOne({ $or: [{ createdId: userId, friendId: friendId }, { createdId: friendId, friendId: userId }] }).exec();


        return res.status(200).send({ success: true, message: "Room found successfully", data: room });

    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while getting a room' });
    }
}



export { getRoom }
import { modelRoommate } from "../models/roommate.model.js"

const getRoommates = async (req, res) => {
    try {
        const roommates = await modelRoommate.findAllRoommates()
        return res.json({ roommates })
    } catch (error) {
        console.log(error.message);
    }
}

const addRoommate = async (req, res) => {
    try {
        const roommate = await modelRoommate.createRoommate()
        return res.json(roommate)
    } catch (error) {
        console.log(error.message)
    }
}

export const controllerRoommate = {
    getRoommates,
    addRoommate
}
import { Router } from "express"
import { controllerRoommate } from "../controllers/roommate.controller.js"

const router = Router()

router.get('/roommates', controllerRoommate.getRoommates)

router.post('/roommate', controllerRoommate.addRoommate)

export default router
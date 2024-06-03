import axios from 'axios'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const _dirname = import.meta.dirname

const filePathRoommates = path.join(_dirname, "../data/roommates.json")

const urlApi = "https://randomuser.me/api"

const createRoommate = async (req, res) => {
    try {
        const data = await axios.get(urlApi)
        const userData = data.data.results[0]
        const usuario = {
            nombre: `${userData.name.first} ${userData.name.last}`,
            debe: 0,
            recibe: 0
        }
        const preview = await readFile(filePathRoommates, "utf8")
        const roommates = preview.trim() ? JSON.parse(preview) : []
        roommates.push(usuario)

        await writeFile(filePathRoommates, JSON.stringify(roommates))
        return usuario

    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
}

const findAllRoommates = async () => {
    try {
        const preview = await readFile(filePathRoommates, "utf8")
        const roommates = preview.trim() ? JSON.parse(preview) : []
        return roommates
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
}

export const modelRoommate = {
    createRoommate,
    findAllRoommates
}
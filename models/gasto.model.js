import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from "uuid"

const _dirname = import.meta.dirname

const filePathGastos = path.join(_dirname, "../data/gastos.json")
const filePathRoommates = path.join(_dirname, "../data/roommates.json")

const findAllGastos = async () => {
    try {
        const preview = await readFile(filePathGastos, "utf8")
        const gastos = preview.trim() ? JSON.parse(preview) : []
        return gastos
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
};
const createGasto = async (roommate, descripcion, monto) => {
    try {
        const preview = await readFile(filePathGastos, "utf-8")
        const gastos = preview.trim() ? JSON.parse(preview) : []
        const newGasto = {
            id: uuidv4().slice(0, 5),
            roommate,
            descripcion,
            monto
        }
        gastos.push(newGasto)
        await writeFile(filePathGastos, JSON.stringify(gastos))
        return newGasto
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
}

const removeGasto = async (id) => {
    try {
        const preview = await readFile(filePathGastos, "utf-8")
        const gastos = preview.trim() ? JSON.parse(preview) : []

        const gasto = gastos.find((item) => item.id === id)

        const filteredGastos = gastos.filter(item => item.id !== id)
        await writeFile(filePathGastos, JSON.stringify(filteredGastos))
        return gasto
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
}

const actualiceGasto = async (id, roommate, descripcion, monto) => {

    try {
        const preview = await readFile(filePathGastos, "utf-8")
        const gastos = preview.trim() ? JSON.parse(preview) : []

        const gasto = gastos.find((item) => item.id === id)

        gasto.roommate = roommate
        gasto.descripcion = descripcion
        gasto.monto = monto

        await writeFile(filePathGastos, JSON.stringify(gastos))
        return gasto
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }

}

const reparteGastos = async () => {
    try {
        const data_r = await readFile(filePathRoommates, "utf-8")
        let roommates = JSON.parse(data_r)

        const data_g = await readFile(filePathGastos, "utf-8")
        const gastos = JSON.parse(data_g)

        roommates = roommates.map((r) => {
            r.debe = 0
            r.recibe = 0
            return r
        })

        gastos.forEach((g) => {
            roommates = roommates.map((r) => {
                const cuota = Math.floor((Number(g.monto) / roommates.length))
                if (g.roommate == r.nombre) {
                    r.recibe += (g.monto - cuota)
                } else {
                    r.debe += cuota
                }

                return r
            })
        })
        await writeFile(filePathRoommates, JSON.stringify(roommates))
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
}


const saldoNeto = async () => {
    try {
        const data_r = await readFile(filePathRoommates, "utf-8")
        let roommates = JSON.parse(data_r)

        roommates = roommates.map((r) => {
            if (r.recibe > r.debe) {
                r.recibe = (r.recibe - r.debe)
                r.debe = 0
            } else if (r.recibe < r.debe) {
                r.debe = (r.debe - r.recibe)
                r.recibe = 0
            } else {
                r.debe = 0
                r.recibe = 0
            }
            return r
        })
        await writeFile(filePathRoommates, JSON.stringify(roommates))
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
}

export const modelGasto = {
    findAllGastos,
    createGasto,
    removeGasto,
    actualiceGasto,
    reparteGastos,
    saldoNeto
}
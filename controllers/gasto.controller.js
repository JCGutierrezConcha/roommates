import { modelGasto } from "../models/gasto.model.js"

const getGastos = async (req, res) => {
    try {
        const gastos = await modelGasto.findAllGastos()
        return res.status(200).json({ gastos })
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
        return res.status(500).json({ ok: false, msg: "Error de servidor" })
    }
};
const addGasto = async (req, res) => {
    try {
        const { roommate, descripcion, monto } = req.body

        if (!roommate || !descripcion || !monto)
            return res.status(400).json({ ok: false, msg: "Todos los campos obligatorios" })

        const newGasto = await modelGasto.createGasto(roommate, descripcion, monto)
        await modelGasto.reparteGastos()
        await modelGasto.saldoNeto()
        return res.status(201).json(newGasto)
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
        return res.status(500).json({ ok: false, msg: "Error de servidor" })
    }
}

const deleteGasto = async (req, res) => {
    try {
        const { id } = req.query
        const gasto = await modelGasto.removeGasto(id)
        await modelGasto.reparteGastos()
        await modelGasto.saldoNeto()
        return res.status(200).json(gasto)
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
        return res.status(500).json({ ok: false, msg: "Error de servidor" })
    }
}

const updateGasto = async (req, res) => {
    try {
        const { id } = req.query
        const { roommate, descripcion, monto } = req.body

        const gasto = await modelGasto.actualiceGasto(id, roommate, descripcion, monto)
        await modelGasto.reparteGastos()
        await modelGasto.saldoNeto()
        return res.status(200).json(gasto)
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
        return res.status(500).json({ ok: false, msg: "Error de servidor" })
    }
}

export const controllerGasto = {
    getGastos,
    addGasto,
    deleteGasto,
    updateGasto
}


import { modelGasto } from "../models/gasto.model.js"

const getGastos = async (req, res) => {
    try {
        const gastos = await modelGasto.findAllGastos();
        return res.json({ gastos })
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
};
const addGasto = async (req, res) => {
    try {
        const { roommate, descripcion, monto } = req.body
        const newGasto = await modelGasto.createGasto(roommate, descripcion, monto)
        await modelGasto.reparteGastos()
        await modelGasto.saldoNeto()
        return res.json(newGasto)
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
}

const deleteGasto = async (req, res) => {
    try {
        const { id } = req.query
        const gasto = await modelGasto.removeGasto(id)
        await modelGasto.reparteGastos()
        await modelGasto.saldoNeto()
        return res.json(gasto)
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
}

const updateGasto = async (req, res) => {
    try {
        const { id } = req.query
        const { roommate, descripcion, monto } = req.body

        const gasto = await modelGasto.actualiceGasto(id, roommate, descripcion, monto)
        await modelGasto.reparteGastos()
        await modelGasto.saldoNeto()
        return res.json(gasto)
    } catch (error) {
        console.error("Error al procesar los archivos:", error)
    }
}

export const controllerGasto = {
    getGastos,
    addGasto,
    deleteGasto,
    updateGasto
}


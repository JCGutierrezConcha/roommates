import { Router } from "express"
import { controllerGasto } from "../controllers/gasto.controller.js"

const router = Router()

router.get('/gastos', controllerGasto.getGastos)

router.post('/gasto', controllerGasto.addGasto)

router.delete('/gasto', controllerGasto.deleteGasto)

router.put('/gasto', controllerGasto.updateGasto)


export default router
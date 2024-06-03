import express from 'express'
import path from "path"
import routerRoommate from './routes/roommate.route.js'
import routerGasto from './routes/gasto.route.js'

const app = express()
const __dirname = import.meta.dirname

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/public")))

app.use('/', routerRoommate)
app.use('/', routerGasto)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})
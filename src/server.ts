import express, { Request, Response } from "express"
import mongoose from "mongoose"
import config from "./config"
import routes from "./modules/routes"
import cors from "cors"


const app = express()
app.use(express.json())

// routes
app.use(routes)

app.use(cors())




app.get("/", (req: Request, res: Response) => {
    res.send("Your system hacked! 😜😜😜😜 just kidding.. server running...")
})

app.listen(config.port, () => {
    console.log(`✅ Sever running on port ${config.port}`)
})

async function server() {
    try {
        await mongoose.connect(config.database_url!)

        console.log(`✅ Sever connected to database.`)

    } catch (error) {
        console.error("❌ Server connection error:", error);

    }
}

server()
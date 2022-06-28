import express, {Request, Response} from 'express';
import 'dotenv/config'

import routes from './routes'

import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/",routes)

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})



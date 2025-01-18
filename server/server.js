import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const PORT = process.PORT;

const app = express();


app.use(cors())
app.route('')

app.listen(PORT, () => {
    console.log('Server successfully started')
})
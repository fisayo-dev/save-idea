import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.PORT;

const app = express()

app.listen(PORT, () => {
    console.log('Server successfully started')
})
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT;

const app = express();
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://saveidea.netlify.app' 
      : 'http://localhost:5173', // Local frontend URL (
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Enable cookies (if needed)
  };
app.use(cors(corsOptions))
app.route('')

app.listen(PORT, () => {
    console.log('Server successfully started')
})
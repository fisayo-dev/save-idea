import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import ideaRoutes from './routes/ideaRoutes.js'

dotenv.config()

const PORT = process.env.PORT;
const localURI = process.env.LOCAL_URI
const productionURI = process.env.PRODUCTION_URI

const app = express();
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://saveideaapp.vercel.app' 
      : 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
};
  
// Cors Options
app.use(cors(corsOptions))

// Json Middleware
app.use(express.json())

// Server Routes
app.use('/api/users/', userRoutes)
app.use('/api/ideas/', ideaRoutes)

const MONGO_URI = process.env.NODE_ENV == 'production' ? productionURI: localURI

app.listen(PORT, () => {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err))
    console.log(`Server running on port ${PORT}`)
})
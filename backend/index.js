import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cryptoRouter from './routes/crypto.routes.js';
import authRouter from './routes/auth.routes.js';
import chatRouter from './routes/chat.routes.js';
import connectDB from './config/db.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/crypto', cryptoRouter);
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})
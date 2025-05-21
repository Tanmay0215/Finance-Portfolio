import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cryptoRouter from './routes/crypto.routes.js';

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/crypto', cryptoRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})

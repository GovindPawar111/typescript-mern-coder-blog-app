import express, { type Application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'node:http'
import 'dotenv/config'
import env from './utils/validateEnv'
import compression from 'compression'

import authRouter from './routers/auth'
import userRouter from './routers/users'
import postRouter from './routers/posts'
import commentRouter from './routers/comments'
import connectDB from './utils/connectDB'

const app: Application = express()

const port = env.PORT

app.use(
    cors({
        origin: ['http://localhost:4173', 'http://localhost:5173'],
        credentials: true,
    }),
)
app.use(express.json())
app.use(cookieParser())

// compress responses
app.use(compression())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

app.use('/api/ping', (req, res) => {
    res.status(200).json({ message: 'ping!!!' })
})

const server = http.createServer(app)

server.listen(port, () => {
    connectDB()
    console.log(`Server is listening on port ${port}!`)
})

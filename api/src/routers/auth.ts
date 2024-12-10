import express, { Request, Response } from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import env from '../utils/validateEnv'
import validateToken from '../utils/validateToken'

const router = express.Router()

//Register route
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Missing required fields. Please provide proper credentials.',
            })
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(409).json({
                message: 'User with the provided credentials already exists.',
            })
        }

        const salt = await bcrypt.genSalt(11)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ username, email, password: hashedPassword })
        const savedUser = await newUser.save()

        res.status(201).json({
            message: 'Register successful',
            email: savedUser.email,
            id: savedUser.id,
            username: savedUser.username,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error. Please try again later.' })
    }
})

//Login route
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Missing required fields. Please provide proper credentials.',
            })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'The requested user could not be found on the server.',
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid credentials. Please check your username and password.',
            })
        }

        const token = JWT.sign({ id: user._id, email: user.email, username: user.username }, env.JWT_SECRETE, {
            expiresIn: '2d',
        })

        res.status(200).cookie('token', token).json({
            message: 'Login successful',
            email: user.email,
            id: user._id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error. Please try again later.' })
    }
})

//Refetch route
router.get('/refetch', validateToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.user.email })
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'The requested user could not be found on the server.',
            })
        }

        res.status(200).json({
            email: user.email,
            id: user._id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error. Please try again later.' })
    }
})

//Logout route
router.post('/logout', validateToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.user.email })
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'The requested user could not be found on the server.',
            })
        }

        // Clear the 'token' cookie to log the user out
        res.status(200).clearCookie('token', { sameSite: 'none', secure: true }).json({
            email: user.email,
            id: user._id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error. Please try again later.' })
    }
})

export default router

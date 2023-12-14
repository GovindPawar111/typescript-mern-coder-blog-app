import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'
import Post from '../models/post'
import Comment from '../models/comment'
import validateToken from '../utils/validateToken'

const router = express.Router()

//Get route
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById({ _id: req.params.id }).select(['-password', '-__v']).lean().exec()
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'The requested user could not be found on the server.',
            })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error. Please try again later.' })
    }
})

//update route
router.put('/:id', validateToken, async (req: Request, res: Response) => {
    try {
        //NOTE: remove once authentication is start working
        const user = await User.findById({ _id: req.params.id }).select(['-password', '-__v']).lean().exec()
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'The requested user could not be found on the server.',
            })
        }
        const updateFields: { username?: string; email?: string; password?: string } = {}

        if (req.body.username) {
            updateFields.username = req.body.username
        }

        if (req.body.email) {
            updateFields.email = req.body.email
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(11)
            updateFields.password = await bcrypt.hash(req.body.password, salt)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true })
            .select(['-password', '-__v'])
            .lean()
            .exec()

        res.status(200).json({
            message: 'User updated successfully.',
            ...updatedUser,
        })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error. Please try again later.' })
    }
})

//delete route
router.delete('/:id', validateToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'The requested user could not be found on the server.',
            })
        }

        const deletedUser = await User.findByIdAndDelete({ _id: req.params.id })
            .select(['-password', '-__v'])
            .lean()
            .exec()
        await Post.deleteMany({ id: req.params.id })
        await Comment.deleteMany({ id: req.params.id })

        res.status(200).json({ message: 'User deleted successfully.', ...deletedUser })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error. Please try again later.' })
    }
})

export default router

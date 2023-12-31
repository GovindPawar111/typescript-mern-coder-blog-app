import express, { Request, Response } from 'express'
import Post from '../models/post'
import User from '../models/user'
import validateToken from '../utils/validateToken'

const router = express.Router()

//create
router.post('/', validateToken, async (req: Request, res: Response) => {
    try {
        const { title, description, headerImageUrl, catagories, username, userId } = req.body
        if (!title || !userId || !username) {
            return res.status(400).json({
                message: 'Missing required fields. Please provide proper values.',
            })
        }

        const newPost = new Post({ title, description, headerImageUrl, catagories, username, userId })
        const savedPost = await newPost.save()

        res.status(201).json({
            message: 'Post create Successfully.',
            title: savedPost.title,
            description: savedPost.description,
            headerImageUrl: savedPost.headerImageUrl,
            catagories: savedPost.catagories,
            username: savedPost.username,
            userId: savedPost.userId,
            _id: savedPost.id,
        })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

//update
router.put('/:id', validateToken, async (req: Request, res: Response) => {
    try {
        // if user don't  provide least one valid fields to update the post return bad request.
        if (
            !(
                req.body.title ||
                req.body.description ||
                req.body.headerImageUrl ||
                req.body.catagories ||
                req.body.username
            )
        ) {
            return res.status(400).json({
                message: 'Bad Request, No valid fields provided for update',
            })
        }
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    headerImageUrl: req.body.headerImageUrl,
                    catagories: req.body.catagories,
                    username: req.body.username,
                },
            },
            { new: true },
        )
            .lean()
            .exec()

        res.status(200).json({
            message: 'Post updated successfully.',
            ...updatedPost,
        })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

//delete
router.delete('/:id', validateToken, async (req: Request, res: Response) => {
    try {
        const existingPost = await Post.findById({ _id: req.params.id }).lean().exec()
        if (!existingPost) {
            return res.status(404).json({ message: 'Post No found' })
        }

        const deletedPost = await Post.findByIdAndDelete({ _id: req.params.id }).lean().exec()
        res.status(200).json({ message: 'Post deleted successfully.', ...deletedPost })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

//get posts with search query
router.get('/', async (req: Request, res: Response) => {
    try {
        const searchFilter = {
            title: { $regex: req.query.search, $options: 'i' },
        }
        const posts = await Post.find(req.query.search ? searchFilter : {})
            .lean()
            .exec()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

//get post by id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const post = await Post.findById({ _id: req.params.id }).lean().exec()
        if (!post) {
            return res.status(404).json({ message: 'Posts not found.' })
        }

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

//get user posts
router.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).lean().exec()
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        const posts = await Post.find({ userId: req.params.id }).lean().exec()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

export default router

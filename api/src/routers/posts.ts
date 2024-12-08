import express, { Request, Response } from 'express'
import Post from '../models/post'
import User from '../models/user'
import Comment from '../models/comment'
import validateToken from '../utils/validateToken'
import { upload } from '../middlewares/multer.middleware'
import { DeleteOnCloudinary, imageToWebp, uploadOnCloudinary } from '../utils/cloudinaryService'
import fs from 'fs'

const router = express.Router()

//create
router.post('/', validateToken, upload.single('header-image'), async (req: Request, res: Response) => {
    try {
        const { title, description, categories, content, username, userId } = JSON.parse(req.body.data)
        if (!title || !userId || !username) {
            return res.status(400).json({
                message: 'Missing required fields. Please provide proper values.',
                ...req.body,
            })
        }

        let imageUrl: string = ''
        if (req.file?.path) {
            const urlParts = req.file?.path.split('\\')
            // File name with extension eg. image.png
            const filenameWithExtension = urlParts[urlParts.length - 1]
            // File extension eg. png
            const fileExtension = filenameWithExtension.substring(filenameWithExtension.lastIndexOf('.') + 1)
            // Extract file name without extension eg. image
            const filename = filenameWithExtension.substring(0, filenameWithExtension.lastIndexOf('.'))

            if (fileExtension !== 'webp') {
                // convert image to webp formate
                await imageToWebp(req.file?.path, filename)
            }

            // upload header image file on cloudinary
            const cloudinaryResponse = await uploadOnCloudinary('./src/public/temp/' + filename + '.webp')
            imageUrl = cloudinaryResponse?.secure_url || ''

            // remove the file stored on server.
            await fs.unlink(req.file?.path, () => {})
            fileExtension !== 'webp' && (await fs.unlink('./src/public/temp/' + filename + '.webp', () => {}))
        }

        const newPost = new Post({
            title,
            description,
            content,
            headerImageUrl: imageUrl,
            categories,
            username,
            userId,
        })

        const savedPost = await newPost.save()
        res.status(201).json({
            message: 'Post create Successfully.',
            title: savedPost.title,
            description: savedPost.description,
            content: savedPost.content,
            headerImageUrl: savedPost.headerImageUrl,
            categories: savedPost.categories,
            username: savedPost.username,
            userId: savedPost.userId,
            _id: savedPost.id,
            createdAt: savedPost.createdAt,
            updatedAt: savedPost.updatedAt,
        })
    } catch (error) {
        // remove the file stored on server in case of any error.
        if (req.file?.path) {
            await fs.unlink(req.file?.path, () => {})
        }
        res.status(500).json({ error, message: 'Internal server error, Please try again later.' })
    }
})

//update
router.put('/:id', validateToken, upload.single('header-image'), async (req: Request, res: Response) => {
    try {
        const { title, description, categories, content, username, userId, headerImageUrl } = JSON.parse(req.body.data)
        if (!title || !userId || !username) {
            return res.status(400).json({
                message: 'Missing required fields. Please provide proper values.',
                ...req.body,
            })
        }

        const oldPost = await Post.findById(req.params.id)
        if (oldPost?.headerImageUrl) {
            // delete the old image file from cloudinary
            await DeleteOnCloudinary(oldPost?.headerImageUrl)
        }

        let imageUrl: string = ''
        if (req.file?.path) {
            const urlParts = req.file?.path.split('\\')
            // File name with extension eg. image.png
            const filenameWithExtension = urlParts[urlParts.length - 1]
            // File extension eg. png
            const fileExtension = filenameWithExtension.substring(filenameWithExtension.lastIndexOf('.') + 1)
            // Extract file name without extension eg. image
            const filename = filenameWithExtension.substring(0, filenameWithExtension.lastIndexOf('.'))

            if (fileExtension !== 'webp') {
                // convert image to webp formate
                await imageToWebp(req.file?.path, filename)
            }

            // upload header image file on cloudinary
            const cloudinaryResponse = await uploadOnCloudinary('./src/public/temp/' + filename + '.webp')
            imageUrl = cloudinaryResponse?.secure_url || headerImageUrl || ''

            // remove the file stored on server.
            await fs.unlink(req.file?.path, () => {})
            fileExtension !== 'webp' && (await fs.unlink('./src/public/temp/' + filename + '.webp', () => {}))
        } else {
            imageUrl = headerImageUrl
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: title,
                    description: description,
                    content: content,
                    headerImageUrl: imageUrl,
                    categories: categories,
                    username: username,
                    userId: userId,
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
        // remove the file stored on server in case of any error.
        if (req.file?.path) {
            await fs.unlink(req.file?.path, () => {})
        }
        res.status(500).json({ error, message: 'Internal server error, Please try again later.' })
    }
})

//delete
router.delete('/:id', validateToken, async (req: Request, res: Response) => {
    try {
        const existingPost = await Post.findById({ _id: req.params.id }).lean().exec()
        if (!existingPost) {
            return res.status(404).json({ message: 'Post No found' })
        }
        if (existingPost.headerImageUrl) {
            await DeleteOnCloudinary(existingPost.headerImageUrl)
        }

        const deletedPost = await Post.findByIdAndDelete({ _id: req.params.id }).lean().exec()
        await Comment.deleteMany({ postId: req.params.id }).lean().exec()
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
            .sort({ updatedAt: -1 })
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

        const posts = await Post.find({ userId: req.params.id }).sort({ updatedAt: -1 }).lean().exec()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

export default router

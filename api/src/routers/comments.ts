import express, { Request, Response } from 'express'
import Post from '../models/post'
import Comment from '../models/comment'
import validateToken from '../utils/validateToken'

const router = express.Router()

//create
router.post('/', validateToken, async (req: Request, res: Response) => {
    try {
        const { comment, author, postId, userId } = req.body
        // if user don't  provide valid fields to create the comment return bad request.
        if (!comment || !author || !postId || !userId) {
            return res.status(400).json({
                message: 'Missing required fields. Please provide proper values.',
            })
        }

        const newComment = new Comment({ comment, author, postId, userId })
        const savedComment = await newComment.save()

        res.status(201).json({
            message: 'Comment create Successfully.',
            comment: savedComment.comment,
            author: savedComment.author,
            postId: savedComment.postId,
            userId: savedComment.userId,
            _id: savedComment.id,
        })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

//update
router.put('/:id', validateToken, async (req: Request, res: Response) => {
    try {
        // if user don't  provide least one valid fields to update the post return bad request.
        if (!(req.body.comment || req.body.author)) {
            return res.status(400).json({
                message: 'Bad Request, No valid fields provided for update comment.',
            })
        }
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    comment: req.body.comment,
                    author: req.body.author,
                },
            },
            { new: true },
        )
            .lean()
            .exec()

        res.status(200).json({
            message: 'Comment updated successfully.',
            ...updatedComment,
        })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

//delete
router.delete('/:id', validateToken, async (req: Request, res: Response) => {
    try {
        const existingComment = await Comment.findById({ _id: req.params.id }).lean().exec()
        if (!existingComment) {
            return res.status(404).json({ message: 'Comment No found' })
        }

        const deletedComment = await Comment.findByIdAndDelete({ _id: req.params.id }).lean().exec()
        res.status(200).json({ message: 'Comment deleted successfully.', ...deletedComment })
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

//get Comment by postId
router.get('/post/:id', async (req: Request, res: Response) => {
    try {
        const post = await Post.findById({ _id: req.params.id }).lean().exec()
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' })
        }

        const comments = await Comment.find({ postId: req.params.id }).lean().exec()
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: error, message: 'Internal server error, Please try again later.' })
    }
})

export default router

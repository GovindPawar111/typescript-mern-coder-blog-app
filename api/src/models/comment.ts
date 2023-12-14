import mongoose from 'mongoose'

type CommentType = {
    createdAt: NativeDate
    updatedAt: NativeDate
    comment: string
    author: string
    postId: string
    userId: string
}

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            require: true,
        },
        author: {
            type: String,
            require: true,
        },
        postId: {
            type: String,
            require: true,
        },
        userId: {
            type: String,
            require: true,
        },
    },
    { timestamps: true },
)

export default mongoose.model<CommentType>('Comment', commentSchema)

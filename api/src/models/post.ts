import mongoose from 'mongoose'

type PostType = {
    createdAt: NativeDate
    updatedAt: NativeDate
    title: string
    description?: string
    photo?: string
    catagories?: string[]
    username: string
    userId: string
}

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
        },
        photo: {
            type: String,
        },
        username: {
            type: String,
            require: true,
        },
        userId: {
            type: String,
            require: true,
        },
        catagories: {
            type: [String],
        },
    },
    { timestamps: true },
)

export default mongoose.model<PostType>('Post', postSchema)

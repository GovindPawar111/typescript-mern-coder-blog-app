import mongoose from 'mongoose'

type PostType = {
    createdAt: NativeDate
    updatedAt: NativeDate
    title: string
    description?: string
    headerImageUrl?: string
    content?: string
    categories?: string[]
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
        headerImageUrl: {
            type: String,
        },
        content: {
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
        categories: {
            type: [String],
        },
    },
    { timestamps: true },
)

export default mongoose.model<PostType>('Post', postSchema)

import mongoose from 'mongoose'

export type UserType = {
    createdAt: NativeDate
    updatedAt: NativeDate
    username: string
    email: string
    password: string
}

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    { timestamps: true },
)

export default mongoose.model<UserType>('User', userSchema)

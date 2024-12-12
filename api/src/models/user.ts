import mongoose from 'mongoose'

export type UserType = {
    createdAt: NativeDate
    updatedAt: NativeDate
    username: string
    email: string
    password: string
    isVerified: boolean
    verificationToken: string | null
    isAnonymous: boolean
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
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)

export default mongoose.model<UserType>('User', userSchema)

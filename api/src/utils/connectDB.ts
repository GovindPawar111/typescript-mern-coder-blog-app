import mongoose from 'mongoose'
import env from './validateEnv'

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_CONNECTION_URL)
        console.log('Database connected Successfully...')
    } catch (error) {
        console.log(error)
        setTimeout(connectDB, 5000)
    }
}

export default connectDB

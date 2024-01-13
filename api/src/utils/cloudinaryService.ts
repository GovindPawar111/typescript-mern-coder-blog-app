import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// upload the file on cloudinary
const uploadOnCloudinary = async (localPath: string): Promise<UploadApiResponse | null> => {
    try {
        if (!localPath) {
            return null
        }
        const response = await cloudinary.uploader.upload(localPath, { resource_type: 'auto' })
        // remove the file stored on server.
        await fs.unlink(localPath, () => {})
        return response
    } catch (error) {
        // remove the file stored on server.
        await fs.unlink(localPath, () => {})
        return null
    }
}

export default uploadOnCloudinary

import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'


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
        return response
    } catch (error) {
        return null
    }
}

export default uploadOnCloudinary

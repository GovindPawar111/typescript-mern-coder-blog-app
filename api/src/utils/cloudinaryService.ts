import { DeleteApiResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import env from './validateEnv'
import sharp from 'sharp'

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
})

// upload the file on cloudinary
export const uploadOnCloudinary = async (localPath: string): Promise<UploadApiResponse | undefined> => {
    try {
        if (!localPath) {
            return undefined
        }
        const response = await cloudinary.uploader.upload(localPath, { resource_type: 'auto' })
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

// delete the file from cloudinary
export const DeleteOnCloudinary = async (imageUrl: string): Promise<DeleteApiResponse | undefined> => {
    try {
        if (!imageUrl) {
            return undefined
        }
        // Split the URL string by "/"
        const urlParts = imageUrl.split('/')

        // Get the last part of the URL which contains the filename
        const filenameWithExtension = urlParts[urlParts.length - 1]

        // Split the filename by "." and return filename present at 0 index
        const filename = filenameWithExtension.split('.')[0]
        const response = await cloudinary.uploader.destroy(filename)
        console.log(imageUrl, response)
        return response
    } catch (error) {
        console.log(error)
    }
}

// convert the any type of image in to webp formate
export const imageToWebp = async (filepath: string, filename: string) => {
    try {
        await sharp(filepath)
            .webp({ quality: 80 })
            .toFile('./src/public/temp/' + filename + '.webp')
    } catch (error) {
        console.log(error)
    }
}

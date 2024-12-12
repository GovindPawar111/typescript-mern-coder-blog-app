import { cleanEnv, port, str } from 'envalid'

const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
    PORT: port({ default: 3000 }),
    ALLOWED_ORIGINS: str(),
    JWT_SECRETE: str(),

    MONGO_CONNECTION_URL: str(),

    EMAIL_SERVICE: str({ default: 'gmail' }),
    EMAIL_USER: str(),
    EMAIL_PASSWORD: str(),

    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
})

export default env

import { cleanEnv, port, str } from 'envalid'

const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
    PORT: port({ default: 5000 }),
    MONGO_CONNECTION_URL: str({ default: 'mongodb://localhost:27017/blogApp' }),
    JWT_SECRETE: str({ default: 'mernblogapplocalhost5000develpment' }),
})

export default env

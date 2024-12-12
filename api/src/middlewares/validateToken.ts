import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../utils/validateEnv'
import { UserType } from 'models/user'

type AuthPayload = UserType & {
    isAnonymous?: boolean
} 

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken = req.cookies['token']

        if (!userToken) {
            return res
                .status(401)
                .json({ message: 'Unauthorized! Session token is not valid or has expired. Please log in again.' })
        }

        const decodedInfo = jwt.verify(userToken, env.JWT_SECRETE) as AuthPayload
        req.body.user = decodedInfo
        next()
    } catch (error) {
        res.status(403).send('Forbidden! You do not have permission to access this resource.')
    }
}

export default validateToken

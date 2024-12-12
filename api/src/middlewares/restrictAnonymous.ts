import { NextFunction, Request, Response } from 'express'

export const restrictAnonymous = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body?.user?.isAnonymous) {
        res.status(403).json({ message: 'Access forbidden for anonymous users' })
        return
    }
    next()
}

export default restrictAnonymous

import { NextFunction, Request, Response } from "express"

export const checkRole = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if ((req as any).user.role === "user")
        res.sendStatus(401)
    else
        next()
}
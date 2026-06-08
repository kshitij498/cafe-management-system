import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const authenticationToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(400).json({ message: "unauthorized" })

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next()
    }
    catch (err: any) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }

}
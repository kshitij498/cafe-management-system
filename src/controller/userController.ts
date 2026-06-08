import { NextFunction, Request, Response } from "express";
import { User } from "../entities/userEntity";
import AppDataSource from "../config/db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUser = async (
    req: Request,
    res: Response
) => {
    try {
        const userRepostitory = AppDataSource.getRepository(User);
        const users = await userRepostitory.find({ where: { role: "user" } });
        res.status(200).json(users);
    }
    catch (err) {
        console.error(err)
    }
}

export const createUser = async (
    req: Request,
    res: Response
) => {
    try {
        console.log(req.body)
        const { name, password, role, status, email, contactno } = req.body;
        const userRepostitory = AppDataSource.getRepository(User);
        const existingUser = await userRepostitory.findOneBy({ email })
        if (existingUser) {
            return res.status(400).json({ message: "email already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User();
        user.name = name;
        user.password = hashedPassword;
        user.contactno = contactno;
        user.email = email;
        user.role = role;
        user.status = status;
        const savedUser = await userRepostitory.save(user);
        res.status(200).json({ message: "User registered successfully", savedUser });
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" });
    }
}

export const signIn = async (
    req: Request,
    res: Response
) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const userRepostitory = AppDataSource.getRepository(User);
        const user = await userRepostitory.findOneBy({ email })
        if (!user || !password) {
            return res.status(400).json({ message: "user not found" })
        }
        else if (user.status == "false") {
            return res.status(400).json({ message: "wait for admin approval." })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password not match" })
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "1d" })

        res.status(200).json({ Message: "Login successful", token })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" });
    }
}

export const resetPassword = async (
    req: Request,
    res: Response
) => {
    try {
        const newPassofUser = req.body;
        const userRepostitory = AppDataSource.getRepository(User);
        const email = (req as any).user.email;
        const user = await userRepostitory.findOneBy({ email })
        if (!user)
            return res.status(400).json({ message: "user not found" })

        const isMatch = await bcrypt.compare(newPassofUser.oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password not match" })
        }
        const hashedPassword = await bcrypt.hash(newPassofUser.newPassword, 10)
        user.password = hashedPassword;
        const updateUser = await userRepostitory.save(user);
        return res.status(200).json({ Message: "Password updated successful" })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" });
    }
}

export const updateStatus = async (
    req: Request,
    res: Response
) => {
    const { userId, status } = req.body;
    const userRepostitory = AppDataSource.getRepository(User);
    try {
        if (!userId && !status)
            return res.status(400).json({ message: "userId and status required" })
        const user = await userRepostitory.findOneBy({ id: userId });
        if (!user)
            return res.status(400).json({ message: "user not found" })
        user.status = status;
        const updatedUser = await userRepostitory.save(user);
        return res.status(200).json({
            message: "status updated",
            updatedUser
        })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" });
    }

}
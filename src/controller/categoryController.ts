import { Request, Response } from "express";
import { Category } from "../entities/categoryEntity";
import AppDataSource from "../config/db";

export const createCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(400).json({ message: "categoryName is required" });
        }
        const categoryRepository = AppDataSource.getRepository(Category);
        const category = new Category();
        category.name = categoryName;
        const createdCategory = await categoryRepository.save(category)
        return res.status(200).json({ message: "saved successful", createdCategory })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: "server error" })
    }
}

export const getCategories = async (
    req: Request,
    res: Response
) => {
    try {
        const categoryRepository = AppDataSource.getRepository(Category);
        const categories = await categoryRepository.find();
        return res.status(200).json(categories)
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: "server error" })
    }
}

export const updateCategory = async (
    req: Request,
    res: Response
) => {
    try {
        //const { id } = req.params;
        const { id, categoryName } = req.body;
        if (!categoryName) {
            return res.status(400).json({ message: "categoryName is required" });
        }
        const categoryRepository = AppDataSource.getRepository(Category);
        const category = await categoryRepository.findOneBy({ id })
        if (!category)
            return res.status(400).json({ message: "category not found" })

        category.name = categoryName
        const updatedCategory = await categoryRepository.save(category);
        res.status(200).json({ message: "saved successfully", updatedCategory })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: "server error" })
    }
}
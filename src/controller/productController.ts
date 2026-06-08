import { Request, Response } from "express";
import { Product } from "../entities/productEntity";
import AppDataSource from "../config/db";

export const createProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, description, price, status, categoryId } = req.body;
        const productRepo = AppDataSource.getRepository(Product);
        const product = productRepo.create({
            name, description, price, status, category: categoryId
        })
        const createdProduct = await productRepo.save(product);
        return res.status(201).json({ message: "save successfully", createdProduct })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })
    }
}

export const getProducts = async (
    req: Request,
    res: Response
) => {
    try {
        const productRepo = AppDataSource.getRepository(Product);
        const products = await productRepo.find({
            where: { status: "true" },
            relations: ["category"]
        });
        return res.status(201).json(products)
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })
    }
}

export const updateProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const { id, name, description, price, status, categoryId } = req.body;
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.findOne({ where: { productId: id } })
        if (!product)
            return res.status(404).json({ message: "product not found" })
        product.name = name;
        product.description = description;
        product.price = price;
        product.category = categoryId;

        const updatedProduct = await productRepo.save(product);
        return res.status(201).json({ message: "update successfully", updatedProduct })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })
    }
}

export const deleteProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id as string;
        const productRepo = AppDataSource.getRepository(Product);
        const result = await productRepo.delete({ productId: id });
        if (result.affected === 0) {
            return res.status(404).json({ message: "product not found" });
        }

        return res.status(200).json({ message: "product deleted successfully" });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })
    }
}


export const getProductById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id as string;
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.find({ 
            where : {productId: id}, 
            relations : ["category"]
        });
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        return res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })
    }
}


export const getByCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const categoryId = req.params.id as string;
        const productRepo = AppDataSource.getRepository(Product);
        const products = await productRepo.find({
            where : {category: {id : categoryId}}, 
            relations : ["category"]
        });
        if (!products) {
            return res.status(404).json({ message: "product not found" });
        }
        return res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })
    }
}

export const updateProductStatus = async (
    req: Request,
    res: Response
) => {
    try {
        const { id, status } = req.body;
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.findOne({ where: { productId: id } })
        if (!product)
            return res.status(404).json({ message: "product not found" })
        product.status = status;

        const updatedProduct = await productRepo.save(product);
        return res.status(201).json({ message: "status updated successfully", updatedProduct })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })
    }
}
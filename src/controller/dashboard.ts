import { Request,Response } from "express";
import AppDataSource from "../config/db";
import { Bill } from "../entities/billEntity";
import { Category } from "../entities/categoryEntity";
import { Product } from "../entities/productEntity";

export const getCounts = async (
    req : Request,
    res : Response
)=>{
    try{
        const billRepo = AppDataSource.getRepository(Bill);
        const categoryRepo = AppDataSource.getRepository(Category);
        const productRepo = AppDataSource.getRepository(Product);
        const billCnt = await billRepo.count();
        const categoryCnt = await categoryRepo.count();
        const productCnt = await productRepo.count();

        res.status(201).json({billCnt,categoryCnt,productCnt})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message : "server error"})
    }
}
import { Request, Response } from "express";
import path from "path"
import ejs from "ejs"
import puppeteer from "puppeteer";
import { Bill } from "../entities/billEntity";
import AppDataSource from "../config/db";
import fs from "fs"

export const generateBill = async (
    req: Request,
    res: Response
) => {
    try {
        const orderedDetails = req.body;
        const billRepo = AppDataSource.getRepository(Bill);
        const productDetailsReport = JSON.parse(orderedDetails.productDetails);
        const bill = billRepo.create({
            name: orderedDetails.name,
            email: orderedDetails.email,
            contactNo: orderedDetails.contactNo,
            paymentMethod: orderedDetails.paymentMethod,
            total: orderedDetails.total,
            productDetails: productDetailsReport,
            createdBy: (req as any).user.id
        })
        const savedBill = await billRepo.save(bill);

        const filePath = path.join(__dirname, "../Reports/billRpt.ejs")
        const html = await ejs.renderFile(filePath, {
            name: orderedDetails.name, email: orderedDetails.email,
            contactNo: orderedDetails.contactNo, paymentMethod: orderedDetails.paymentMethod, totalamount: orderedDetails.total,
            productdetails: productDetailsReport,
        })
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdfFolder = path.join(__dirname, "../Generated_Pdf");
        const pdfPath = path.join(pdfFolder, `${savedBill.id}.pdf`);

        await page.pdf({
            path: pdfPath,
            format: "A4",
            printBackground: true,
        });

        await browser.close();
        return res.status(200).json({
            message: "Bill generated successfully",
            billId: savedBill.id,
        });
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: err });
    }
}

export const getBillPdf = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const pdfPath = path.join(__dirname, "../generated_pdf", `${id}.pdf`);

        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json({ message: "PDF not found" });
        }

        return res.sendFile(pdfPath);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "server error" });
    }
};


export const getBills = async (
    req: Request,
    res: Response
) => {
    try {
        const billRepo = AppDataSource.getRepository(Bill);
        const bills = await billRepo.find();
        res.status(200).json(bills);
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "server error" });
    }
}

export const deleteBill = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id as string;
        const billRepo = AppDataSource.getRepository(Bill);
        const result = await billRepo.delete({ id: id });
        if (result.affected === 0) {
            return res.status(404).json({ message: "bill not found" });
        }
        return res.status(200).json({ message: "bill deleted successfully" });

    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "server error" });
    }
}


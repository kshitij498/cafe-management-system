import { Router } from "express";
import { deleteBill, generateBill, getBillPdf, getBills } from "../controller/billController";
import { authenticationToken } from "../services/authentication";

const router = Router()

router.post("/generatPdf",authenticationToken,generateBill);
router.get("/getBillPdf/:id",authenticationToken,getBillPdf);
router.delete("/deleteBill/:id",authenticationToken,deleteBill);
router.get("/getBills/:id",authenticationToken,getBills);

export default router;
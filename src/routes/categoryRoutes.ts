import { Router } from "express";
import { getCategories,createCategory,updateCategory } from "../controller/categoryController";
import { authenticationToken } from "../services/authentication";
import { checkRole } from "../services/checkRole";

const router = Router();

router.get("/getCategories", authenticationToken, getCategories);
router.post("/createCategory",authenticationToken,checkRole, createCategory);
router.put("/updateCategory",authenticationToken,checkRole, updateCategory);

export default router;
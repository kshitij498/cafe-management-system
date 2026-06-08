import { Router } from "express";
import {getProducts,createProduct,getByCategory,getProductById,deleteProduct,updateProduct,updateProductStatus} from "../controller/productController"
import { authenticationToken } from "../services/authentication";
import { checkRole } from "../services/checkRole";

const router = Router();

router.get("/getProducts",authenticationToken,getProducts)
router.get("/getByCategory/:id",authenticationToken,getByCategory)
router.get("/getProductById/:id",authenticationToken,getProductById)
router.post("/createProduct",authenticationToken,checkRole,createProduct)
router.put("/updateProduct",authenticationToken,checkRole,updateProduct)
router.put("/updateProductStatus",authenticationToken,checkRole,updateProductStatus)
router.put("/deleteProduct/:id",authenticationToken,checkRole,deleteProduct)

export default router;
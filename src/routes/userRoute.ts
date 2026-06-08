import { getUser,createUser, signIn, updateStatus, resetPassword } from "../controller/userController";
import { Router } from "express";
import { authenticationToken } from "../services/authentication";
import { checkRole } from "../services/checkRole";

const router = Router();

router.get("/getUser",authenticationToken,checkRole,getUser);
router.post("/createUser",authenticationToken,checkRole,createUser);
router.post("/signIn", signIn);
router.put("/updateStatus",authenticationToken,checkRole,updateStatus);
router.put("/resetPassword",authenticationToken,resetPassword);

export default router;


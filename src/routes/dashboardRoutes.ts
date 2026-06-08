import { Router } from "express";
import { getCounts } from "../controller/dashboard";
import { authenticationToken } from "../services/authentication";

const router = Router();

router.get("/getCounts",authenticationToken,getCounts);

export default router;
import express from "express";
import { authenticate } from "../middleware/auth";

import { addBudget, getBudget } from "../controller/budget";

const router = express();

router.post("/add", authenticate, addBudget);
router.get("/", authenticate, getBudget);

export default router;

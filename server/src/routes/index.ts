import express from "express";

import userRouter from "./users";
import authRouter from "./auth";

const router = express();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);

export default router;

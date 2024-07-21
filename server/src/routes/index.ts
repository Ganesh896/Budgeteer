import express from "express";

import userRouter from "./users";

const router = express();

router.use("/api/users", userRouter);

export default router;

import express from "express";
import { login, register } from "../controller/user";
import { validateReqBody } from "../middleware/validator";
import { userRegisterSchema } from "../schema/user";

const router = express();

router.post("/register", validateReqBody(userRegisterSchema), register);

router.post("/login", login);

export default router;

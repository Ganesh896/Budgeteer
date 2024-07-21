import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import * as userService from "../service/user";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/response";
export const register = asyncHandler(async (req: Request, res: Response) => {
    const user = req.body;
    const message = await userService.register(user);

    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, message));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const user = req.body;
    const data = await userService.login(user);
    res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, data));
});

import HttpStatusCodes from "http-status-codes";
import bcrypt from "bcrypt";

import { UserModel } from "../model/user";
import { User } from "../interface/user";
import { ApiError } from "../utils/ApiErrors";
import { generateAccessRefreshToken } from "./auth";

export async function register(user: User) {
    const existingUser = await UserModel.getUserByEmail(user.email);
    if (existingUser) {
        throw new ApiError(HttpStatusCodes.CONFLICT, "User with this email already exist!");
    }

    try {
        const password = await bcrypt.hash(user.password, 12);
        await UserModel.register({ ...user, password: password });

        return { message: "User created Successfully" };
    } catch (error) {
        throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "User insertion fail!");
    }
}

export async function login(user: Pick<User, "email" | "password">) {
    const existingUser = await UserModel.getUserByEmail(user.email);

    if (!existingUser) {
        throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(user.password, existingUser.password);


    if (!isValidPassword) {
        throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(existingUser);

    return { accessToken, refreshToken };
}

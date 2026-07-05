import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";


const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await authService.registerUserIntoDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: { user }
    })
})


const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken } = await authService.loginUserIntoDB(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 3
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: { accessToken }
    });
});


const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id
    const role = req.user?.role

    const result = await authService.getMyProfileFromDB(id, role)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your profile successfully",
        data: result
    });
})

export const authController = {
    registerUser,
    loginUser,
    getMyProfile
}